/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.upload.action;

import java.io.File;
import java.io.FileInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.PrintWriter;
import javax.servlet.ServletContext;
import javax.servlet.ServletException;
import javax.servlet.ServletOutputStream;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 *
 * @author Shiva
 */
public class NewServlet1 extends HttpServlet {

    protected void doGet(HttpServletRequest request, HttpServletResponse response)
            throws ServletException, IOException {
        String filename = request.getParameter("name");
        System.out.println(filename);
//
        File file = new File("C:\\Users\\Shiva\\Downloads\\angular-demo.zip");
        
        System.out.println(file.getName());
        if (!file.exists()) {
            throw new ServletException("File doesn't exists on server.");
        }
        System.out.println("File location on server::" + file.getAbsolutePath());
        ServletContext ctx = this.getServletContext();
        InputStream fis = new FileInputStream(file);
        String mimeType = ctx.getMimeType(file.getAbsolutePath());
        response.setContentType(mimeType != null ? mimeType : "application/download");
        //response.setContentLength((int) file.length());
        response.setHeader("Content-Disposition", "attachment; filename=\"" + file.getName() + "\"");

        ServletOutputStream os = response.getOutputStream();
        byte[] bufferData = new byte[1024];
        int read = 0;
        while ((read = fis.read(bufferData)) != -1) {
            System.out.println("File Downloading...");
            os.write(bufferData, 0, read);
        }
        os.flush();
        os.close();
        fis.close();
        System.out.println("File downloaded at client successfully");
       
        }
    }

    

