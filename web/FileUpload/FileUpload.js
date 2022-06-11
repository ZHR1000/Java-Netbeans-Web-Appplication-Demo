var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var Parent = /** @class */ (function () {
            function Parent() {
                this.init();
            }
            Parent.prototype.init = function () {
                //console.log("init")
                this.layout = new dhtmlXLayoutObject(document.body, "1C");
                this.layout.cells("a").setText("File Upload Example");
                this.addToolBar();
                this.addGrids();
            };
            Parent.prototype.addToolBar = function () {
                var _this = this;
                this.toolbar = this.layout.cells("a").attachToolbar({
                    icons_path: "imgs/toolbar/icons/",
                });
                this.toolbar.addButton("new", 0, "Upload File");
                // this.toolbar.addButton("download", 1, "Download File");
                this.toolbar.attachEvent("onClick", function (id) {
                    if (id == "new") {
                        _this.openForm(_this.grid1);
                    }
                });
            };
            Parent.prototype.addGrids = function () {
                var _this = this;
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
                this.grid1.load("UploadFileAction.do?action=loadGrid"); //loadGrid
                // // this.grid1.addRow("id", ["1", "Demo^./Download?filename=angular-demo.zip"]);
                //
                // this.grid1.attachEvent("onRowDblClicked", () => {
                //   console.log("onRowDblClicked");
                // });
                this.grid1.attachEvent("onRowSelect", function (rId, cInd) {
                    if (cInd != 2) {
                        return false;
                    }
                    //
                    var str = _this.grid1.cells(rId, 1).getValue();
                    var ind = str.indexOf("^");
                    str = str.substring(0, ind);
                    // alert(str)
                    _this.previewFile(str);
                });
                //onPaging
                this.grid1.attachEvent("onPageChanged", function (ind, fInd, lInd) {
                    console.log("ind " + ind + "fInd " + fInd + "lInd " + lInd);
                });
            };
            Parent.prototype.previewFile = function (filename) {
                var myWins = new dhtmlXWindows();
                var win = myWins.createWindow(1, 500, 200, 400, 300);
                win.setText("Download File");
                //{ attachEvent: (arg0: string, arg1: (id: any) => void) => void; getItemValue: (arg0: string) => void; }
                var form;
                var FormStructure = [
                    { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120 },
                    {
                        type: "block", inputWidth: "auto", offsetTop: 12, list: [
                            // { type: "input", name: "name", label: "Name", value: "Shiva" },
                            { type: "label", name: "title", label: "<a href=./Download?filename=" + filename + ">Download File</a>", value: "" },
                            {
                                type: "template", inputWidth: 300, name: "pict", format: function () {
                                    return "<img src='./Uploaded/" + filename + "' id='viewImageId' height = 200px width=300px />";
                                }
                            }
                        ]
                    }
                ];
                form = win.attachForm(FormStructure);
                console.log(form);
                var imgId = document.getElementById("viewImageId");
                var sub = filename.indexOf(".");
                sub = filename.substring(sub + 1, filename.length).toLowerCase();
                var imageFormats = ["jpeg", "jpg", "png", "gif", "bmp"];
                if (imageFormats.indexOf(sub) == -1) {
                    imgId.style.width = "0px";
                    imgId.style.height = "0px";
                }
                else {
                    imgId.style.width = "300px";
                    imgId.style.height = "200px";
                }
            };
            Parent.prototype.openForm = function (grid) {
                var _this = this;
                var myWins = new dhtmlXWindows();
                var win = myWins.createWindow(1, 500, 200, 400, 300);
                win.setText("Upload File");
                //{ attachEvent: (arg0: string, arg1: (id: any) => void) => void; getItemValue: (arg0: string) => void; }
                var form;
                var FormStructure = [
                    { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120 },
                    {
                        type: "block", inputWidth: "auto", offsetTop: 12, list: [
                            // { type: "input", name: "title", label: "<a href=./Download?filename=cars.jpg>Title</a>", value: "Shiva" },
                            {
                                type: "template", inputWidth: 300, name: "pict", format: function () {
                                    return "<img src='./FileUpload/photo.jpg' id='tempImageId' height = 0px width=0px>";
                                }
                            },
                            { type: "upload", name: "myFiles", inputWidth: 330, value: "", url: "UploadFileAction.do?action=uploadFile", swfPath: "uploader.swf", swfUrl: "UploadFileAction.do?action=uploadFile" },
                        ]
                    }
                ];
                form = win.attachForm(FormStructure);
                console.log("Form Created");
                form.attachEvent("onUploadFile", function (filename) {
                    console.log("onFileUploadFile");
                    dhx.ajax.get("UploadFileAction.do?action=uploadFile", function (res) {
                        console.log(res.xmlDoc.responseText);
                    });
                    _this.loadGrid();
                    console.log(filename);
                    myWins.window(1).close();
                });
                form.attachEvent("onFileAdd", function (filename) {
                    console.log("onFileAdd");
                    console.log(form);
                    console.log(form.getUploader("myFiles")._files);
                    var myUploader = form.getUploader("myFiles");
                    // console.log(form);
                    // console.log(myUploader);
                    //Fileloginc
                    var reader = new FileReader();
                    reader.onloadend = function () {
                        console.log("Base64 encoded");
                        console.log(reader.result);
                        var img = document.getElementById("tempImageId");
                        // console.log(img);
                        var filename2 = myUploader._files[Object.keys(myUploader._files)[0]].name;
                        var sub = filename2.indexOf(".");
                        sub = filename.substring(sub + 1, filename2.length).toLowerCase();
                        var imageFormats = ["jpeg", "jpg", "png", "gif", "bmp"];
                        if (imageFormats.indexOf(sub) == -1) {
                            img.style.width = "0px";
                            img.style.height = "0px";
                        }
                        else {
                            img.style.width = "200px";
                            img.style.height = "100px";
                        }
                        img.src = reader.result;
                    };
                    console.log(myUploader._files[Object.keys(myUploader._files)[0]].file);
                    reader.readAsDataURL(myUploader._files[Object.keys(myUploader._files)[0]].file);
                    console.log("filename");
                });
            };
            Parent.prototype.saveFile = function (form) {
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
            };
            Parent.prototype.loadGrid = function () {
                this.grid1.clearAndLoad("UploadFileAction.do?action=loadGrid", function (res) {
                });
            };
            return Parent;
        }());
        var FileUpload = /** @class */ (function (_super) {
            __extends(FileUpload, _super);
            function FileUpload() {
                return _super.call(this) || this;
            }
            return FileUpload;
        }(Parent));
        erwin.FileUpload = FileUpload;
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=FileUpload.js.map