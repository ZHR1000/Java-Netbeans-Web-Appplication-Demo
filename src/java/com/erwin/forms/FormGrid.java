/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.forms;

import org.apache.struts.action.ActionForm;

public class FormGrid extends ActionForm{
    
    private int sno;
    private String name;
    private String type;
    private String value;

    public FormGrid() {
    }

    public FormGrid(int sno, String name, String type, String value) {
        this.sno = sno;
        this.name = name;
        this.type = type;
        this.value = value;
    }

    public int getSno() {
        return sno;
    }

    public void setSno(int sno) {
        this.sno = sno;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getType() {
        return type;
    }

    public void setType(String type) {
        this.type = type;
    }

    public String getValue() {
        return value;
    }

    public void setValue(String value) {
        this.value = value;
    }

    @Override
    public String toString() {
        return "FormGrid{" + "sno=" + sno + ", name=" + name + ", type=" + type + ", value=" + value + '}';
    }

   

    
   
}
