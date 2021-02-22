package main.java.entities;

import javax.annotation.PostConstruct;
import javax.ejb.Singleton;
import javax.persistence.*;
import java.io.Serializable;
import java.sql.SQLException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.List;

@Singleton
public class DataBase implements Serializable {

    @PersistenceContext(unitName = "manager")
    private EntityManager entityManager;

    private FormBean formBean;

    public DataBase() {}

    public void setFormBean(FormBean formBean) { this.formBean = formBean; }

    public FormBean getFormBean() { return formBean; }

    public void setEntityManager(EntityManager entityManager) { this.entityManager = entityManager; }

    public EntityManager getEntityManager() { return entityManager; }

    @PostConstruct
    public void init(){
        formBean = new FormBean();
    }

    public void saveData(FormBean formBean, String username) {
        User user = entityManager.find(User.class, username);
        formBean.setUser(user);
        formBean.setWorkTime(System.currentTimeMillis());
        formBean.getResult();
        formBean.setWorkTime(System.currentTimeMillis() - formBean.getWorkTime());
        SimpleDateFormat sDFormat = new SimpleDateFormat("HH:mm:ss");
        formBean.setCurrentTime(sDFormat.format(Calendar.getInstance().getTime()));
        //try {
            //userTransaction.begin();
            entityManager.persist(formBean);
            //userTransaction.commit();
        //}catch (Exception e){
        //    System.out.println("UserTransaction Failed save data");
        //}
    }

    public List<FormBean> getList(String username){
        //try {
        //    userTransaction.begin();

        //    userTransaction.commit();
        //}catch (Exception e){
        //    System.out.println("UserTransaction Failed save data");
        //}
        return new ArrayList<>((entityManager.createQuery("select res from FormBean res where res.user.username = :username", FormBean.class))
                .setParameter("username", username).getResultList());
    }

    public void clear(String username){
        //try {
        //    userTransaction.begin();
            entityManager.createQuery("delete from User res where res.username like :username").setParameter("username", username);
        //    userTransaction.commit();
        //}catch (Exception e){
        //    System.out.println("UserTransaction Failed clear");
        //}
    }

    public void addPoint(String username){
        saveData(new FormBean(formBean.getX(), formBean.getY(), formBean.getR()), username);
    }

    public void setUser(String username, String password, String token) {
        User user = new User(username, password, token);
        //try {
        //    userTransaction.begin();
            entityManager.persist(user);
        //    userTransaction.commit();
        //}catch (Exception e){
        //    System.out.println("UserTransaction Failed save user");
        //}
    }

    public User getProfile(String username){
        User user;
        //try {
        //    userTransaction.begin();
        System.out.println("SETUSER");
            user = entityManager.find(User.class, username);
        //    userTransaction.commit();
        //}catch (Exception e){
        //    System.out.println("UserTransaction Failed get user");
        //    return null;
        //}
        return user;
    }
}