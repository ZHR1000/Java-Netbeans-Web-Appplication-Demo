/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.dbutil.MultilanguageDbOperation;
import com.erwin.forms.Multilanguage;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.*;
import java.util.ResourceBundle;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Kanakaiah
 */
public class MultilanguageHelper {
    
       public static List<Multilanguage> getData() throws IOException, SQLException, ClassNotFoundException {
        List<Multilanguage> l=MultilanguageDbOperation.getData();
        return l;
    }


    


    public static JSONObject getJSONObject(String country) {
        HashMap<String, String> map = new HashMap<>();
      
        String lang="";
        if(country.equals("US"))
        {
            lang="en";
        }
        else if(country.equals("IN"))
        {
            lang="hi";
        }
        else if(country.equals("CH"))
        {
            lang="zh";
        }
            
        Locale l=new Locale(lang,country);
        ResourceBundle r= ResourceBundle.getBundle("com.erwin.helper/Bundle",l);
         Enumeration<String> keys=r.getKeys();
         while(keys.hasMoreElements())
         {
             String key=keys.nextElement();
             map.put(key,r.getString(key));
         }
         
         JSONObject jo=new JSONObject();
         for (Map.Entry<String, String> entry : map.entrySet()) {
            try {
                jo.put(entry.getKey(), entry.getValue());
            } catch (JSONException ex) {
               System.out.println("error");
               ex.printStackTrace();
            }
        }
        return  jo;
    }
    public static void main(String args[]){
        System.out.println(getJSONObject("CH"));
    }
}
