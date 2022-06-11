/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.action;

import com.erwin.forms.FormGrid;
import com.erwin.forms.Multilanguage;
import com.erwin.helper.FormGridHelper;
import com.erwin.helper.MultilanguageHelper;
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
import org.json.JSONObject;

/**
 *
 * @author Kanakaiah
 */
public class MultilanguageAction extends DispatchAction {
    
      public ActionForward getData(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {
       
       List<Multilanguage> l=MultilanguageHelper.getData();
       request.setAttribute("gridValues",l);
       return mapping.findForward("multilanguageView");
    }
      
     public ActionForward getLang(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException, JSONException {
       
         String str=request.getParameter("param");
         JSONObject obj=new JSONObject(str);
         String country=obj.getString("country");
         JSONObject jo=MultilanguageHelper.getJSONObject(country);
       
       request.setAttribute("jsonObjValues",jo);
       System.out.println(jo);
       return mapping.findForward("multilanguageJSPView");

    }
     
        
}
