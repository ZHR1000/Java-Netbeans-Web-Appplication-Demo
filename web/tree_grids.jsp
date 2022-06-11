<%@page contentType="text/html"%>
  <%@page pageEncoding="UTF-8"%>

    <!DOCTYPE html>
    <html>
      <head>

        <link rel="stylesheet" href="./codebase/dhtmlx.css">
          <script src="./codebase/dhtmlx.js" charset="utf-8"></script>

          <script>
            function onStart() {
              var main_layout = new dhtmlXLayoutObject(document.body, '2U');
              var layoutObj = {
                "cell": main_layout,
                "mode": "view",
                "toolbar": "true"
              }
              new com.erwin.customersApp.Childs(layoutObj);

            }
          </script>
          <script src="tree_grids.js"></script>
          <style>
            body,
            html {
              width: 100%;
              height: 100%;
              margin: 0;
              overflow: hidden;
            }
            #winVP {
              position: initial;
            }
          </style>
        </head>
        <body onload="onStart();">
          <div id="winVP"></div>
        </body>
      </html>