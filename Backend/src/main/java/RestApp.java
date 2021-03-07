package main.java;

import main.java.entities.DataBase;
import main.java.manager.FormManager;
import main.java.manager.UserManager;

import javax.ws.rs.ApplicationPath;
import javax.ws.rs.core.Application;
import java.util.Arrays;
import java.util.HashSet;
import java.util.Set;

@ApplicationPath("/api")
public class RestApp extends Application {

    @Override
    public Set<Class<?>> getClasses ( ) {
        return new HashSet<Class<?>>(Arrays.asList(FormManager.class, UserManager.class, DataBase.class));
    }
}
