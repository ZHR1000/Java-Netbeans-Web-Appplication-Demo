/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.pojo;

/**
 *
 * @author Kanakaiah
 */
public class ExpandTreeEmployee {
    
    private int id;
    private int pid;
    private String name;
    private String descriptions;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public int getPid() {
        return pid;
    }

    public void setPid(int pid) {
        this.pid = pid;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDescriptions() {
        return descriptions;
    }

    public void setDescriptions(String descriptions) {
        this.descriptions = descriptions;
    }

    @Override
    public String toString() {
        return "ExpandTreeEmployee{" + "id=" + id + ", pid=" + pid + ", name=" + name + ", descriptions=" + descriptions + '}';
    }
    
    
}
