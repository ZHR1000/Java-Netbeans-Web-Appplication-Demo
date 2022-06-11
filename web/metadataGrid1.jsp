<%@page contentType="text/xml" pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <rows>
      <c:set var="sno" value="1"/>
      <c:forEach var="res" items="${metadataResponse}">
        <row id="${sno}">
          <cell>${sno}</cell>
          <cell>${res}</cell>
        </row>
        <c:set var="sno" value="${sno+1}"/>
      </c:forEach>
    </rows>