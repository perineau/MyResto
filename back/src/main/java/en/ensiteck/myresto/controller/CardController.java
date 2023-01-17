package en.ensiteck.myresto.controller;

import en.ensiteck.myresto.dto.Card;
import en.ensiteck.myresto.service.CardService;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("card")
public class CardController {

    private CardService cardService;

    public CardController(CardService cardService){
        this.cardService =cardService;
    }

    @GetMapping("")
    public Card gerCard(){
        return cardService.getCard();
    }

}
