/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dbutil;

import com.erwin.forms.MetadataForm;
import com.erwin.pojo.MetadataDB;
import java.sql.Connection;
import java.sql.DatabaseMetaData;
import java.sql.DriverManager;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class MetadataDbOperation {

    private static String DB_URL ;
    private static String DB_NAME;
    private static String DB_USER;
    private static String DB_PASSWORD;
    static ArrayList tableslist;
    private static final String db_DRIVER="com.microsoft.sqlserver.jdbc.SQLServerDriver";

     static Connection connection = null;
    static DatabaseMetaData metadata = null;

    public static Connection getConnection() throws SQLException, ClassNotFoundException {
        Class.forName(db_DRIVER);
        Connection connection = DriverManager.getConnection(DB_URL, DB_USER,
                DB_PASSWORD);
        System.err.println("The connection is successfully obtained");
        return connection;
    }

    public static void printGeneralMetadata() throws SQLException {
        System.out.println("Database Product Name: "
                + metadata.getDatabaseProductName());
        System.out.println("Database Product Version: "
                + metadata.getDatabaseProductVersion());
        System.out.println("Logged User: " + metadata.getUserName());
        System.out.println("JDBC Driver: " + metadata.getDriverName());
        System.out.println("Driver Version: " + metadata.getDriverVersion());
        System.out.println("\n");
    }

    public static ArrayList getTablesMetadata() throws SQLException {
        String table[] = { "TABLE" };
        ResultSet rs = null;
        ArrayList tables = null;
        // receive the Type of the object in a String array.
        rs = metadata.getTables(null, null, null, table);
        tables = new ArrayList();
        while (rs.next()) {
            tables.add(rs.getString("TABLE_NAME"));
        }
        return tables;
    }

    public static boolean loadData(MetadataForm ef) throws SQLException, ClassNotFoundException {
        DB_URL=ef.getUrl();
        DB_NAME=ef.getDbname();
        DB_USER=ef.getUname();
        DB_PASSWORD=ef.getPassword();

        Connection con=getConnection();

        try {
            metadata = con.getMetaData();
        } catch (SQLException e) {
            System.err.println("There was an error getting the metadata: "
                    + e.getMessage());
        }

        try {
            printGeneralMetadata();
            // Print all the tables of the database scheme, with their names and
            // structure
            return true;


        } catch (SQLException e) {
            System.err
                    .println("There was an error retrieving the metadata properties: "
                            + e.getMessage());
        }
     return false;
    }

    public static ArrayList loadTables() throws SQLException, ClassNotFoundException
    {
      Class.forName(db_DRIVER);
        Connection connection = DriverManager.getConnection(MetadataDB.url, MetadataDB.uname,
                MetadataDB.password);

      try {
          metadata = connection.getMetaData();
      } catch (SQLException e) {
          System.err.println("There was an error getting the metadata: "
                  + e.getMessage());
      }
        tableslist=getTablesMetadata();

            for(int i=0;i<tableslist.size();i++)
            {
                System.out.println(tableslist.get(i));
            }
            return tableslist;
    }
}
