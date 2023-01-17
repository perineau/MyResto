package en.ensiteck.myresto.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.List;

@Data
@Entity
@Table(name = "command")
public class Command {

    @Id
    @Column(name="idCommand")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name="idProduct")
    @ManyToMany
    private List<Product> idProduct;

}
