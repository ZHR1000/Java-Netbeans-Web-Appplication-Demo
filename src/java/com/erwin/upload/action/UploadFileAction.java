/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.upload.action;

import com.erwin.upload.helper.UploadHelper;
import com.erwin.upload.model.UploadFile;
import java.io.File;
import java.io.FileInputStream;
import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import org.apache.struts.upload.FormFile;

/**
 *
 * @author Shiva
 */
public class UploadFileAction extends DispatchAction {
//    public static final String ="";

    public ActionForward uploadFile(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response) throws Exception {
        UploadFile f = (UploadFile) form;

        FormFile file = f.getFile();
        System.out.println(file);

        //Get the servers upload directory real path name
        String filePath = getServlet().getServletContext().getRealPath("/") + "Uploaded";

        //create the upload folder if not exists
        File folder = new File(filePath);
        if (!folder.exists()) {
            folder.mkdir();
        }

        String fileName = file.getFileName();

        if (!("").equals(fileName)) {

            System.out.println("Server path:" + filePath);
            File newFile = new File(filePath, fileName);

            if (!newFile.exists()) {
                FileOutputStream fos = new FileOutputStream(newFile);
                fos.write(file.getFileData());
                fos.flush();
                fos.close();
            }

//            request.setAttribute("uploadedFilePath", newFile.getAbsoluteFile());
//            request.setAttribute("uploadedFileName", newFile.getName());
        }

        return mapping.findForward("uploadFile");

    }

    public ActionForward loadGrid(ActionMapping mapping, ActionForm form,
            HttpServletRequest request, HttpServletResponse response) throws Exception {

        request.setAttribute("listOfFiles", new UploadHelper().getFilesList());

        return mapping.findForward("success");
    }
   
}
