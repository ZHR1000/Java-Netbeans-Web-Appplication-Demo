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
var dhtmlXCombo;
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var Parent = /** @class */ (function () {
            function Parent(layoutObj) {
                this.languageParam = {
                    country: "US"
                };
                this.langJSON = {};
                this.layoutObj = layoutObj;
                //this.getLanguage(this.languageParam);
            }
            Parent.prototype.getLanguage = function (json) {
                var _this = this;
                dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(json)), function (resp) {
                    _this.langJSON = JSON.parse(resp.xmlDoc.responseText);
                    console.log(resp.xmlDoc.responseText);
                    _this.createGrid(_this.layoutObj);
                });
            };
            Parent.prototype.createGrid = function (layoutObj) {
                var _this = this;
                this.a = layoutObj.cell.cells("a");
                console.log(this.langJSON);
                this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");
                this.grid1 = this.a.attachGrid();
                this.grid1.setImagePath("./codebase/imgs/");
                this.grid1.setHeader("Id,Name,Contact,Email");
                this.grid1.setInitWidths("100,100,100,100");
                this.loadGrid();
                this.grid1.init();
                this.toolbar_1 = this.a.attachToolbar();
                //  this.toolbar_1.setIconsPath('./codebase/imgs/');
                console.log("hi" + this.toolbar_1);
                this.toolbar_1.addButton("eng", 1, this.langJSON.ENGLISH);
                this.toolbar_1.addButton("hin", 2, this.langJSON.HINDI);
                this.toolbar_1.addButton("chi", 3, this.langJSON.CHINESE);
                this.toolbar_1.attachEvent("onClick", function (id) {
                    if (id == "eng") {
                        _this.languageParam.country = "US";
                        dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(_this.languageParam)), function (resp) {
                            _this.langJSON = JSON.parse(resp.xmlDoc.responseText);
                            console.log(resp.xmlDoc.responseText);
                        });
                        _this.toolbar_1.setItemText("eng", _this.langJSON.ENGLISH);
                        _this.toolbar_1.setItemText("hin", _this.langJSON.HINDI);
                        _this.toolbar_1.setItemText("chi", _this.langJSON.CHINESE);
                        _this.a.setText("<span style='color:black;'><b>" + _this.langJSON.TITLE + "<b></span>");
                    }
                    else if (id == "hin") {
                        _this.languageParam.country = "IN";
                        dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(_this.languageParam)), function (resp) {
                            _this.langJSON = JSON.parse(resp.xmlDoc.responseText);
                            console.log(resp.xmlDoc.responseText);
                        });
                        console.log(_this.langJSON.Name + "hgjgjg");
                        // this.toolbar_1.setItemText("eng", this.langJSON.ENGLISH);
                        // this.toolbar_1.setItemText("hin", this.langJSON.HINDI)
                        // this.toolbar_1.setItemText("chi", this.langJSON.CHINESE)
                        // this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");0.
                    }
                    else if (id == "chi") {
                        _this.languageParam.country = "CH";
                        dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(_this.languageParam)), function (resp) {
                            _this.langJSON = JSON.parse(resp.xmlDoc.responseText);
                            console.log(resp.xmlDoc.responseText);
                        });
                        // this.toolbar_1.setItemText("eng", this.langJSON.ENGLISH);
                        // this.toolbar_1.setItemText("hin", this.langJSON.HINDI)
                        // this.toolbar_1.setItemText("chi", this.langJSON.CHINESE)
                        // this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");
                    }
                    _this.toolbar_1.setItemText("eng", _this.langJSON.ENGLISH);
                    _this.toolbar_1.setItemText("hin", _this.langJSON.HINDI);
                    _this.toolbar_1.setItemText("chi", _this.langJSON.CHINESE);
                    _this.a.setText("<span style='color:black;'><b>" + _this.langJSON.TITLE + "<b></span>");
                    _this.grid1.setHeader(_this.langJSON.Id, _this.langJSON.Name, _this.langJSON.Contact, _this.langJSON.Email);
                    //this.getLanguage(this.languageParam);
                    // var stringifiedlanguage = JSON.stringify(this.languageParam);
                    // dhx.ajax.postSync("MultilanguageAction.do?action=getLang&param=" + stringifiedlanguage), (res: any) => {
                    //   this.loadGrid();
                    // }
                });
            };
            // public doSave() {
            //   var stringifiedArray = JSON.stringify(this.editArray);
            //   console.log(stringifiedArray);
            //   dhx.ajax.postSync("FormGridAction.do?action=saveUpdates&array=" + stringifiedArray);
            //   this.loadGrid();
            // }
            Parent.prototype.createInnerGrid = function () {
                var _this = this;
                this.myWins = new dhtmlXWindows();
                this.win = this.myWins.createWindow("form", 500, 500, 400, 400);
                this.win.center();
                this.myWins.window("form").setText("DETAILS FORM");
                this.childGrid = this.win.attachGrid();
                this.childGridToolbar = this.win.attachToolbar();
                this.childGridToolbar.addButton("addChild", 0, "ADD");
                this.childGridToolbar.attachEvent("onClick", function (id) {
                    if (id == "addChild") {
                        var obj = {
                            name: _this.childGrid.cellById(0, 1).getValue(),
                            type: _this.childGrid.cellById(1, 1).getValue(),
                            value: _this.childGrid.cellById(2, 1).getValue()
                        };
                        var stringifiedObj = encodeURIComponent(JSON.stringify(obj));
                        console.log(stringifiedObj);
                        dhx.ajax.postSync("FormGridAction.do?action=insertData&obj=" + stringifiedObj);
                        _this.loadGrid();
                        _this.win.close();
                        dhtmlx.message("Grid Values Successfully Stored!!");
                    }
                });
                this.childGrid.init();
                this.childGrid.load("FormGridAction.do?action=loadInnerGrid");
                this.childGrid.attachEvent("onEditCell", function (stage, rId, cInd, nvalue) {
                    if (stage == 2) {
                        console.log(rId + "," + cInd + "," + nvalue);
                        if (rId == 1 && cInd == 1) {
                            _this.childGrid.setCellExcellType(2, 1, nvalue);
                        }
                    }
                    return true;
                });
            };
            Parent.prototype.deleteItem = function () {
                var _this = this;
                var rowId = this.grid1.getSelectedRowId();
                if (rowId == null) {
                    dhtmlx.alert({
                        type: "alert-error",
                        text: "No row selected. Please select one",
                        title: "Error!",
                        ok: "Okay"
                    });
                }
                dhtmlx.confirm({
                    title: "Close",
                    type: "confirm",
                    text: "Are you sure you want to delete?",
                    callback: function (res) {
                        if (res) {
                            _this.grid1.deleteRow(rowId);
                            if (rowId != 0) {
                                dhx.ajax.postSync("FormGridAction.do?action=removeItem&id=" + rowId);
                            }
                        }
                        else {
                            _this.loadGrid();
                        }
                    }
                });
            };
            Parent.prototype.loadGrid = function () {
                this.grid1.clearAndLoad("MultilanguageAction.do?action=getData");
            };
            Parent.prototype.warningMessage = function () {
                dhtmlx.alert({
                    type: "alert-error",
                    text: "Invalid Operation",
                    title: "Error!",
                    ok: "Okay"
                });
            };
            return Parent;
        }());
        var Child = /** @class */ (function (_super) {
            __extends(Child, _super);
            function Child(obj) {
                return _super.call(this, obj) || this;
            }
            return Child;
        }(Parent));
        erwin.Child = Child;
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=multilanguage.js.map