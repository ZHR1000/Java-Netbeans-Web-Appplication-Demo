<%@page contentType="text/xml" pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <rows>
      <c:set var="sno" value="1"/>
      <c:forEach var="res" items="${gridOrders}">
        <row id="${sno}">
          <cell>${sno}</cell>
          <cell>${res.id}</cell>
          <cell>${res.orderNumber}</cell>
          <cell>${res.totalAmount}</cell>
          <cell>${res.customerId}</cell>
        </row>
        <c:set var="sno" value="${sno+1}"/>
      </c:forEach>
    </rows>