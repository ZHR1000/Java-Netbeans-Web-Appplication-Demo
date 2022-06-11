<%@page contentType="text/xml" pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <rows>
      <c:set var="sno" value="1"/>
      <c:forEach var="res" items="${gridValues}">
        <row id="${sno}">
          <cell>${sno}</cell>
          <cell>${res.sno}</cell>
          <cell>${res.name}</cell>
          <cell>${res.type}</cell>
          <cell type="${res.type}">${res.value}</cell>
        </row>
        <c:set var="sno" value="${sno+1}"/>
      </c:forEach>
    </rows>