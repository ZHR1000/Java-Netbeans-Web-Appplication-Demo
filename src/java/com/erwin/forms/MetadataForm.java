/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.forms;

import org.apache.struts.action.ActionForm;

/**
 *
 * @author Kanakaiah
 */
public class MetadataForm extends ActionForm{
    
    private String url;
    private String dbname;
    private String uname;
    private String password;

    public MetadataForm() {
    }

    public MetadataForm(String url, String dbname, String uname, String password) {
        this.url = url;
        this.dbname = dbname;
        this.uname = uname;
        this.password = password;
    }
    
    

    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    public String getDbname() {
        return dbname;
    }

    public void setDbname(String dbname) {
        this.dbname = dbname;
    }

    public String getUname() {
        return uname;
    }

    public void setUname(String uname) {
        this.uname = uname;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

    @Override
    public String toString() {
        return "MetadataForm{" + "url=" + url + ", dbname=" + dbname + ", uname=" + uname + ", password=" + password + '}';
    }
    
    
}
