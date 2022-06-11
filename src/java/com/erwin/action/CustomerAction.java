/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.action;

import com.erwin.helper.CustomerHelper;
import com.erwin.pojo.Customers;
import com.erwin.pojo.Orders;
import com.erwin.pojo.Products;
import com.erwin.pojo.Suppliers;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import java.util.Map;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import org.json.JSONException;
import org.json.JSONObject;

/**
 *
 * @author Kanakaiah
 */
public class CustomerAction extends DispatchAction{
    
    public ActionForward loadCustomersNames(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       List<Customers> l=CustomerHelper.getCustomersNames();
       request.setAttribute("treeNames", l);
       System.out.println(request.getAttribute("treeNames"));
       return mapping.findForward("treepath");

    }
    
    public ActionForward loadCustomers(ActionMapping mapping, ActionForm form, HttpServletRequest requst, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

        return mapping.findForward("tree");

    }
    
    public ActionForward loadOrders(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       List<Orders> l=CustomerHelper.getCustomersOrders(Integer.parseInt(request.getParameter("id")));
       request.setAttribute("gridOrders", l);
       System.out.println("Orders action="+request.getAttribute("gridOrders"));
       return mapping.findForward("grid1path");

    }
    
    public ActionForward loadProducts(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       List<Products> l=CustomerHelper.getCustomersProducts(Integer.parseInt(request.getParameter("productId")));
       request.setAttribute("gridProducts", l);
       System.out.println("Products action="+request.getAttribute("gridProducts"));
       return mapping.findForward("grid2path");

    }
    
    public ActionForward loadSuppliers(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

             System.out.println(request.getParameter("supplierId"));
       List<Suppliers> l=CustomerHelper.getCustomersSuppliers(Integer.parseInt(request.getParameter("supplierId")));
       request.setAttribute("gridSuppliers", l);
       System.out.println("Suppliers action="+request.getAttribute("gridSuppliers"));
       return mapping.findForward("grid3path");

    }
    
    
    public ActionForward getCount(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException, JSONException {


       JSONObject j=CustomerHelper.getCount(Integer.parseInt(request.getParameter("id")));
       request.setAttribute("count", j);
       System.out.println("Count action="+request.getAttribute("count"));
       return mapping.findForward("dataViewpath");

    }
    
}
