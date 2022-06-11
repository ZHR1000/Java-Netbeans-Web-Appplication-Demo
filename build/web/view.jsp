
<%@page contentType="text/html" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<rows>
    <c:set var="sno" value="1"/>
    <c:forEach var="res" items="${result}">
        <row id="${res.id}">
            <cell>${sno}</cell>
            <cell>${res.id}</cell>
            <cell>${res.name}</cell>
            <cell>${res.number}</cell>
            <cell>${res.email}</cell></row>
              <c:set var="sno" value="${sno+1}"/>
    </c:forEach>
</rows>

