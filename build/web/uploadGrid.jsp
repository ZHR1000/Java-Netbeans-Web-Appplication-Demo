<%@page contentType="text/xml" pageEncoding="UTF-8"%>
  <%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
    <!--<rows> <c:set var="sno" value="1"/> <c:forEach var="res" items="${fileNames}"> <row id="${sno}"> <cell>${res.id}</cell> <cell>${res.fileName}^./DownloadFileServlet?filename=${res.fileName}</cell> <cell>Static?^javascript:hello();^_self</cell>
    </row> <c:set var="sno" value="${sno+1}"/> </c:forEach> </rows>-->
    <rows>
      <c:set var="sno" value="1"/>
      <c:forEach var="res" items="${fileNames}">
        <row id="${sno}">
          <cell>${res.id}</cell>
          <cell>${res.fileName}^./DownloadFileServlet?filename=${res.fileName}</cell>
          <cell>Preview File</cell>
        </row>
        <c:set var="sno" value="${sno+1}"/>
      </c:forEach>
    </rows>