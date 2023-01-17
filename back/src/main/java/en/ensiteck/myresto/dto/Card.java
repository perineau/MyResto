package en.ensiteck.myresto.dto;

import java.util.List;

public record Card (List<ProductReturn> entry, List<ProductReturn> main, List<ProductReturn> dessert, List<ProductReturn> drink){}
