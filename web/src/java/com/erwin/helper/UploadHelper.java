/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.dao.UploadDao;
import com.erwin.pojo.UploadFiles;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author Kanakaiah
 */
public class UploadHelper {
    
    public static List<UploadFiles> getFiles(String fileName,String filePath) throws SQLException
    {
        
        List<UploadFiles> l=UploadDao.getFiles(fileName, filePath);
        return l;
        
    }
    
    public static boolean setFiles(String fileName,String filePath) throws SQLException, IOException
    {
        
        boolean b=false;
        b=UploadDao.setFiles(fileName,filePath);
        System.out.println(b);
        return b;
    }
    
    public static String findUsingEnhancedForLoop(String name, List<UploadFiles> l) {
 
        for (UploadFiles customer : l) {
        if (customer.getFileName().equals(name)) {
            String custname=customer.getFileName();
             System.out.println(custname);
            return customer.getFilePath();
        }
    }
    return null;
    }
}
