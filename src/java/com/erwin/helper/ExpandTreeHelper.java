/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.dao.EmployeeDao;
import com.erwin.dao.ExpandTreeDao;
import com.erwin.dbutil.DbOperation;
import com.erwin.pojo.Employee;
import com.erwin.pojo.ExpandTreeEmployee;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;

/**
 *
 * @author Kanakaiah
 */
public class ExpandTreeHelper {
    
        public static List<ExpandTreeEmployee> getEmployee(int id) throws SQLException, ClassNotFoundException, IOException {
            ExpandTreeDao dao=new ExpandTreeDao();
        List<ExpandTreeEmployee> dbEmps = dao.getData(id);
        return dbEmps;

    } 
}
