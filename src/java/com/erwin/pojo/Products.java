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
public class Products {
    
    private int productId;
    private String productName;
    private int productQuantity;
    private String productPrice;
    private int orderId;
    private int supplierId;

    public Products() {
    }

    public Products(int productId, String productName, int productQuantity, String productPrice, int orderId) {
        this.productId = productId;
        this.productName = productName;
        this.productQuantity = productQuantity;
        this.productPrice = productPrice;
        this.orderId = orderId;
    }


    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getProductQuantity() {
        return productQuantity;
    }

    public void setProductQuantity(int productQuantity) {
        this.productQuantity = productQuantity;
    }

    public String getProductPrice() {
        return productPrice;
    }

    public void setProductPrice(String productPrice) {
        this.productPrice = productPrice;
    }

    public int getOrderId() {
        return orderId;
    }

    public void setOrderId(int orderId) {
        this.orderId = orderId;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    @Override
    public String toString() {
        return "Products{" + "productId=" + productId + ", productName=" + productName + ", productQuantity=" + productQuantity + ", productPrice=" + productPrice + ", orderId=" + orderId + ", supplierId=" + supplierId + '}';
    }

    
}
