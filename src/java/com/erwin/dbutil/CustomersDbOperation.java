/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.dbutil;

import com.erwin.pojo.Customers;
import com.erwin.pojo.Employee;
import com.erwin.pojo.Orders;
import com.erwin.pojo.Products;
import com.erwin.pojo.Suppliers;
import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.CopyOnWriteArrayList;
import org.json.JSONException;
import org.json.JSONObject;


public class CustomersDbOperation {
    
       public static List<Customers> getNameData() throws SQLException, ClassNotFoundException, IOException {
        List<Customers> l=new CopyOnWriteArrayList<Customers>();

        Connection con = CustomersConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("select * from customer");
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Customers c=new Customers();
           c.setId(rs.getInt(1));
            c.setName(rs.getString(2)+" "+rs.getString(3));
            l.add(c);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
    }
    
    
        public static List<Customers> getData() throws SQLException, ClassNotFoundException, IOException {
        List<Customers> l=new CopyOnWriteArrayList<Customers>();

        Connection con = ConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("select * from customer");
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Customers c=new Customers();
            c.setId(rs.getInt(1));
            c.setName(rs.getString(2)+rs.getString(3));
            c.setCity(rs.getString(4));
            c.setPhone(rs.getString(6));
            l.add(c);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
    }

    public static List<Orders> getOrderData(int id) throws IOException, SQLException {
        
     List<Orders> l=new CopyOnWriteArrayList<Orders>();

        Connection con = CustomersConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("SELECT [Order].Id,OrderNumber,TotalAmount,[Customer].Id\n" +
          "  FROM [Order] JOIN Customer\n" +
          "    ON [Order].CustomerId = Customer.Id where Customer.Id="+id);
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Orders o=new Orders();
           o.setId(rs.getInt(1));
           o.setOrderNumber(rs.getInt(2));
            o.setTotalAmount(rs.getDouble(3));
            o.setCustomerId(Integer.valueOf(rs.getString(4)));
            l.add(o);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
        
    }

    public static List<Products> getProductsData(int orderId) throws SQLException, IOException {
        List<Products> l=new CopyOnWriteArrayList<Products>();

        Connection con = CustomersConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("SELECT  P.Id ,P.ProductName, I.Quantity, I.UnitPrice, O.Id, P.SupplierId \n" +
        "  FROM [Order] O \n" +
        "  JOIN OrderItem I ON O.Id = I.OrderId \n" +
        "  JOIN Product P ON P.Id = I.ProductId\n"+ "where O.Id= "+orderId +
        "ORDER BY O.OrderNumber");
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Products p=new Products();
           p.setProductId(rs.getInt(1));
           p.setProductName(rs.getString(2));
            p.setProductQuantity(rs.getInt(3));
            p.setProductPrice(rs.getString(4));
            p.setOrderId(rs.getInt(5));
            p.setSupplierId(rs.getInt(6));
            l.add(p);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
        
    }

    public static List<Suppliers> getSuppliersData(int supplierId) throws SQLException, IOException {
         List<Suppliers> l=new CopyOnWriteArrayList<Suppliers>();

        Connection con = CustomersConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("SELECT [Supplier].Id, CompanyName, Phone\n"+
        "FROM [Supplier] where Id="+supplierId );
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
           Suppliers s=new Suppliers();
           s.setSupplierId(rs.getInt(1));
           s.setCompanyName(rs.getString(2));
           s.setPhone(rs.getString(3));
            l.add(s);
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return l;
    }

    public static JSONObject getCount(int id) throws IOException, SQLException, JSONException {
        
        JSONObject j=new JSONObject();

        Connection con = CustomersConnectionUtils.getConnections();
        PreparedStatement pst = con.prepareStatement("SELECT COUNT(DISTINCT O.ID), COUNT(DISTINCT P.Id),COUNT(DISTINCT S.Id)\n"+ 
        "FROM [Customer] C\n"+
        "JOIN [Order] O ON C.Id = O.CustomerId\n"+
        "JOIN OrderItem I ON O.Id = I.OrderId\n"+ 
        "JOIN Product P ON P.Id = I.ProductId\n"+
        "JOIN Supplier S ON S.Id = P.SupplierId\n"+
        "where C.Id=?");
        pst.setInt(1, id);  
        ResultSet rs = pst.executeQuery();
        while (rs.next()) {
            j.put("ordersCount",rs.getInt(1));
            j.put("productsCount",rs.getInt(2));
            j.put("suppliersCount",rs.getInt(3));
        }
        if (!rs.next()) {
            System.out.println("no data");
        }
          return j;
    }
}
