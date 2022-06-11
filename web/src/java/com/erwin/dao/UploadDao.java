/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dao;

import com.erwin.pojo.UploadFiles;
import com.erwin.utils.UploadConnectionUtils;
import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;

/**
 *
 * @author Kanakaiah
 */
public class UploadDao {
    
    public static List<UploadFiles> getFiles(String fileName,String filePath) throws SQLException
    {
             ArrayList<UploadFiles> al = new ArrayList<>();
     ResultSet rs = null;
 
        try
        {
            Connection con=null;
            con=UploadConnectionUtils.getConnections();
            System.out.println("Connection Established==="+con);
            String sql="select * from uploads";
            PreparedStatement ps=con.prepareStatement(sql);
            rs=ps.executeQuery();
            while(rs.next())
            {
               UploadFiles uf=new UploadFiles();
               uf.setId(rs.getInt(1));
               uf.setFileName(rs.getString(2));
               uf.setFilePath(rs.getString(3));
               al.add(uf);
            }
            System.out.println(al);
        }
        catch(Exception e)
        {
            e.printStackTrace();
        }
        finally{
            rs.close();
        }
        return al;
    }  
    
    public static boolean setFiles(String fileName,String filePath) throws IOException, SQLException
    {
        int n;
        Connection con = UploadConnectionUtils.getConnections();
            PreparedStatement pst = con.prepareStatement("insert into  uploads values(?,?)");
            pst.setString(1, fileName);
            pst.setString(2, filePath);
            n = pst.executeUpdate();
      
            if (n != 0) {
                return true;
            } else {
                return false;
            }
    }
    
        public static void uploadFilepath(String fullpath) throws SQLException, IOException{
            
                    
             Connection con = UploadConnectionUtils.getConnections();
            PreparedStatement pst = con.prepareStatement("insert into uploads(filePath) values(?)");
            pst.setString(1, fullpath);
        }
    
     public static String getFilePath(String fileName) throws IOException, SQLException
    {
        ResultSet rst;
        String filepath = null;
        Connection con = UploadConnectionUtils.getConnections();
            PreparedStatement pst = con.prepareStatement("select filePath from  uploads where fileName=?");
            pst.setString(1, fileName);
            rst = pst.executeQuery();
             
             while(rst.next())
            {
                filepath=rst.getString(2);
            }
            System.out.println("filepath="+filepath);
        return filepath;
    }
//    public static void main(String args[]){
//        try {
//            new UploadDao().getFiles("", "");
//        } catch (SQLException ex) {
//            Logger.getLogger(UploadDao.class.getName()).log(Level.SEVERE, null, ex);
//        }
//    }
 }

