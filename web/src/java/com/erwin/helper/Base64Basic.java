/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.helper;

import java.util.Base64;

/**
 *
 * @author Kanakaiah
 */
public class Base64Basic {
    public static String getURL(String pr)
    {
        
        Base64.Encoder encoder = Base64.getUrlEncoder();  
        // Encoding URL  
        String eStr = encoder.encodeToString(pr.getBytes());  
        System.out.println("Encoded URL: "+eStr);  
        // Getting decoder  
        Base64.Decoder decoder = Base64.getUrlDecoder();  
        // Decoding URl  
        String dStr = new String(decoder.decode(eStr));  
        System.out.println("Decoded URL: "+dStr);  
        return dStr;
    }  
}
