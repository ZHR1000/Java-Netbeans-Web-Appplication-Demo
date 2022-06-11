package com.erwin.pojo;

import java.util.ArrayList;

public class Employee {

    private int id;
    private String name;
    private String number;
    private String email;
    public static ArrayList<Employee> al = new ArrayList<>();

    public Employee() {
        super();
    }

    public Employee(String name, String number, String email) {
        this.name = name;
        this.number = number;
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

    @Override
    public String toString() {
        return "Employee{" + "id=" + id + ", name=" + name + ", number=" + number + ", email=" + email + '}';
    }

}
