/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dao;

import com.erwin.dbutil.ExpandTreeUtils;
import com.erwin.pojo.ExpandTreeEmployee;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Kanakaiah
 */
public class ExpandTreeDao {

    ArrayList<ExpandTreeEmployee> al = new ArrayList<>();
     ResultSet rs = null;
    public ArrayList<ExpandTreeEmployee> getData(int id) throws IOException, SQLException
    {
        try
        {
            Connection con=null;
            con=ExpandTreeUtils.getConnections();
            System.out.println("Connection Established==="+con);
 
            PreparedStatement ps=con.prepareStatement("select * from ErwinEmployees where pid=?");
            ps.setInt(1,id);
            rs=ps.executeQuery();
            while(rs.next())
            {
              ExpandTreeEmployee emp=new ExpandTreeEmployee();
              emp.setId(rs.getInt(1));
              emp.setPid(rs.getInt(2));
              emp.setName(rs.getString(3));
              emp.setDescriptions(rs.getString(4));
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
