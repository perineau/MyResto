package en.ensiteck.myresto.controller;

import jakarta.transaction.Transactional;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.junit.jupiter.api.Assertions.*;
import static org.springframework.security.test.web.servlet.request.SecurityMockMvcRequestPostProcessors.httpBasic;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.content;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@SpringBootTest
@AutoConfigureMockMvc
@Transactional
class CommandControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Test
    void createCommand() throws Exception {
        this.mockMvc.perform(post("/command").content("""
                        [
                        	{
                        	    "id":1,
                        	    "quantity": 1
                        	},
                        	{
                        	    "id":2,
                        	    "quantity": 1
                        	},
                        	{
                        	    "id":3,
                        	    "quantity": 1
                        	}
                        ]
                        """).contentType(MediaType.APPLICATION_JSON)
                        .with(httpBasic("test","test"))
                )
                .andExpect(status().isOk());
    }

    @Test
    void createCommandBadCommand() throws Exception {
        this.mockMvc.perform(post("/command").content("""
                        [
                        	{
                        	    "id":10,
                        	    "quantity": 1
                        	},
                        	{
                        	    "id":2,
                        	    "quantity": 1
                        	},
                        	{
                        	    "id":3,
                        	    "quantity": 1
                        	}
                        ]
                        """).contentType(MediaType.APPLICATION_JSON)
                        .with(httpBasic("test","test"))
                )
                .andExpect(status().isBadRequest())
                .andExpect(content().json("""
                {
                    "10":"bad id"
                }
                """));
    }

}