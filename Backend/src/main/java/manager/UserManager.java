package main.java.manager;

import main.java.entities.DataBase;
import main.java.entities.FormBean;
import main.java.entities.User;
import main.java.security.SecurePassword;
import main.java.security.Token;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.persistence.PersistenceException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Singleton
@Path("/user")
public class UserManager {

    @EJB
    private DataBase dataBase;

    @POST
    @Consumes("multipart/form-data")
    @Path("/register/{username}")
    public Response addUser(@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response, Map<String, String> params) {

        User user = null;
        System.out.println("ADD USER");
        try {
            user = dataBase.getProfile(username);
            if (user != null){
                return Response.status(Response.Status.FORBIDDEN).build();
            }
            String password = params.get("password");
            password = SecurePassword.generate(password);
            String token = Token.generateToken(username);
            dataBase.setUser(username, password, token);
            user = dataBase.getProfile(username);
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(user).build();
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
        return Response.ok(user).build();
    }

    @POST
    @Path("/login/{username}")
    public Response checkUser(@PathParam("username") String username){
        User user = null;
        try {
            user = dataBase.getProfile(username);
            System.out.println(user);
            if (user == null){
                return Response.status(Response.Status.UNAUTHORIZED).build();
            }
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        System.out.println("Check user");
        return Response.ok(user).build();
    }
}