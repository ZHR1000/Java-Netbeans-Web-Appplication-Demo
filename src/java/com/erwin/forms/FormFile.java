/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.forms;

import java.io.FileNotFoundException;
import java.io.IOException;
import java.io.InputStream;

public interface FormFile {

    public String getContentType();

    public void setContentType(String string);

    public int getFileSize();

    public void setFileSize(int i);

    public String getFileName();

    public void setFileName(String string);

    public byte[] getFileData() throws FileNotFoundException, IOException;

    public InputStream getInputStream() throws FileNotFoundException, IOException;

    public void destroy();
}
