package com.erwin.action;

import com.erwin.forms.EmployeeForm;
import com.erwin.forms.FileUploadForm;
import com.erwin.helper.EmployeeHelper;
import com.erwin.helper.FileUploadHelper;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;



public class FileUploadAction extends DispatchAction{
	
   public ActionForward fileupload(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws IOException
   {
       
        if(form != null){
        FileUploadForm ef = (FileUploadForm) form;
        FileUploadHelper fuh=new FileUploadHelper();
        String filePath = getServlet().getServletContext().getRealPath("/") +"upload";
        System.out.println("filePath--"+filePath);
        boolean i = fuh.setFile(ef,filePath);
        request.setAttribute("responseText", i);
        System.out.println("FileUploadHelper.uploadedFilePath=="+FileUploadHelper.uploadedFilePath);
        System.out.println("FileUploadHelper.uploadedFileName"+FileUploadHelper.uploadedFileName);
        request.setAttribute("uploadedFilePath",FileUploadHelper.uploadedFilePath);
	request.setAttribute("uploadedFileName",FileUploadHelper.uploadedFileName);
        
    }
       return mapping.findForward("fileUploadSuccess");
   }
}