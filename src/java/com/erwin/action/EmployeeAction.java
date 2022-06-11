
package com.erwin.action;

import com.erwin.forms.EmployeeForm;
import com.erwin.helper.EmployeeHelper;
import com.erwin.pojo.Employee;
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

public class EmployeeAction extends DispatchAction {

    static List<Employee> dbEmps;
    public ActionForward getEmployee(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException {

        dbEmps = EmployeeHelper.getEmployee();
        request.setAttribute("result", dbEmps);
        return mapping.findForward("view");

    }

    public ActionForward loadEmployeeForm(ActionMapping mapping, ActionForm form, HttpServletRequest requst, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

        return mapping.findForward("form");

    }

    public ActionForward setEmployee(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

    if(form != null){
        EmployeeForm ef = (EmployeeForm) form;
        boolean i = EmployeeHelper.setEmployee(ef);
        request.setAttribute("responseText", i);
        return mapping.findForward("view");
    }
    else{
         request.setAttribute("responseText", "false");
       return  mapping.findForward("view");
    }

    }

    public ActionForward removeEmployee(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException {

        int id = Integer.parseInt(request.getParameter("id"));
        boolean b=EmployeeHelper.deleteHelper(id);
             request.setAttribute("responseText", b);
            return mapping.findForward("view");

    }


       public ActionForward saveUpdates(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException, JSONException {

        String str=request.getParameter("array");
           System.out.println(str);
        boolean b=EmployeeHelper.saveData(str);
        request.setAttribute("responseText", b);
         return mapping.findForward("view");

    }
       
     public ActionForward excelEmployee(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws SQLException, ClassNotFoundException, IOException {
        
        EmployeeHelper.excelEmployee(dbEmps);
        return mapping.findForward("view");
    }

}
