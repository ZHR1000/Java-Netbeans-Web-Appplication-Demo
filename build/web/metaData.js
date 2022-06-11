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
var myForm;
var grid_1;
var grid_2;
var grid_3;
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var metadataApp;
        (function (metadataApp) {
            var ParentClass = /** @class */ (function () {
                function ParentClass(mainLayoutObj) {
                    this.createGrids(mainLayoutObj);
                    this.createToolbar(mainLayoutObj);
                }
                ParentClass.prototype.createToolbar = function (mainLayoutObj) {
                    var _this = this;
                    var toolbar_1 = mainLayoutObj.cell.attachToolbar();
                    toolbar_1.setIconsPath('./codebase/imgs/');
                    toolbar_1.loadStruct('<toolbar><item type="button" id="btn1" text="GRID 1" /><item type="button" id="btn2" text="GRID 2" /><item type="button" id="compare" text="COMPARE" /></toolbar>', function () { });
                    toolbar_1.attachEvent("onClick", function (id) {
                        _this.perform(id);
                    });
                };
                ParentClass.prototype.createGrids = function (mainLayoutObj) {
                    this.a = mainLayoutObj.cell.cells('a');
                    this.grid_1 = this.a.attachGrid();
                    this.grid_1.setIconsPath('./codebase/imgs/');
                    this.grid_1.setHeader(["SNO", "TABLE NAME"]);
                    this.grid_1.setColTypes("ro,ro");
                    this.grid_1.setColSorting('str,str');
                    this.grid_1.setInitWidths('*,*');
                    this.grid_1.init();
                    this.b = mainLayoutObj.cell.cells('b');
                    this.grid_2 = this.b.attachGrid();
                    this.grid_2.setIconsPath('./codebase/imgs/');
                    this.grid_2.setHeader(["SNO", "TABLE NAME"]);
                    this.grid_2.setColTypes("ro,ro");
                    this.grid_2.setColSorting('str,str');
                    this.grid_2.setInitWidths('*,*');
                    this.grid_2.init();
                    this.c = mainLayoutObj.cell.cells('c');
                    this.grid_3 = this.c.attachGrid();
                    this.grid_3.setIconsPath('./codebase/imgs/');
                    this.grid_3.setHeader(["SNO", "TABLE NAME"]);
                    this.grid_3.setColTypes("ro,ro");
                    this.grid_3.setColSorting('str,str');
                    this.grid_3.setInitWidths('*,*');
                    this.grid_3.init();
                };
                ParentClass.prototype.perform = function (id) {
                    if (id == "btn1") {
                        this.loadForm(id);
                    }
                    else if (id == "btn2") {
                        this.loadForm(id);
                    }
                    else if (id == "compare") {
                        this.compareGrids();
                    }
                };
                ParentClass.prototype.loadForm = function (btnId) {
                    var _this = this;
                    this.myWins = new dhtmlXWindows();
                    this.win = this.myWins.createWindow("form", 500, 500, 400, 400);
                    this.win.center();
                    this.myWins.window("form").setText("DETAILS FORM");
                    ParentClass.myForm = this.win.attachForm();
                    var formStructure = [
                        { type: "settings", position: "label-top" },
                        {
                            type: "fieldset", name: "metadatForm", label: "Database Details", list: [
                                { type: "input", name: 'url', label: 'URL' },
                                { type: "input", name: 'dbname', label: 'DATABASE NAME' },
                                { type: "input", name: 'uname', label: 'USERNAME' },
                                { type: "input", name: 'pwd', label: 'PASSWORD' },
                                { type: "newRow" },
                                { type: "button", name: "submit", width: 50, offsetTop: 10, value: "SUBMIT" },
                                { type: "button", name: "reset", width: 50, offsetTop: 10, value: "RESET" }
                            ]
                        }
                    ];
                    ParentClass.myForm = this.win.attachForm();
                    ParentClass.myForm.loadStruct("MetadataAction.do?action=loadForm");
                    ParentClass.myForm.attachEvent("onButtonClick", function (id) {
                        if (id == "submit") {
                            ParentClass.myForm.send("MetadataAction.do?action=loadDetails", "POST", function (response) {
                                //var result = JSON.parse(r.xmlDoc.responseText);
                                if (response) {
                                    if (btnId == "btn1") {
                                        _this.loadGrid1();
                                    }
                                    else if (btnId = "btn2") {
                                        _this.loadGrid2();
                                    }
                                }
                                _this.win.close();
                            });
                        }
                        else if (id == "reset") {
                            ParentClass.myForm.clear();
                        }
                    });
                };
                ParentClass.prototype.loadGrid1 = function () {
                    this.grid_1.clearAndLoad("MetadataAction.do?action=loadGrid1");
                };
                ParentClass.prototype.loadGrid2 = function () {
                    this.grid_2.clearAndLoad("MetadataAction.do?action=loadGrid2");
                };
                ParentClass.prototype.compareGrids = function () {
                    this.grid_3.clearAndLoad("MetadataAction.do?action=loadGrid3");
                };
                return ParentClass;
            }());
            metadataApp.ParentClass = ParentClass;
            var ChildClass = /** @class */ (function (_super) {
                __extends(ChildClass, _super);
                function ChildClass(mainLayoutObj) {
                    return _super.call(this, mainLayoutObj) || this;
                }
                return ChildClass;
            }(ParentClass));
            metadataApp.ChildClass = ChildClass;
        })(metadataApp = erwin.metadataApp || (erwin.metadataApp = {}));
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=metaData.js.map