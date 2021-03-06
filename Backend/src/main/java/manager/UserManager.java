package main.java.manager;

import main.java.entities.DataBase;
import main.java.entities.User;
import main.java.security.SecurePassword;
import main.java.security.Token;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.persistence.EntityManager;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.Map;

@Singleton
@Path("/user")
public class UserManager {

    @EJB
    private DataBase dataBase;

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    @Path("/register/{username}")
    public Response addUser(@PathParam("username") String username, @Context HttpServletRequest request, @FormParam("password") String password) {

        User user = null;
        try {
            user = dataBase.getProfile(username);
            if (user != null){
                return Response.status(Response.Status.FORBIDDEN).build();
            }
            password = SecurePassword.generate(password);
            String token = Token.generateToken(username);
            dataBase.setUser(username, password, token);
            user = dataBase.getProfile(username);
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(user.getToken()).build();
    }

    @GET
    @Path("/profile/{username}")
    public Response getProfileUser(@PathParam("username") String username){
        User user = null;
        try {
            user = dataBase.getProfile(username);
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        return Response.ok(user.getToken()).build();
    }

    @POST
    @Path("/login/{username}")
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response checkUser(@PathParam("username") String username, @FormParam("password") String password){
        User user = null;
        try {
            user = dataBase.getProfile(username);
            password = SecurePassword.generate(password);
            String realPass = user.getPassword().trim();
            if (!realPass.equals(password.trim())){
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
            String token = Token.generateToken(user.getToken());
            dataBase.saveToken(user, token);
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        return Response.ok(user.getToken()).build();
    }
}
