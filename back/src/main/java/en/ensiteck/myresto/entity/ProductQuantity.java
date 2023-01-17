package en.ensiteck.myresto.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.Data;

@Data
@Entity
public class ProductQuantity {

    @Id
    Long id;

    @ManyToOne
    private Product product;
    @ManyToOne
    private Command command;

    private Long quantity;

}
