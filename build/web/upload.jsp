<%@page contentType="text/html"%>
  <%@page pageEncoding="UTF-8"%>

    <!DOCTYPE html>
    <html>
      <head>

        <link rel="stylesheet" href="./codebase/dhtmlx.css">
          <script src="./codebase/dhtmlx.js" charset="utf-8"></script>
          <script src="uploadDownload.js"></script>
          <script type="text/javascript">
            function onStart() {
              var main_layout = new dhtmlXLayoutObject(document.body, '1C');

              new com.erwin.uploadDownloadApp.ChildClass(main_layout);

            }
          </script>
          <script>
            var loadFile = function (event) {
              var reader = new FileReader();
              reader.onload = function () {
                var output = document.getElementById('output');
                output.src = reader.result;
              };
              reader.readAsDataURL(event.target.files[0]);
            };

            function myFunction() {
              var x = document.getElementById("myFile");
              alert(x.value)
            }
          </script>
          <style></style>
          <%-- <script>
            var loadFile = function (event) {
              var reader = new FileReader();
              reader.onload = function () {
                var output = document.getElementById('output');
                output.src = reader.result;
              };
              reader.readAsDataURL(event.target.files[0]);
            };
          </script> --%>
            <style>
              body,
              html {
                width: 100%;
                height: 100%;
                margin: 0;
                overflow: hidden;
              }
            </style>
          </head>
          <body onload="onStart();">
            <%-- <body> --%>
              <div id="winVP"></div>
              <div id="okVP"></div>
              <input type="file" onchange="previewFile()">
                <br>
                  <img src="" height="200" alt="Image preview...">
                    <div id="previewVP">
                      <input type="file" id="myFile" accept="image/*" onchange="loadFile(event)">
                        <img id="output"/>
                        <input id="submit" type="submit"></input>
                        <%-- <input type="button" id="ok" value="OK"></input> --%>
                        </div>

                      </body>
                    </html>

                    <%-- this.win.attachObject("previewVP", true);
          var submit = document.getElementById("submit")
          submit.addEventListener("click", (e: Event) => {
            dhx.ajax.postSync("UploadAction.do?action=upload");

          }); --%>