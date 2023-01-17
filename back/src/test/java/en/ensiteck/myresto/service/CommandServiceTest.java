package en.ensiteck.myresto.service;

import en.ensiteck.myresto.dto.ProductPost;
import en.ensiteck.myresto.dto.ProductReturn;
import en.ensiteck.myresto.exception.BadIdException;
import en.ensiteck.myresto.repository.CommandRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@Transactional
class CommandServiceTest {

    @Autowired
    CommandService commandService;
    @Autowired
    CommandRepository commandRepository;

    @Test
    void createCommand() throws BadIdException {
        var command = Stream.of(
                new ProductPost(1L,1L),
                new ProductPost(3L,1L),
                new ProductPost(4L,1L)
        );
        commandService.createCommand("test",command.collect(Collectors.toList()));
        var commandRepo = commandRepository.findAll();
        assertThat(commandRepo).hasSize(1);
        assertThat(commandRepo.get(0).getProducts()).hasSize(3);
    }

    @Test
    void createCommandBadId() {
        var command = Stream.of(
                new ProductPost(1L,1L),
                new ProductPost(3L,1L),
                new ProductPost(24L,1L)
        );
        var exception = assertThrows(BadIdException.class ,()->commandService.createCommand("test",command.collect(Collectors.toList())));
        assertThat(exception.getIds()).containsOnly("24");
    }

}