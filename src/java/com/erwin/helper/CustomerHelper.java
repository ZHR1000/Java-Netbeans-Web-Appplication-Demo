/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.dbutil.CustomersDbOperation;
import com.erwin.pojo.Customers;
import com.erwin.pojo.Orders;
import com.erwin.pojo.Products;
import com.erwin.pojo.Suppliers;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import org.json.JSONException;
import org.json.JSONObject;

public class CustomerHelper {
    
            
      public static List<Customers> getCustomersNames() throws SQLException, ClassNotFoundException, IOException {
        List<Customers> l = CustomersDbOperation.getNameData();
        return l;
      }
        public static List<Customers> getCustomers() throws SQLException, ClassNotFoundException, IOException {
        List<Customers> dbEmps = CustomersDbOperation.getData();
        return dbEmps;

    }

    public static List<Orders> getCustomersOrders(int id) throws IOException, SQLException {
       List<Orders> l = CustomersDbOperation.getOrderData(id);
        return l;
    }

    public static List<Products> getCustomersProducts(int orderId) throws IOException, SQLException {
        List<Products> l = CustomersDbOperation.getProductsData(orderId);
        return l;
    }

    public static List<Suppliers> getCustomersSuppliers(int supplierId) throws SQLException, IOException {
         List<Suppliers> l = CustomersDbOperation.getSuppliersData(supplierId);
        return l;
    }

    public static JSONObject getCount(int id) throws SQLException, IOException, JSONException {
        JSONObject j = CustomersDbOperation.getCount(id);
        return j;
    }
}
