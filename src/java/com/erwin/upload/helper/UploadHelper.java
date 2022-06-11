/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.upload.helper;

import java.io.File;
import java.util.ArrayList;
import java.util.List;


/**
 *
 * @author Shiva
 */
public class UploadHelper {
    public static final String SERVER_LOCATION = "D:\\Projects_bk\\NETBEANS_DHTMLX\\ALL_TASKS\\build\\web\\Uploaded\\";//please paste your path ok na

    public List<String> getFilesList() {
        File folder = new File(SERVER_LOCATION);
        File[] listOfFiles = folder.listFiles();
        List<String> list = new ArrayList<String>();
        if(listOfFiles == null){
            return null;
        }
        
        for (File file : listOfFiles) {
            if (file.isFile()) {
                list.add(file.getName());
            }
        }
        return list;
    }
    public static void main(String args[]){
        System.out.println(new UploadHelper().getFilesList());
    }
}
