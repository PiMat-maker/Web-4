package main.java.filters;


import main.java.entities.DataBase;
import main.java.security.SecurePassword;

import javax.ejb.EJB;
import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.Objects;

@WebFilter(urlPatterns = {"/api/form/*", "/api/user/profile/*", "/api/user/login/*"})
public class UserFilter implements Filter {

    @EJB
    private DataBase dataBase;

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        System.out.println("FILTER USER");

        try {
            String authorization = request.getHeader("Authorization");
            System.out.println("authorization " + authorization);
            String[] authValues = null;
            if (authorization != null && authorization.toLowerCase().startsWith("bearer")) {
                authValues = authorization.split(",");
            }
            String[] path = request.getPathInfo().split("/");
            String username = path[path.length - 1];
            String password = authValues[1];
            password = SecurePassword.generate(password);
            String token= null;
            if (authValues.length == 3){
                token = authValues[2];
                password = authValues[1];
            }

            System.out.println("USERNAME " + username);
            System.out.println("PASSWORD " + password);
            System.out.println("TOKEN " + token);

            String realPass = dataBase.getProfile(username).getPassword().trim();
            String realToken = dataBase.getProfile(username).getToken().trim();

            //System.out.println("ANSWER " + Objects.equals(realToken, token));

            if (authValues == null || !realPass.equals(password.trim()) ||
                    (token != null && !Objects.equals(realToken, token.trim()))) {
                //System.out.println("UNA");
                //System.out.println(realPass.compareTo(password));
                //System.out.println(realPass + "/");
                response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
            } else {
                filterChain.doFilter(request, response);
            }
        } catch (NullPointerException e){
            System.out.println("Thor");
            response.sendError(HttpServletResponse.SC_UNAUTHORIZED);
        }
    }

    @Override
    public void destroy() {

    }
}
