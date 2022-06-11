/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dbutil;

import com.erwin.forms.Multilanguage;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;

/**
 *
 * @author Kanakaiah
 */
public class MultilanguageDbOperation {
    
    public static List<Multilanguage> getData() throws IOException, SQLException, ClassNotFoundException {
                  List<Multilanguage> l=new CopyOnWriteArrayList<Multilanguage>();

        Connection con = MultilanguageConnectionUtils.getConnections();
        
        PreparedStatement pst = con.prepareStatement("select * from MultiLanguage");
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Multilanguage f=new Multilanguage();
            f.setId(rs.getInt(1));
            f.setName(rs.getString(2));
            f.setContact(rs.getString(3));
            f.setEmail(rs.getString(4));
            l.add(f);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
    }
}
