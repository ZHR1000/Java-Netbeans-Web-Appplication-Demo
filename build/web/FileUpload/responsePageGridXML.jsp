<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %> 
<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>


<c:set var="sNo"  value="1"/>  

<rows>
    <c:forEach var="contact" items="${response}">  

        <row id = "${contact.id}">    
            <cell><c:out value="${sNo}"/></cell>
            <cell><c:out value="${contact.name}"/></cell>
            <cell><c:out value="${contact.contact}"/> </cell>
            <cell><c:out value="${contact.email}"/></cell>
        </row>
        <c:set var="sNo" value="${sNo+1}"/>  
    </c:forEach> 

</rows>
