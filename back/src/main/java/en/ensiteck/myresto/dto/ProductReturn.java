package en.ensiteck.myresto.dto;

import com.fasterxml.jackson.annotation.JsonView;

public record ProductReturn(
        @JsonView({Card.class,Command.class})
        Long id,
        @JsonView({Card.class,Command.class})
        String name,
        @JsonView({Card.class,Command.class})
        double price,
        @JsonView(Command.class)
        Long quantity ) {

    public ProductReturn(Long id,
                         String name,
                         double price){
        this(id,name,price,0L);
    }
    public static ProductReturn fromEntity(en.ensiteck.myresto.entity.Product product){
        return new ProductReturn(product.getId(),product.getName(),product.getPrice());
    }
}

