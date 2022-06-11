<%@page contentType="text/html"%>
  <%@page pageEncoding="UTF-8"%>

    <!DOCTYPE html>
    <html>
      <head>

        <link rel="stylesheet" href="./codebase/dhtmlx.css">
          <script src="./codebase/dhtmlx.js" charset="utf-8"></script>

          <script>
            function onStart() {
              var main_layout = new dhtmlXLayoutObject(document.body, '3U');
              // var toolbar_1 = main_layout.attachToolbar(); toolbar_1.setIconsPath('./codebase/imgs/');
              //
              // toolbar_1.loadStruct('<toolbar><item type="button" id="btn1" text="GRID 1" /><item type="button" id="btn2" text="GRID 2" /><item type="button" id="compare" text="COMPARE" /></toolbar>', function () {});

              var layoutObj = {
                "cell": main_layout,
                "mode": "view",
                "toolbar": "true"
              }
              new com.erwin.metadataApp.ChildClass(layoutObj);

            }
          </script>
          <script src="metaData.js"></script>
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