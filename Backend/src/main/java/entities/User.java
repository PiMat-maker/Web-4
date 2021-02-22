package main.java.entities;

import main.java.security.SecurePassword;
import main.java.entities.FormBean;

import javax.persistence.*;
import java.io.Serializable;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "userdata")
public class User implements Serializable {

    @Id
    private String username;

    private String password;
    private String token;

    public User(){}

    public User(String username, String password, String token){
        this.username = username;
        this.password = password;
        this.token = token;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = SecurePassword.generate(password);
    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

}
