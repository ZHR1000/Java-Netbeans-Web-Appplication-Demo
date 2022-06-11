/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dbutil;


import com.erwin.forms.EmployeeForm;
import com.erwin.pojo.Employee;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.concurrent.CopyOnWriteArrayList;
import org.json.JSONArray;
import org.json.JSONObject;
import java.lang.String;

import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.ArrayList;

import org.apache.poi.hssf.usermodel.HSSFSheet;
import org.apache.poi.hssf.usermodel.HSSFWorkbook;
import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;
import org.json.JSONException;


public class DbOperation {
      public static List<Employee> getData() throws SQLException, ClassNotFoundException, IOException {
          List<Employee> l=new CopyOnWriteArrayList<Employee>();

        Connection con = ConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("select * from contacts");
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Employee c=new Employee();
           c.setId(rs.getInt(1));
            c.setName(rs.getString(2));
            c.setNumber(rs.getString(3));
            c.setEmail(rs.getString(4));
            l.add(c);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
    }

    public static boolean setData(EmployeeForm c) throws ClassNotFoundException, SQLException, IOException {
        int i=0;
          Connection con = ConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("insert into  contacts values(?,?,?)");
        pst.setString(1, c.getName());
        pst.setString(2, c.getNumber());
        pst.setString(3, c.getEmail());
         i = pst.executeUpdate();
         if(i!=0){
        return true;
         }
         else
             return false;
   
    }

    public static boolean removeData(int id)throws ClassNotFoundException , SQLException, IOException {
        Connection con = ConnectionUtils.getConnections();
        PreparedStatement pst = null;
        pst = con.prepareStatement("delete from contacts where id=?");
        pst.setInt(1, id);
        int d = pst.executeUpdate();
        if (d != 0) {
            return true;
        } else {
            return false;
        }

    }

    public static boolean saveData(String str) throws IOException, SQLException, JSONException {
            JSONArray ja = new JSONArray(str);
            int n = 0;
            for (int i = 0; i < ja.length(); i++) {
                JSONObject jo = ja.getJSONObject(i);

                Connection con = ConnectionUtils.getConnections();
                PreparedStatement pst = con.prepareStatement("update contacts set name=?,number=?,email=? where id=?");

                pst.setInt(4, (Integer.parseInt((String) jo.get("id"))));
                pst.setString(1, jo.getString("name"));
                pst.setString(2, jo.getString("number"));
                pst.setString(3, jo.getString("email"));
                n = pst.executeUpdate();
      }
            if (n != 0) {
                return true;
            } else {
                return false;
            }
    }

    public static void excelEmployee(List<Employee> dbEmps) throws FileNotFoundException, NullPointerException, IOException{
        
        String excelPath= "D:\\Projects\\NETBEANS_DHTMLX\\GRID_TOOLBAR_DB\\web\\data.xlsx";
        FileOutputStream fos= new FileOutputStream(new File(excelPath));
        
        ArrayList<Employee> tempList=new ArrayList<Employee>();

  
        System.out.println(tempList);
        // Create Workbook instance holding .xls file
        XSSFWorkbook workbook = new XSSFWorkbook();

        // Create a new Worksheet
        XSSFSheet sheet = workbook.createSheet("Employees");
        
        
        int rownum=0;
        Row headerRow = sheet.createRow(rownum++);

        Cell  cell1 = headerRow.createCell(0);
        Cell  cell2 = headerRow.createCell(1);
        Cell  cell3 = headerRow.createCell(2);
        Cell  cell4 = headerRow.createCell(3);
        cell1.setCellValue("SNO");
        cell2.setCellValue("NAME");
        cell3.setCellValue("NUMBER");
        cell4.setCellValue("EMAIL");
        for(int i=0;i<dbEmps.size();i++)
        {
            tempList.add(dbEmps.get(i));
        } 
             for(Employee emp: tempList)
            {
                Row row = sheet.createRow(rownum++);
                
                Cell[] cell = new Cell[4];  
                cell[0] = row.createCell(0);
                cell[0].setCellValue(emp.getId());
                cell[1] = row.createCell(1);
                cell[1].setCellValue(emp.getName());
                cell[2] = row.createCell(2);
                cell[2].setCellValue(emp.getNumber());
                cell[3] = row.createCell(3);
                cell[3].setCellValue(emp.getEmail());
            }
            //Write workbook into the excel
            workbook.write(fos);
            //Close the workbook
            workbook.close();
        
    }
        
 }
    
