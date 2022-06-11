/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dao;

import com.erwin.dbutil.ConnectionUtils;
import com.erwin.pojo.Employee;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;


public class EmployeeDao {

     ArrayList<Employee> al = new ArrayList<>();
     ResultSet rs = null;
    public ArrayList<Employee> getDao() throws IOException, SQLException
    {
        try
        {
            Connection con=null;
            con=ConnectionUtils.getConnections();
            System.out.println("Connection Established==="+con);
            String sql="select * from contacts";
            PreparedStatement ps=con.prepareStatement(sql);
            rs=ps.executeQuery();
            while(rs.next())
            {
              Employee emp=new Employee();
              emp.setId(rs.getInt(1));
              emp.setName(rs.getString(2));
              emp.setNumber(rs.getString(3));
              emp.setEmail(rs.getString(4));
              al.add(emp);
            }
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
}
