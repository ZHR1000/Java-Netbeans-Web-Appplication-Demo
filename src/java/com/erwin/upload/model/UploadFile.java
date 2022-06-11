/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.upload.model;

import org.apache.struts.action.ActionForm;
import org.apache.struts.upload.FormFile;


/**
 *
 * @author Shiva
 */
public class UploadFile extends ActionForm {


    private FormFile file;

    public FormFile getFile() {
        return file;
    }

    public void setFile(FormFile file) {
        this.file = file;
    }
    

}
