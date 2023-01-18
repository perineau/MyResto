package en.ensiteck.myresto.service;

import en.ensiteck.myresto.dto.Command;
import en.ensiteck.myresto.dto.ProductPost;
import en.ensiteck.myresto.dto.ProductReturn;
import en.ensiteck.myresto.dto.UserReturn;
import en.ensiteck.myresto.entity.Product;
import en.ensiteck.myresto.entity.ProductQuantity;
import en.ensiteck.myresto.entity.ProductType;
import en.ensiteck.myresto.exception.BadIdException;
import en.ensiteck.myresto.repository.CommandRepository;
import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.annotation.DirtiesContext;

import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;

@SpringBootTest
@DirtiesContext(classMode = DirtiesContext.ClassMode.BEFORE_EACH_TEST_METHOD)
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
        assertThat(commandRepo.get(0).getProducts().stream().map(ProductQuantity::getQuantity)).containsOnly(1L);
        assertThat(commandRepo.get(0).getProducts().stream().map(ProductQuantity::getProduct))
                .contains(
                        new Product(1L, "glace chocolat", ProductType.DESSERT,2),
                        new Product(3L, "frite",ProductType.MAIN,2.50),
                        new Product(4L, "salade",ProductType.ENTRY,1.99)
                );
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

    @Test
    void getCommand() throws BadIdException {
        var command = Stream.of(
                new ProductPost(1L,1L),
                new ProductPost(3L,1L),
                new ProductPost(4L,1L)
        );
        commandService.createCommand("test",command.collect(Collectors.toList()));
        var commandReturn = commandService.getCommand("test");
        assertThat(commandReturn).hasSize(1).contains(new Command(1L, List.of(
                new ProductReturn(1L, "glace chocolat",2,1L),
                new ProductReturn(3L, "frite",2.50,1L),
                new ProductReturn(4L, "salade",1.99,1L)
        ), new UserReturn("test","test","test")));
    }

}