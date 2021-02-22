package main.java.filters;

import javax.servlet.*;
import javax.servlet.annotation.WebFilter;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;

@WebFilter(urlPatterns = "/*")
public class CORSFilter implements Filter {

    @Override
    public void init(FilterConfig filterConfig) throws ServletException {

    }

    @Override
    public void doFilter(ServletRequest servletRequest, ServletResponse servletResponse, FilterChain filterChain) throws IOException, ServletException {

        HttpServletRequest request = (HttpServletRequest) servletRequest;
        HttpServletResponse response = (HttpServletResponse) servletResponse;
        System.out.println("filters.CORSFilter HTTP Request: " + request.getMethod());
        System.out.println(request.getRequestURI());
        //System.out.println("BODY ");
        //request.getParameterMap().values().forEach(System.out::println);

        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Origin", "*");
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
        ((HttpServletResponse) servletResponse).addHeader("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Access-Control-Request-Method, " +
                "Access-Control-Request-Headers, Origin, Accept, Content-Type, X-Requested-With, Authorization");

        if (request.getMethod().equals("OPTIONS")){
            response.setStatus(HttpServletResponse.SC_ACCEPTED);
            return;
        }

        //System.out.println("END OF CORS");
        filterChain.doFilter(request, servletResponse);
    }

    @Override
    public void destroy() {

    }
}
