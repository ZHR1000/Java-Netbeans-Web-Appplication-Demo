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
var filename;
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var uploadDownloadApp;
        (function (uploadDownloadApp) {
            var Contacts = /** @class */ (function () {
                function Contacts(obj) {
                    this.id = 0;
                    this.enableEdit = false;
                    this.editArray = [];
                    this.myLayout = obj;
                    this.createGrid();
                    this.toolBar();
                }
                Contacts.prototype.createGrid = function () {
                    var _this = this;
                    this.mygrid = this.myLayout.cells('a').attachGrid();
                    this.mygrid.setImagePath("./codebase/imgs/");
                    this.mygrid.setHeader("Sno,File Name,Preview");
                    this.mygrid.attachHeader("#text_filter,#text_filter,#text_filter");
                    this.mygrid.setInitWidths("100,200,1000");
                    this.mygrid.setEditable(true);
                    this.mygrid.setColTypes("ro,link,ed");
                    this.mygrid.init();
                    // this.mygrid.addRow("1", "['4',<a href='DownloadFileServlet'>Aquarium.JPG</a>]")
                    this.loadGrid();
                    // this.mygrid.addRow(1, "1,aquarium.jpg^DownloadImageServlet")
                    // this.mygrid.addRow(2, "2,<a href='DownloadCars'>Cars.JPG</a>")
                    // this.mygrid.addRow(3, "3,<a href='DownloadTextFileServlet'>upload.txt</a>")
                    //this.mygrid.addRow(4, "4,Employee.java^DownloadEmployeeServlet")
                    //this.loadGrid();
                    this.mygrid.attachEvent("onEditCell", function (stage, rId, cInd, nValue, oValue) {
                        if (stage == 0) {
                            console.log("");
                            console.log(rId + " " + cInd);
                            //alert(this.mygrid.getSelectedId())
                            _this.selectedId = _this.mygrid.getSelectedId();
                            _this.id = _this.mygrid.cells(rId, 0).getValue();
                            //alert(this.id)
                            _this.resp = dhx.ajax.getSync("UploadAction.do?action=getFilePath&id=" + _this.id);
                            //this.fileURL = dhx.ajax.getSync("UploadAction.do?action=getURL")
                            console.log(_this.resp);
                            _this.fileURL = _this.resp.xmlDoc.responseText;
                            //alert(this.fileURL)
                            var a = _this.fileURL.trim();
                            _this.previewFormJSON = [
                                { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120 },
                                {
                                    type: "block", inputWidth: "auto", offsetTop: 12, list: [
                                        // { type: "input", name: "title", label: "Title", value: "" },
                                        {
                                            type: "template", inputWidth: 300, name: "pict", format: function () {
                                                // return "<img src='Capture1.PNG'>";
                                                //return this.fileURL;
                                                return "<img src='" + a + "'/>";
                                            }
                                        }
                                    ]
                                }
                            ];
                            // let img = document.getElementById("imgId");
                            // console.log(img);
                            // img.src = a;
                            //  console.log(img.src);
                            _this.previewWins = new dhtmlXWindows();
                            _this.previewWindow = _this.previewWins.createWindow("form", 500, 500, 400, 400);
                            _this.previewWindow.center();
                            _this.previewWins.window("form").setText("UPLOAD FORM");
                            setTimeout(function () {
                                Contacts.previewForm = _this.previewWindow.attachForm(_this.previewFormJSON, true);
                            }, 300);
                            // Contacts.previewForm = this.previewWindow.attachForm(this.previewFormJSON, true);
                            console.log(_this.previewFormJSON);
                            // console.log(Contacts.previewForm)
                            // console.log(this.resp)
                            //this.previewWindow.attachObject("preview", true);
                            return false;
                        }
                    });
                };
                // public loadFile(event: any) {
                //   var reader = new FileReader();
                //   reader.onload = function() {
                //     var output = document.getElementById('output');
                //     output.src = reader.result;
                //   }
                //
                //   reader.readAsDataURL(event.target.files[0]);
                // };
                Contacts.prototype.createForm = function () {
                    var _this = this;
                    this.myWins = new dhtmlXWindows();
                    this.win = this.myWins.createWindow("form", 500, 500, 400, 400);
                    this.win.center();
                    this.myWins.window("form").setText("UPLOAD FORM");
                    Contacts.myForm = this.win.attachForm(this.formData, true);
                    //  this.win.attachObject("previewVP", true);
                    var submit = document.getElementById("submit");
                    submit.addEventListener("click", function (e) {
                        _this.alertFileName();
                        var el = document.getElementById("previewVP");
                        el.addEventListener("click", function () {
                            //  dhx.ajax.postSync("UploadAction.do?action=upload");
                            //this.fileURL = dhx.ajax.postSync("UploadAction.do?action=getFilePath&id=" + this.id)
                            //  dhx.ajax.postSync("UploadAction.do?action=upload");
                            //this.resp = dhx.ajax.getSync("UploadAction.do?action=downloadFiles").xmlDoc.responseText;
                            //this.fileURL = dhx.ajax.getSync("UploadAction.do?action=getURL")
                        });
                        _this.formData = [
                            {
                                type: "fieldset",
                                name: "data",
                                label: "CHOOSE FILE",
                                inputWidth: "auto",
                                list: [
                                    {
                                        type: "input",
                                        name: 'filename',
                                        label: 'FILE NAME'
                                    },
                                    // { type: "image", name: "photo", label: "Photo", imageWidth: 126, imageHeight: 126, url: "UploadAction.do?action=preview" },
                                    { type: "upload", name: "myFiles", inputWidth: 330, url: "UploadAction.do?action=upload", _swfLogs: "enabled", swfPath: "uploader.swf", swfUrl: "UploadAction.do?action=upload" },
                                    {
                                        type: "button",
                                        name: "submit",
                                        value: "PROCEED"
                                    }
                                ]
                            }
                        ];
                        Contacts.myForm = _this.win.attachForm(_this.formData, true);
                        //console.log(Contacts.myForm.getItemValue("filename"));
                        var myUploader = myForm.getUploader("myFiles");
                        var reader = new FileReader();
                        var preview = document.querySelector('img');
                        var file = document.querySelector('input[type=file]').files[0];
                        var reader = new FileReader();
                        reader.addEventListener("onFileUpload", function () {
                            preview.src = reader.result;
                        }, false);
                        if (file) {
                            reader.readAsDataURL(file);
                        }
                        //this.fileURL = dhx.ajax.postSync("UploadAction.do?action=getFilePath&id=" + this.mygrid.cells(this.mygrid.getSelectedId(), this.mygrid.getSelectedCellIndex()).getValue())
                        _this.loadGrid();
                        _this.win.close();
                    });
                    // this.fileURL = dhx.ajax.postSync("UploadAction.do?action=getFilePath&id=" + this.id)
                    // this.previewWins = new dhtmlXWindows();
                    // this.previewWindow = this.previewWins.createWindow("form", 500, 500, 400, 400);
                    // this.previewWindow.center();
                    // this.previewWins.window("form").setText("DETAILS FORM");
                    // this.previewWindow.attachObject("previewVP", true);
                    // var dhxLayout = this.previewWins.window("a").attachLayout();
                    // this.resp = dhx.ajax.getSync("UploadAction.do?action=downloadFiles").xmlDoc.responseText;
                    //this.fileURL = dhx.ajax.postSync("UploadAction.do?action=getFilePath&id=" + this.mygrid.cells(this.mygrid.getSelectedId(), this.mygrid.getSelectedCellIndex()).getValue())
                    // this.fileURL = this.fileURL.xmlDoc.responseText;
                    // console.log(this.fileURL)
                    // var a = this.fileURL.trim();
                    // this.previewFormJSON = [
                    //   { type: "settings", position: "label-left", labelWidth: 100, inputWidth: 120 },
                    //   {
                    //     type: "block", inputWidth: "auto", offsetTop: 12, list: [
                    //       // { type: "input", name: "title", label: "Title", value: "" },
                    //       {
                    //         type: "template", inputWidth: 300, name: "pict", format: () => {
                    //           // return "<img src='Capture1.PNG'>";
                    //           //return this.fileURL;
                    //           return "<img src='" + a + "'/>";
                    //         }
                    //       }
                    //     ]
                    //   }
                    // ]
                    //
                    // setTimeout(() => {
                    //   Contacts.previewForm = this.previewWindow.attachForm(this.previewFormJSON, true);
                    // }, 300)
                    // Contacts.previewForm = this.previewWindow.attachForm(this.previewFormJSON, true);
                };
                Contacts.prototype.alertFileName = function () {
                    var x = document.getElementById("myFile");
                    alert(x.value);
                };
                Contacts.prototype.loadGrid = function () {
                    this.mygrid.clearAndLoad("UploadAction.do?action=getFiles");
                };
                Contacts.prototype.toolBar = function () {
                    var _this = this;
                    this.toolbar = this.myLayout.cells('a').attachToolbar();
                    this.toolbar.setIconsPath('./codebase/imgs/');
                    this.toolbar.addButton("upload", 0, "UPLOAD");
                    //this.toolbar.addButton("download", 0, "DOWNLOAD");
                    this.toolbar.attachEvent("onClick", function (id) {
                        if (id == "upload") {
                            _this.createForm();
                        }
                    });
                };
                return Contacts;
            }());
            uploadDownloadApp.Contacts = Contacts;
            var ChildClass = /** @class */ (function (_super) {
                __extends(ChildClass, _super);
                function ChildClass(obj) {
                    return _super.call(this, obj) || this;
                }
                return ChildClass;
            }(Contacts));
            uploadDownloadApp.ChildClass = ChildClass;
        })(uploadDownloadApp = erwin.uploadDownloadApp || (erwin.uploadDownloadApp = {}));
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=uploadDownload.js.map