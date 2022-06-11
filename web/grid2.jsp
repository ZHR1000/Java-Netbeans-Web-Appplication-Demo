<%@page contentType="text/xml" pageEncoding="UTF-8"%>
  <!DOCTYPE html>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <rows>
      <c:set var="sno" value="1"/>
      <c:forEach var="res" items="${gridProducts}">
        <row id="${res.supplierId}">
          <cell>${sno}</cell>
          <cell>${res.productId}</cell>
          <cell>${res.productName}</cell>
          <cell>${res.productQuantity}</cell>
          <cell>${res.productPrice}</cell>
          <cell>${res.orderId}</cell>
        </row>
        <c:set var="sno" value="${sno+1}"/>
      </c:forEach>
    </rows>