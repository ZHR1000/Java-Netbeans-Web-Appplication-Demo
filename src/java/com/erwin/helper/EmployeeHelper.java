/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.forms.EmployeeForm;
import com.erwin.dbutil.DbOperation;
import com.erwin.pojo.Employee;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import org.json.JSONException;

public class EmployeeHelper {

 
    public static List<Employee> getEmployee() throws SQLException, ClassNotFoundException, IOException {
        List<Employee> dbEmps = DbOperation.getData();
        return dbEmps;

    }

    public static boolean setEmployee(EmployeeForm ef) throws ClassNotFoundException, SQLException, IOException {
        boolean b = DbOperation.setData(ef);
        return b;

    }

    public static boolean deleteHelper(int id) throws ClassNotFoundException, SQLException, IOException {

        boolean b = DbOperation.removeData(id);

        return b;

    }

    public static boolean saveData(String str) throws ClassNotFoundException, SQLException, IOException, JSONException {
        boolean b=false;
        
        
    
        b=DbOperation.saveData(str);
        
        
        return b;
            

}

    public static void excelEmployee(List<Employee> dbEmps) throws FileNotFoundException, NullPointerException, IOException {
        
        DbOperation.excelEmployee(dbEmps);
        
    }
}
