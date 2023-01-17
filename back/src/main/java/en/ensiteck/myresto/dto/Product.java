package en.ensiteck.myresto.dto;

public record Product(Long id, String name, double price) {
    public static Product fromEntity(en.ensiteck.myresto.entity.Product product){
        return new Product(product.getId(),product.getName(),product.getPrice());
    }
}
