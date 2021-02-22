package main.java.manager;

import main.java.entities.DataBase;
import main.java.entities.FormBean;

import javax.annotation.PostConstruct;
import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.Response;
import java.io.IOException;
import java.util.List;
import java.util.Map;

@Singleton
@Path("/form/{username}")
public class FormManager {

    @EJB
    private DataBase dataBase;

    @POST
    @Consumes("multipart/form-data")
    public Response addPoint(@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response, Map<String, Double> params) {

        List<FormBean> res = null;
        //System.out.println(params.size());
        try {
            for (int i = 0; i < params.size()/3; ++i) {
                double x = params.get("x[" + i + "]");
                double y = params.get("y[" + i + "]");
                double r = params.get("r[" + i + "]");

                x = Double.parseDouble(String.format("%.3f", x));
                y = Double.parseDouble(String.format("%.3f", y));

                System.out.println(x + " " + y + " " + r);

                dataBase.getFormBean().setX(x);
                dataBase.getFormBean().setY(y);
                dataBase.getFormBean().setR(r);

                System.out.println("USER " + username);

                dataBase.addPoint(username);
                System.out.println(i);
            }
            res = dataBase.getList(username);
        } catch (Exception e){
            return Response.status(Response.Status.BAD_REQUEST).build();
        }

        System.out.println("X " + res.get(0).getX());
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
