/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import com.erwin.forms.FileUploadForm;
import com.erwin.dao.UploadDao;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileOutputStream;
import java.io.IOException;
import java.sql.SQLException;
import org.apache.struts.upload.FormFile;

/**
 *
 * @author Kanakaiah
 */
public class FileUploadHelper  {

    public static File uploadedFilePath;
    public static String uploadedFileName;
    public static boolean setFile(FileUploadForm form,String filePath) throws FileNotFoundException, IOException {
       FileUploadForm fileUploadForm = (FileUploadForm)form;
		
		FormFile file = fileUploadForm.getFile();
		

	    //create the upload folder if not exists
	    File folder = new File(filePath);
	    if(!folder.exists()){
	    	folder.mkdir();
	    }
	    
	    String fileName = file.getFileName();
	    
	    if(!("").equals(fileName)){  
	    	
	        System.out.println("Server path:" +filePath);
	        File newFile = new File(filePath, fileName);
              
	        if(!newFile.exists()){
	          FileOutputStream fos = new FileOutputStream(newFile);
	          fos.write(file.getFileData());
	          fos.flush();
	          fos.close();
	        }  
	        if(newFile.getAbsoluteFile()!=null&&newFile.getName()!=null)
                {
                    uploadedFilePath=newFile.getAbsoluteFile();
                    uploadedFileName=newFile.getName();
                    return true;
                }

	    }
        return false;
    }
    
    public static boolean setFiles(String fileName,String filePath) throws IOException, SQLException
    {
              boolean b=false;
        b=UploadDao.setFiles(fileName,filePath);
        System.out.println(b);
        return b;
    }
 
}
