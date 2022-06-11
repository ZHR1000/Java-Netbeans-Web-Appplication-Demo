/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dbutil;

import com.erwin.forms.FormGrid;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Kanakaiah
 */
public class FormGridDbOperation {


    

    public static List<FormGrid> getData() throws IOException, SQLException, ClassNotFoundException {
                  List<FormGrid> l=new CopyOnWriteArrayList<FormGrid>();

        Connection con = FormGridConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("select * from FormGridTABLE");
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           FormGrid f=new FormGrid();
            f.setSno(rs.getInt(1));
            f.setName(rs.getString(2));
            f.setType(rs.getString(3));
            f.setValue(rs.getString(4));
            l.add(f);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
    }

    public static boolean saveData(String j) throws IOException, SQLException, ClassNotFoundException, JSONException {

            int n = 0;

            JSONObject jo = new JSONObject(j);


            Connection con = FormGridConnectionUtils.getConnections();
            PreparedStatement pst = con.prepareStatement("insert into  FormGridTABLE values(?,?,?)");
            pst.setString(1, (String)jo.get("name"));
            pst.setString(2, (String)jo.get("type"));
            pst.setString(3, (String)jo.get("value"));
            n = pst.executeUpdate();
      
            if (n != 0) {
                return true;
            } else {
                return false;
            }
    }

    public static boolean removeData(int id) throws IOException, SQLException, ClassNotFoundException {
        Connection con = FormGridConnectionUtils.getConnections();
        PreparedStatement pst = null;
        pst = con.prepareStatement("delete from FormGridTABLE where sno=?");
        pst.setInt(1, id);
        int d = pst.executeUpdate();
        if (d != 0) {
            return true;
        } else {
            return false;
        }
    }

    public static boolean saveUpdates(String str) throws JSONException, SQLException, IOException {
         JSONArray ja = new JSONArray(str);
            int n = 0;
            for (int i = 0; i < ja.length(); i++) {
                JSONObject jo = ja.getJSONObject(i);

                Connection con = ConnectionUtils.getConnections();
                PreparedStatement pst = con.prepareStatement("update FormGridTABLE set name=?,type=?,value=? where sno=?");

                pst.setInt(4, (Integer.parseInt((String) jo.get("id"))));
                pst.setString(1, jo.getString("name"));
                pst.setString(2, jo.getString("type"));
                pst.setString(3, jo.getString("value"));
                n = pst.executeUpdate();
      }
            if (n != 0) {
                return true;
            } else {
                return false;
            }
    }
    
    
}
