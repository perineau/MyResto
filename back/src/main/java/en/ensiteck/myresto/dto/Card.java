package en.ensiteck.myresto.dto;

import java.util.List;

public record Card (List<Product> entry,List<Product> main,List<Product> dessert,List<Product> drink){}
