package en.ensiteck.myresto.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.util.Date;

@Data
@Entity
@Table(name = "user_resto")
public class User {

    @Id
    @Column(name="login")
    private String login;

    @Column(name="firstname")
    private String firstname;

    @Column(name="lastname")
    private String lastname;

    @Column(name="password")
    private String password;

    @Column(name="admin")
    private Boolean admin;
}
