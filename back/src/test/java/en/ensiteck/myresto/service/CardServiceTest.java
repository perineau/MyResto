package en.ensiteck.myresto.service;

import en.ensiteck.myresto.dto.Product;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
class CardServiceTest {

    @Autowired
    CardService cardService;

    @Test
    void getAllProduct(){
        var card = cardService.getCard();
        assertThat(card.entry()).contains(new Product(4L,"salade",1.99),new Product(5L,"paté",2));
        assertThat(card.main()).contains(new Product(3L,"frite",2.50),new Product(2L,"cote de port",4.99));
        assertThat(card.dessert()).contains(new Product(1L,"glace chocolat",2));
        assertThat(card.drink()).contains(new Product(6L,"coca cola",3.99));
    }
}