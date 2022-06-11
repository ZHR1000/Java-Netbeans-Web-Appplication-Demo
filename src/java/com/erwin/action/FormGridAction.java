/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.action;

import com.erwin.helper.FormGridHelper;
import com.erwin.forms.FormGrid;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import org.json.JSONException;

public class FormGridAction extends DispatchAction{
    

    public ActionForward loadInnerGrid(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       return mapping.findForward("innerGridPath");

    }
    
    
    public ActionForward getData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {
       
       List<FormGrid> l=FormGridHelper.getData();
       request.setAttribute("gridValues",l);
       return mapping.findForward("formGridView");

    }
    public ActionForward insertData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException, JSONException {

        
        String j=request.getParameter("obj");
        boolean b=FormGridHelper.saveData(j);
        System.out.println(b);
        request.setAttribute("responseText", b);
        return mapping.findForward("formGridView");
       
    }
    
        public ActionForward removeItem(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        boolean b=FormGridHelper.deleteHelper(id);
             request.setAttribute("responseText", b);
            return mapping.findForward("formGridView");

    }
        
    public ActionForward saveUpdates(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException, JSONException {

        String str=request.getParameter("array");
           System.out.println(str);
        boolean b=FormGridHelper.saveUpdates(str);
        request.setAttribute("responseText", b);
         return mapping.findForward("view");

    }
}
