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
var grid1;
var a;
var dhtmlXCombo;
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var formgrid;
        (function (formgrid) {
            var Parent = /** @class */ (function () {
                function Parent(layoutObj) {
                    this.createGrid(layoutObj);
                }
                Parent.prototype.createGrid = function (layoutObj) {
                    var _this = this;
                    a = layoutObj.cell.cells("a");
                    a.setText("<span style='color:black;'><b>GRID COLUMN TYPES<b></span>");
                    grid1 = a.attachGrid();
                    grid1.setImagePath("./codebase/imgs/");
                    grid1.setHeader("Sno,Id,Name,Type,Value");
                    grid1.setInitWidths("100,100,100,100");
                    this.loadGrid();
                    grid1.init();
                    var toolbar_1 = a.attachToolbar();
                    toolbar_1.setIconsPath('./codebase/imgs/');
                    toolbar_1.loadStruct('<toolbar><item type="button" id="add" text="ADD" /></toolbar>');
                    //toolbar_1.addButton("edit", 1, "EDIT");
                    toolbar_1.addButton("delete", 2, "DELETE");
                    toolbar_1.attachEvent("onClick", function (id) {
                        if (id == "add") {
                            _this.createInnerGrid();
                        }
                        else if (id == "delete") {
                            _this.deleteItem();
                        }
                        else {
                            dhtmlx.message("Data load failed");
                        }
                    });
                };
                Parent.prototype.doSave = function () {
                    var stringifiedArray = JSON.stringify(this.editArray);
                    console.log(stringifiedArray);
                    dhx.ajax.postSync("FormGridAction.do?action=saveUpdates&array=" + stringifiedArray);
                    this.loadGrid();
                };
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
                    var rowId = grid1.getSelectedRowId();
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
                                grid1.deleteRow(rowId);
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
                    grid1.clearAndLoad("FormGridAction.do?action=getData");
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
            formgrid.Parent = Parent;
            var Child = /** @class */ (function (_super) {
                __extends(Child, _super);
                function Child(obj) {
                    return _super.call(this, obj) || this;
                }
                return Child;
            }(Parent));
            formgrid.Child = Child;
        })(formgrid = erwin.formgrid || (erwin.formgrid = {}));
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=form-grid.js.map