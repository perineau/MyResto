package en.ensiteck.myresto.dto;

import com.fasterxml.jackson.annotation.JsonView;

import java.util.List;

public record Command(
        @JsonView(Command.class)
        Long id,
        @JsonView(Command.class)
        List<ProductReturn> product) {
}
