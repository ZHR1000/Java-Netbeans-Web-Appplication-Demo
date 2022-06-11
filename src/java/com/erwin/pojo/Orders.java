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
public class Orders {
    
    private int id;
    private int orderNumber;
    private double totalAmount;
    private int customerId;
    
    public Orders() {
    }

    public Orders(int orderNumber, double totalAmount) {
        this.orderNumber = orderNumber;
        this.totalAmount = totalAmount;
    }

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    
    public int getOrderNumber() {
        return orderNumber;
    }

    public void setOrderNumber(int orderNumber) {
        this.orderNumber = orderNumber;
    }

    public double getTotalAmount() {
        return totalAmount;
    }

    public void setTotalAmount(double totalAmount) {
        this.totalAmount = totalAmount;
    }

    public int getCustomerId() {
        return customerId;
    }

    public void setCustomerId(int customerId) {
        this.customerId = customerId;
    }

    @Override
    public String toString() {
        return "Orders{" + "id=" + id + ", orderNumber=" + orderNumber + ", totalAmount=" + totalAmount + ", customerId=" + customerId + '}';
    }
    
   
}
