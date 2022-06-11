/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.forms;

import org.apache.struts.action.ActionForm;

public class EmployeeForm extends ActionForm {
    
   private String name;
   private String number;
   private String email;
    
    public EmployeeForm() {}

    public EmployeeForm(String name, String number, String email) {
        this.name = name;
        this.number = number;
        this.email = email;
    }

   

    @Override
    public String toString() {
        return "Employee [name=" + name + ", Number=" + number + ", email=" + email + "]";
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getNumber() {
        return number;
    }

    public void setNumber(String number) {
        this.number = number;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

}