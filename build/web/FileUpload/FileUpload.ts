declare var dhtmlXLayoutObject: any, dhtmlXMenuObject: any, dhtmlXWindows: any, useThings: any, encodeImageFileAsURL: any;
declare var dhx: any;
declare var dhtmlx: any, dhx4: any;
declare var formobj_submit: any;
declare var onLoad: any;
declare var dhtmlXDataView: any;
declare var loaderOn: any, loaderOff: any;
declare var alertNormal: any, alertError: any, alertWarning: any, confirmAlertNormal: any, confirmAlertWarning: any, confirmAlertError: any, alertMessage: any;

module com.erwin {
  class Parent {
    [x: string]: any;
    public layout: any;
    public myLayout: any;
    public grid1: any;
    public static selectedGrid: Object;


    public toolbar: any;



    constructor() {
      this.init();

    }

    public init() {
      //console.log("init")
      this.layout = new dhtmlXLayoutObject(document.body, "1C");

      this.layout.cells("a").setText("File Upload Example");
      this.addToolBar();
      this.addGrids();



    }
    public addToolBar() {
      this.toolbar = this.layout.cells("a").attachToolbar({
        icons_path: "imgs/toolbar/icons/",
        // json: "./Others/data/toolbar.xml"
      });
      this.toolbar.addButton("new", 0, "Upload File");
      // this.toolbar.addButton("download", 1, "Download File");

      this.toolbar.attachEvent("onClick", (id: any) => {

        if (id == "new") {
          this.openForm(this.grid1);
        }

      });

    }

    public addGrids() {

      //this.myLayout = this.layout.cells("a").attachLayout("3U");
      //
      //Grid1
      this.grid1 = this.layout.cells("a").attachGrid();
      this.grid1.setHeader("S.No,img:[./Uploaded/book.gif]FILE,VIEW");
      this.grid1.enableAutoWidth(true);
      // this.grid1.setEditable(true);
      this.grid1.setColAlign("center,center,center");
      this.grid1.setColTypes("ro,link,ro");
      this.grid1.attachHeader("#text_filter,#text_filter,#text_filter");
      this.grid1.setColSorting("str,str,str");

      this.layout.attachStatusBar({
        text: "<div id='pagingArea'></div>",
        paging: true
      });
      this.grid1.enablePaging(true, 5, 3, "pagingArea");
      this.grid1.setPagingSkin("bricks");
      this.grid1.init();
      this.loadGrid();
      this.grid1.load("UploadFileAction.do?action=loadGrid");//loadGrid
      // // this.grid1.addRow("id", ["1", "Demo^./Download?filename=angular-demo.zip"]);
      //
      // this.grid1.attachEvent("onRowDblClicked", () => {
      //   console.log("onRowDblClicked");
      // });
      this.grid1.attachEvent("onRowSelect", (rId: any, cInd: any) => {
        if (cInd != 2) {
          return false;
        }

        //
        let str = this.grid1.cells(rId, 1).getValue();
        let ind = str.indexOf("^");
        str = str.substring(0, ind);
        // alert(str)
        this.previewFile(str);
      });
      //onPaging
      this.grid1.attachEvent("onPageChanged", (ind: any, fInd: any, lInd: any) => {
        console.log("ind " + ind + "fInd " + fInd + "lInd " + lInd)

      });

    }
    public previewFile(filename: any) {
      let myWins = new dhtmlXWindows();
      let win = myWins.createWindow(1, 500, 200, 400, 300);
      win.setText("Download File");
      //{ attachEvent: (arg0: string, arg1: (id: any) => void) => void; getItemValue: (arg0: string) => void; }
      var form: any;

      let FormStructure: any = [
        { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120 },
        {
          type: "block", inputWidth: "auto", offsetTop: 12, list: [
            // { type: "input", name: "name", label: "Name", value: "Shiva" },
            { type: "label", name: "title", label: "<a href=./Download?filename=" + filename + ">Download File</a>", value: "" },
            {
              type: "template", inputWidth: 300, name: "pict", format: function() {
                return "<img src='./Uploaded/" + filename + "' id='viewImageId' height = 200px width=300px />";
              }
            }

          ]
        }
      ];

      form = win.attachForm(FormStructure);
      console.log(form);
      let imgId = document.getElementById("viewImageId");
      let sub = filename.indexOf(".");
      sub = filename.substring(sub + 1, filename.length).toLowerCase();
      let imageFormats = ["jpeg", "jpg", "png", "gif", "bmp"];
      if (imageFormats.indexOf(sub) == -1) {
        imgId.style.width = "0px";
        imgId.style.height = "0px";

      }
      else {
        imgId.style.width = "300px";
        imgId.style.height = "200px"
      }


    }
    public openForm(grid: any) {
      let myWins = new dhtmlXWindows();
      let win = myWins.createWindow(1, 500, 200, 400, 300);
      win.setText("Upload File");
      //{ attachEvent: (arg0: string, arg1: (id: any) => void) => void; getItemValue: (arg0: string) => void; }
      var form: any;

      let FormStructure: any = [
        { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120 },
        {
          type: "block", inputWidth: "auto", offsetTop: 12, list: [
            // { type: "input", name: "title", label: "<a href=./Download?filename=cars.jpg>Title</a>", value: "Shiva" },
            {
              type: "template", inputWidth: 300, name: "pict", format: function() {
                return "<img src='./FileUpload/photo.jpg' id='tempImageId' height = 0px width=0px>";
              }
            },


            { type: "upload", name: "myFiles", inputWidth: 330, value: "", url: "UploadFileAction.do?action=uploadFile", swfPath: "uploader.swf", swfUrl: "UploadFileAction.do?action=uploadFile" },

          ]
        }
      ];


      form = win.attachForm(FormStructure);
      console.log("Form Created")

      form.attachEvent("onUploadFile", (filename: any) => {
        console.log("onFileUploadFile");
        dhx.ajax.get("UploadFileAction.do?action=uploadFile", (res: any) => {
          console.log(res.xmlDoc.responseText);
        });
        this.loadGrid();
        console.log(filename);
        myWins.window(1).close();
      });
      form.attachEvent("onFileAdd", (filename: any) => {

        console.log("onFileAdd");
        console.log(form)
        console.log(form.getUploader("myFiles")._files);
        let myUploader = form.getUploader("myFiles");
        // console.log(form);
        // console.log(myUploader);
        //Fileloginc
        var reader = new FileReader();
        reader.onloadend = function() {
          console.log("Base64 encoded");
          console.log(reader.result);
          var img = document.getElementById("tempImageId");
          // console.log(img);
          let filename2 = myUploader._files[Object.keys(myUploader._files)[0]].name;
          let sub = filename2.indexOf(".");
          sub = filename.substring(sub + 1, filename2.length).toLowerCase();
          let imageFormats = ["jpeg", "jpg", "png", "gif", "bmp"];

          if (imageFormats.indexOf(sub) == -1) {
            img.style.width = "0px";
            img.style.height = "0px"

          }
          else {
            img.style.width = "200px";
            img.style.height = "100px"
          }

          img.src = reader.result;


        }
        console.log(myUploader._files[Object.keys(myUploader._files)[0]].file);
        reader.readAsDataURL(myUploader._files[Object.keys(myUploader._files)[0]].file);
        console.log("filename");
      });




    }

    public saveFile(form: any) {
      // form.send("./NewServlet", "post", function(loader, response) {
      //   alert("Saved");
      // });
      //  alert(form.getItemValue("myFiles"));
      console.log(form);
      var myUploader = form.getUploader("myFiles");
      console.log(myUploader.f);
      myUploader.f.setAttribute("id", "fileUpload");
      myUploader.f.setAttribute("onclick", "alert(this)");
      alert("from onFIleAdd");


      console.log("upload File started");
      //  console.log(typeof form.getItemValue("myFiles").getData());
      //  dhx.ajax.get("./NewServlet?name=");
      // formobj_submit(form, "UploadFileAction.do?action=uploadFile", () => {
      //   alertMessage("File uploaded");
      //
      // });
    }

    public loadGrid() {
      this.grid1.clearAndLoad("UploadFileAction.do?action=loadGrid", (res: any) => {

      });

    }


  }
  export class FileUpload extends Parent {
    constructor() {
      super();
    }
  }
}
