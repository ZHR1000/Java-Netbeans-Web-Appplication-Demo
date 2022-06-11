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
public class Multilanguage extends ActionForm{
    
    private int id;
    private String name;
    private String contact;
    private String email;

    public Multilanguage() {
    }

    public Multilanguage(int id, String name, String contact, String email) {
        this.id = id;
        this.name = name;
        this.contact = contact;
        this.email = email;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getContact() {
        return contact;
    }

    public void setContact(String contact) {
        this.contact = contact;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    @Override
    public String toString() {
        return "Multilanguage{" + "id=" + id + ", name=" + name + ", contact=" + contact + ", email=" + email + '}';
    }

    
}
