<%@page contentType="text/xml" pageEncoding="UTF-8"%>

  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

    <tree id="${parent}">
      <c:forEach var="names" items="${expandTreeNames}">

        <item id="${names.id}" text="${names.name}" child="1"></item>

      </c:forEach>

    </tree>