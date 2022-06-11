/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.utils;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.util.Properties;

/**
 *
 * @author Kanakaiah
 */
public class UploadConnectionUtils {
    
     static Connection con= null;
    private static final String db_url="url";
   private static final String db_driver="driver";
    public static Connection getConnections() throws IOException,FileNotFoundException
    {
        try
        {
             Properties p=new Properties();
             p.load(new FileInputStream("D:\\Projects_bk\\NETBEANS_DHTMLX\\ALL_TASKS\\upload.properties"));
             String db_DRIVER=p.getProperty(db_driver);
             String db_URL=p.getProperty(db_url);
             System.out.println(db_DRIVER);
             System.out.println(db_URL);
             Class.forName(db_DRIVER);
             con=DriverManager.getConnection(db_URL,"sa","skn");
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        return con;
    }
}
