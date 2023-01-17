package en.ensiteck.myresto.dto;

import com.fasterxml.jackson.annotation.JsonView;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record ProductPost(@JsonView({View.Post.class})
                          @NotNull
                          Long id,
                          @Min(0)
                          Long qte) {
}
