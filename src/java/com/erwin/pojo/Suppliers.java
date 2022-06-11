/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.pojo;


public class Suppliers {
    private int supplierId;
    private String companyName;
    private String phone;
    private int productId;


    public Suppliers() {
    }

    public Suppliers(int supplierId, String companyName, String phone, int productId) {
        this.supplierId = supplierId;
        this.companyName = companyName;
        this.phone = phone;
        this.productId = productId;
    }

    public int getSupplierId() {
        return supplierId;
    }

    public void setSupplierId(int supplierId) {
        this.supplierId = supplierId;
    }

    public String getCompanyName() {
        return companyName;
    }

    public void setCompanyName(String companyName) {
        this.companyName = companyName;
    }

    public String getPhone() {
        return phone;
    }

    public void setPhone(String phone) {
        this.phone = phone;
    }

    public int getProductId() {
        return productId;
    }

    public void setProductId(int productId) {
        this.productId = productId;
    }

    @Override
    public String toString() {
        return "Suppliers{" + "supplierId=" + supplierId + ", companyName=" + companyName + ", phone=" + phone + ", productId=" + productId + '}';
    }


}
