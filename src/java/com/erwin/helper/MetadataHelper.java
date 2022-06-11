/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.dbutil.MetadataDbOperation;
import com.erwin.forms.MetadataForm;
import java.sql.SQLException;
import java.util.ArrayList;

/**
 *
 * @author Kanakaiah
 */
public class MetadataHelper {

    public static boolean setData(MetadataForm ef) throws SQLException, ClassNotFoundException {
        boolean b = MetadataDbOperation.loadData(ef);
        return b;
    }

    public static ArrayList getTables() throws SQLException, ClassNotFoundException {
        ArrayList b = MetadataDbOperation.loadTables();
        return b;
    }
}
