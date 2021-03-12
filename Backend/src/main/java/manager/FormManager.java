package main.java.manager;

import main.java.entities.DataBase;
import main.java.entities.FormBean;

import javax.ejb.EJB;
import javax.ejb.Singleton;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.ws.rs.*;
import javax.ws.rs.core.Context;
import javax.ws.rs.core.MediaType;
import javax.ws.rs.core.Response;
import java.util.List;

@Singleton
@Path("/points/{username}")
public class FormManager {

    @EJB
    private DataBase dataBase;

    @POST
    @Consumes(MediaType.APPLICATION_FORM_URLENCODED)
    public Response addPoint(@PathParam("username") String username, @Context HttpServletRequest request, @Context HttpServletResponse response, @FormParam("x") String xs, @FormParam("y") String ys, @FormParam("r") String rs) {

        List<FormBean> res = null;
        try {
            String realUser = (String) request.getAttribute("username");
            if (realUser == null || !realUser.trim().equals(username))
                throw new NotAuthorizedException("Unauthorized");

            String[] xlist = xs.split(",");
            String[] ylist = ys.split(",");
            String[] rlist = rs.split(",");

            for (int i = 0; i < xlist.length; ++i) {
                double x = Double.parseDouble(xlist[i]);
                double y = Double.parseDouble(ylist[i]);
                double r = Double.parseDouble(rlist[i]);

                dataBase.addPoint(x, y, r, username);
            }
            res = dataBase.getList(username);
        } catch (NotAuthorizedException e){
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
