/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package com.erwin.action;

import com.erwin.helper.MetadataHelper;
import com.erwin.forms.MetadataForm;
import com.erwin.pojo.MetadataDB;
import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import org.apache.struts.action.ActionForm;
import org.apache.struts.action.ActionForward;
import org.apache.struts.action.ActionMapping;
import org.apache.struts.actions.DispatchAction;


public class MetadataAction extends DispatchAction {
    ArrayList grid1_al;
    ArrayList grid2_al;
      public ActionForward loadDetails(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

        System.out.println(form);

        if(form != null){
         System.out.println("form---");
        MetadataForm ef = (MetadataForm) form;
        MetadataDB.url=ef.getUrl();
        MetadataDB.dbname=ef.getDbname();
        MetadataDB.uname=ef.getUname();
        MetadataDB.password=ef.getPassword();
        System.out.println(ef.getUname());
        System.out.println(ef.getPassword());
        boolean b = MetadataHelper.setData(ef);
        request.setAttribute("metadatabool", b);
        return mapping.findForward("metadataGrid1Path");
    }
    else{
         request.setAttribute("metadataResponse", "false");
       return  mapping.findForward("metadataGrid1Path");
     }
    }

   public ActionForward loadForm(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

          return  mapping.findForward("metadataFormPath");
    }

     public ActionForward loadGrid1(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       grid1_al= MetadataHelper.getTables();
       request.setAttribute("metadataResponse", grid1_al);
       return mapping.findForward("metadataGrid1Path");
     }

     public ActionForward loadGrid2(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       grid2_al = MetadataHelper.getTables();
       request.setAttribute("metadataResponse", grid2_al);
       return mapping.findForward("metadataGrid2Path");
     }

      public ActionForward loadGrid3(ActionMapping mapping, ActionForm form, HttpServletRequest request, HttpServletResponse response) throws ClassNotFoundException, SQLException, IOException {

       System.out.println("------------------------------------------------------------------------");

         ArrayList uniqueElementsFromBothList = null;


//        Unique element from listOne
//         uniqueElementsFromBothList.addAll((Collection) grid1_al.stream()
//        .filter(str -> !grid2_al.contains(str))
//        .collect(Collectors.toList())); 
//
//       Unique element from listOne and listTwo 
//       Here adding unique elements of listTwo in existing unique elements list (i.e. unique from listOne)
//      uniqueElementsFromBothList.addAll((Collection) grid2_al.stream()
//        .filter(str -> !grid1_al.contains(str))
//        .collect(Collectors.toList()));
         
         
       grid1_al.removeAll(grid2_al);
        //grid1_al.retainAll(grid2_al);
       ArrayList grid3_al = grid1_al;
        request.setAttribute("metadataResponse", grid3_al);

//        request.setAttribute("metadataResponse", uniqueElementsFromBothList);
       return mapping.findForward("metadataGrid3Path");
     }

}
