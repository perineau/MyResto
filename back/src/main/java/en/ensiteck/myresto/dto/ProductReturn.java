package en.ensiteck.myresto.dto;

public record ProductReturn(
        Long id,
        String name,
        double price) {
    public static ProductReturn fromEntity(en.ensiteck.myresto.entity.Product product){
        return new ProductReturn(product.getId(),product.getName(),product.getPrice());
    }
}
