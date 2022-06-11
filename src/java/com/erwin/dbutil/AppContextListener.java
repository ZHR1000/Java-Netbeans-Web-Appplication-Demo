package com.erwin.dbutil;



import java.io.FileInputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.SQLException;
import java.util.Properties;
import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;


public class AppContextListener implements ServletContextListener {
    private static final String db_url="url";
    private static final String db_driver="driver";
    
    @Override
    public void contextInitialized(ServletContextEvent servletContextEvent) {
        System.out.println("Server Started .................");
    	ServletContext ctx = servletContextEvent.getServletContext();   	
        try
        {
         Properties p=new Properties();
         p.load(new FileInputStream("D:\\Projects_bk\\NETBEANS_DHTMLX\\ALL_TASKS\\FormGridDatabase.properties"));
         String db_DRIVER=p.getProperty(db_driver);
         String db_URL=p.getProperty(db_url);
         Class.forName(db_DRIVER);
    	String url = ctx.getInitParameter(db_URL);
    	String uname = ctx.getInitParameter("sa");
    	String pwd = ctx.getInitParameter("goanalytix@1");
    	
    	//create database connection from init parameters and set it to context
    	Connection con =DriverManager.getConnection(url, uname, pwd);
    	ctx.setAttribute("DBManager", con);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
    	System.out.println("Database connection initialized for Application.");
    }

    @Override
    public void contextDestroyed(ServletContextEvent servletContextEvent) {
        System.out.println("Server Stoped .................");
    	ServletContext ctx = servletContextEvent.getServletContext();
    	Connection con = (Connection) ctx.getAttribute("DBManager");
        try {
            con.close();
        } catch (SQLException ex) {
//            Logger.getLogger(ContextListener.class.getName()).log(Level.SEVERE, null, ex);
        }
    	System.out.println("Database connection closed for Application.");
    	
    }
    
}
