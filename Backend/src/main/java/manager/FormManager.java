package main.java.manager;

import main.java.entities.DataBase;
import main.java.entities.FormBean;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.util.List;
import java.util.Map;

@Singleton
@Path("/points/{username}")
public class FormManager {

    @EJB
    private DataBase dataBase;

    @POST
    @Consumes("multipart/form-data")
    public Response addPoint(@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response, Map<String, Double> params) {
        
        String token = null;
        String authorization = request.getHeader("Authorization");
        String[] authValues = null;

        if (authorization != null && authorization.toLowerCase().startsWith("bearer")) {
            authValues = authorization.split(",");
            token = authValues[1].trim();
        }

        List<FormBean> res = null;
        try {
            if (token == null || !token.equals(dataBase.getProfile(username).getToken().trim()))
                throw new NotAuthorizedException("Unauthorized");

            for (int i = 0; i < params.size() / 3; ++i) {
                System.out.println("Start");
                double x = params.get("x[" + i + "]");
                double y = params.get("y[" + i + "]");
                double r = params.get("r[" + i + "]");
                System.out.println("I");

                //x = Double.parseDouble(String.format("%.4f", x));
                //y = Double.parseDouble(String.format("%.4f", y));
                System.out.println("Parse");

                dataBase.addPoint(x, y, r, username);
                System.out.println("Add");
            }
            System.out.println("fin");
            res = dataBase.getList(username);
        } catch (NotAuthorizedException e){
                System.out.println("Trouble");
                return Response.status(Response.Status.UNAUTHORIZED).build();
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        return Response.ok(res).build();
    }

    @GET
    public Response getPoints(@PathParam("username") String username){
        List<FormBean> res = null;
        try {
            res = dataBase.getList(username);
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }
        return Response.ok(res).build();
    }
}
