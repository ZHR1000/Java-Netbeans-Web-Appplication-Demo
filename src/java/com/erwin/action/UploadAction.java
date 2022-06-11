/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.action;

import com.erwin.dao.UploadDao;
import com.erwin.forms.FileUploadForm;
import com.erwin.helper.UploadHelper;
import com.erwin.pojo.UploadFiles;
import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;
import org.apache.struts.upload.FormFile;
import java.util.Date;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
/**
 *
 * @author Kanakaiah
 */
public class UploadAction extends DispatchAction{
    
    public String fileName;
    public static String filePath;
    public String uploadFilePath;
      public static String timeString;
     public static List<UploadFiles> l;
     public static Map<String,String> map=new HashMap<String,String>();
     public static Map<String,String> pathmap=new HashMap<String,String>();
public ActionForward upload (ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
	
	    FileUploadForm fileUploadForm = (FileUploadForm)form;// yup bcuz there is no fileuploadform
		
            FormFile file = fileUploadForm.getFile();
                
                
		
		//Get the servers upload directory real path name
	    //filePath = getServlet().getServletContext().getRealPath("/") +"upload";
            filePath="D:\\Projects_bk\\Uploads\\";
	    System.out.println(filePath);
            
           
            
	    //create the upload folder if not exists
	    File folder = new File(filePath);
	    if(!folder.exists()){
	    	folder.mkdir();
	    }
	    
	    fileName = file.getFileName();//file is null
            System.out.println("File Name:" +fileName);
            
            
                   boolean b=UploadHelper.setFiles(fileName,filePath.concat(fileName));
        System.out.println(b);
        request.setAttribute("uploadGridResponse", b);
        
           
            uploadFilePath=filePath+fileName;
            System.out.println("UFP=="+uploadFilePath);
            request.setAttribute("previewFile", uploadFilePath);
        
        
	    if(!("").equals(fileName)){  
	    	
	        System.out.println("Server path:" +filePath);
	        File newFile = new File(filePath, fileName);
              
	        if(!newFile.exists()){
	          FileOutputStream fos = new FileOutputStream(newFile);
	          fos.write(file.getFileData());
	          fos.flush();
	          fos.close();
	        }  
                
                UploadDao.uploadFilepath(filePath+fileName);
	        
	        request.setAttribute("uploadedFilePath",newFile.getAbsoluteFile());
                System.out.println("UFP"+uploadFilePath);
                
                
            pathmap.put(filePath,filePath);
            
            Set<Map.Entry<String,String>> st=map.entrySet();
            for(Map.Entry<String,String> s:st)
            {
                System.out.println(s.getKey()+":"+s.getValue());
            }
                
                //System.out.println(request.getAttribute("uploadedFilePath"));
	        request.setAttribute("uploadedFileName",newFile.getName());
	    }

            return mapping.findForward("UploadGrid");
	}

        
        public ActionForward getFiles(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
                
                 l = UploadHelper.getFiles(fileName,filePath);
                request.setAttribute("fileNames", l);
                System.out.println("===="+request.getAttribute("fileNames"));
                    String previewText="Preview File";
        request.setAttribute("previewText",previewText);
           return mapping.findForward("UploadGrid");
    }

    public ActionForward downloadFiles(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException
    {

          request.setAttribute("uploadedFileName",fileName);
          System.out.println(uploadFilePath);
          request.setAttribute("uploadFilePath",uploadFilePath.trim());
          System.out.println("df----- "+request.getAttribute("uploadFilePath"));
         return mapping.findForward("response");   
    }
    

    
    public ActionForward getFilePath(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException
    {
        int id=Integer.parseInt(request.getParameter("id")) ; 
           //UploadDao.uploadFilepath(filePath+fileName);
         String fullPath=UploadHelper.getFilePath(id);
         request.setAttribute("previewFile",fullPath);
         return mapping.findForward("responseResponse");
        
    }
    
      public ActionForward getURL(ActionMapping mapping, ActionForm form,
			HttpServletRequest request, HttpServletResponse response) throws SQLException, IOException
    {
//        String pr=request.getParameter("preview");
        
               request.setAttribute("imagename",fileName);
          request.setAttribute("previewPath",uploadFilePath.trim());
        //String dStr=Base64Basic.getURL(uploadFilePath);
          request.setAttribute("previewPath",uploadFilePath);
 
         return mapping.findForward("previewresponse");
    }
        
}
