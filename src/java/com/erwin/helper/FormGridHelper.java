/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.dbutil.DbOperation;
import com.erwin.dbutil.FormGridDbOperation;
import com.erwin.forms.FormGrid;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Kanakaiah
 */
public class FormGridHelper {


    public static boolean saveData(String j) throws IOException, SQLException, ClassNotFoundException, JSONException {
        boolean b=false;
        b=FormGridDbOperation.saveData(j);
        System.out.println(b);
        return b;
    }

    public static List<FormGrid> getData() throws IOException, SQLException, ClassNotFoundException {
        List<FormGrid> l=FormGridDbOperation.getData();
        return l;
    }

    public static boolean deleteHelper(int id) throws IOException, SQLException, ClassNotFoundException {
         boolean b = FormGridDbOperation.removeData(id);

        return b;
    }

    public static boolean saveUpdates(String str) throws JSONException, SQLException, IOException {
         boolean b=false;
        
        
    
        b=FormGridDbOperation.saveUpdates(str);
        
        
        return b;
            
    }
    
}
