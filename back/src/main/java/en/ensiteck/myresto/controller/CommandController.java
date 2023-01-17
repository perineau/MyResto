package en.ensiteck.myresto.controller;

import en.ensiteck.myresto.dto.ProductPost;
import en.ensiteck.myresto.exception.BadIdException;
import en.ensiteck.myresto.service.CommandService;
import jakarta.validation.Valid;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("command")
public class CommandController {

    private CommandService commandService;

    public CommandController(CommandService commandService){
        this.commandService=commandService;
    }

    @PostMapping("")
    public void createCommand(@Valid @RequestBody List<ProductPost> command, Principal principal) throws BadIdException {
        commandService.createCommand(principal.getName(),command);
    }

    @ExceptionHandler(BadIdException.class)
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    public Map<String, String> handleValidationExceptions(
            BadIdException ex) {
        Map<String, String> errors = new HashMap<>();
        ex.getIds().forEach(id-> errors.put(id,"bad id"));
        return errors;
    }

}
