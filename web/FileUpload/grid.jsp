<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ page language="java" contentType="text/xml; charset=UTF-8" pageEncoding="UTF-8"%>
<c:set var="sNo"  value="1"/>
<rows>
     <c:forEach var="file" items="${listOfFiles}">
        <row id = "${sNo}">    
            <cell><c:out value="${sNo}"/></cell>
             <cell>${file}^./Download?filename=${file}</cell>
              <cell>Preview</cell>
        </row>
        <c:set var="sNo" value="${sNo+1}"/>  
    </c:forEach>    
</rows>