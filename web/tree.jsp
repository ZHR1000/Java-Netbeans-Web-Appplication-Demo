
<%@page contentType="text/xml" pageEncoding="UTF-8"%>

<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>

<tree id="0">
    <item id="customers" text="Customers List">
    <c:forEach var="names" items="${treeNames}">
      
    <item text="${names.name}" id="${names.id}">  </item>

    </c:forEach>
    </item>
</tree>