/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.action;

import com.erwin.helper.ExpandTreeHelper;

import com.erwin.pojo.ExpandTreeEmployee;
import java.io.IOException;
import java.sql.SQLException;
import java.util.List;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import org.json.JSONArray;
import org.json.JSONException;
import org.json.JSONObject;

public class ExpandTreeAction extends DispatchAction {

    public ActionForward expandEmployeeNames(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException, JSONException {
        int id = Integer.parseInt(request.getParameter("id"));
        List<ExpandTreeEmployee> l = ExpandTreeHelper.getEmployee(id);
//       request.setAttribute("parent", id);
//       request.setAttribute("expandTreeNames", l);
//       System.out.println(request.getAttribute("expandTreeNames"));
        JSONArray array = new JSONArray();
        for (ExpandTreeEmployee e : l) {
            JSONObject json = new JSONObject();
            json.put("id", e.getId());
            json.put("name", e.getName());
            json.put("pid", e.getPid());
            json.put("descriptions", e.getDescriptions());
            
            array.put(json);

        }
        request.setAttribute("response", array);
        return mapping.findForward("expandTreeResponsePath");

    }

}
