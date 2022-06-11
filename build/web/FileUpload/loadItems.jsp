<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>


<c:set var="sNo"  value="1"/>

<rows>
    <c:forEach var="item" items="${list}">

        <row id = "${sNo}">
            <cell><c:out value="${sNo}"/></cell>
            <cell><c:out value="${item.name}"/></cell>
           
        </row>
        <c:set var="sNo" value="${sNo+1}"/>
    </c:forEach>

</rows>
