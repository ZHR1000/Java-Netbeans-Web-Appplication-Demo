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
        var ContactApp;
        (function (ContactApp) {
            var Contacts = /** @class */ (function () {
                function Contacts(obj) {
                    this.id = 0;
                    this.enableEdit = false;
                    this.editArray = [];
                    this.myLayout = obj.cell;
                    this.createGrid();
                    this.toolBar();
                }
                Contacts.prototype.createGrid = function () {
                    var _this = this;
                    this.mygrid = this.myLayout.attachGrid();
                    this.mygrid.setImagePath("./codebase/imgs/");
                    this.mygrid.setHeader("Sno,Id,Name,Phone Number,Email");
                    this.mygrid.attachHeader("#text_filter,#text_filter,#text_filter,#text_filter,#text_filter");
                    this.mygrid.setInitWidths("100,200,150,");
                    this.mygrid.setColAlign("left,left,left,left,left");
                    this.mygrid.setColTypes("ed,ed,ed,ed,ed");
                    this.mygrid.setColSorting("str,str,str,str,str,");
                    this.mygrid.enableValidation(true);
                    this.mygrid.setColValidators("NotEmpty,NotEmpty,NotEmpty,ValidEmail");
                    this.mygrid.init();
                    this.loadGrid();
                    this.mygrid.attachEvent("onRowDblClicked", function () {
                        if (_this.enableEdit) {
                            return true;
                        }
                        else {
                            _this.warningMessage();
                            return false;
                        }
                    });
                    this.mygrid.attachEvent("onEditCell", function (stage, rId, cInd, nvalue, ovalue) {
                        if (stage == 2) {
                            var obj = {
                                id: _this.mygrid.cellById(rId, 1).getValue(),
                                name: _this.mygrid.cellById(rId, 2).getValue(),
                                number: _this.mygrid.cellById(rId, 3).getValue(),
                                email: _this.mygrid.cellById(rId, 4).getValue(),
                            };
                            //if (this.checkDuplicates(obj, rId, cInd, nvalue)) {
                            var schema = {
                                name: function (value) {
                                    return /^[a-zA-Z]/.test(value);
                                },
                                number: function (value) {
                                    return /^[0-9]{10}$/.test(value);
                                },
                                email: function (value) {
                                    return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
                                }
                            };
                            if (_this.validateGrid(obj, schema)) {
                                if (_this.checkDuplicates(rId, cInd, nvalue)) {
                                    if (_this.editArray.length == 0) {
                                        _this.editArray.push(obj);
                                    }
                                    else {
                                        for (var i = 0; i < _this.editArray.length; i++) {
                                            if (_this.editArray[i].id == obj.id) {
                                                _this.editArray.splice(i, 1);
                                            }
                                        }
                                        _this.editArray.push(obj);
                                        console.log(_this.editArray);
                                    }
                                }
                            }
                            return true;
                        }
                    });
                };
                Contacts.prototype.validateGrid = function (object, schema) {
                    var errors = Object.keys(schema).map(function (property) {
                        var validator = schema[property];
                        return [property, validator(object[property])];
                    }).reduce(function (errors, pair) {
                        if (pair[1] === false) {
                            errors.push(new Error(pair[0] + " is invalid."));
                        }
                        return errors;
                    }, []);
                    if (errors.length > 0) {
                        return false;
                    }
                    else {
                        return true;
                    }
                };
                Contacts.prototype.checkDuplicates = function (rId, cInd, nvalue) {
                    var _this = this;
                    this.mygrid.forEachRow(function (id) {
                        if (_this.mygrid.cellById(id, cInd).getValue() == nvalue && rId != id) {
                            dhtmlx.alert("Duplicate entries not allowed");
                            return true;
                        }
                    });
                    return false;
                };
                Contacts.prototype.createForm = function () {
                    var _this = this;
                    this.myWins = new dhtmlXWindows();
                    this.win = this.myWins.createWindow("form", 500, 500, 400, 400);
                    this.win.center();
                    this.myWins.window("form").setText("DETAILS FORM");
                    Contacts.myForm = this.win.attachForm();
                    Contacts.myForm.loadStruct("EmployeeAction.do?action=loadEmployeeForm");
                    Contacts.myForm.enableLiveValidation(true);
                    Contacts.myForm.attachEvent("onButtonClick", function (id) {
                        if (id == "submit") {
                            //if (Contacts.myForm.validate() && this.checkFormDuplicates(Contacts.myForm.getItemValue("name"))) {
                            if (Contacts.myForm.validate()) {
                                _this.loadForm();
                            }
                            else {
                                _this.warningMessage();
                            }
                        }
                        else {
                            Contacts.myForm.clear();
                        }
                    });
                };
                Contacts.prototype.loadGrid = function () {
                    this.mygrid.clearAndLoad("EmployeeAction.do?action=getEmployee");
                };
                Contacts.prototype.loadForm = function () {
                    var _this = this;
                    Contacts.myForm.send("EmployeeAction.do?action=setEmployee", "POST", function (response) {
                        if (response) {
                            _this.win.close();
                            _this.successMessage();
                            _this.loadGrid();
                        }
                        else {
                            dhtmlx.message("Data load failed");
                        }
                    });
                };
                Contacts.prototype.toolBar = function () {
                    var _this = this;
                    this.toolbar = this.myLayout.attachToolbar();
                    this.toolbar.setIconsPath('./codebase/imgs/');
                    this.toolbar.addButton("add", 0, "ADD");
                    this.toolbar.addButton("edit", 1, "EDIT");
                    this.toolbar.addButton("del", 2, "DELETE");
                    this.toolbar.addButton("save", 3, "SAVE");
                    this.toolbar.addButton("canc", 4, "CANCEL");
                    this.toolbar.addButton("exc", 5, "EXPORT TO EXCEL");
                    this.toolbar.hideItem("save");
                    this.toolbar.hideItem("canc");
                    this.toolbar.attachEvent("onClick", function (id) {
                        if (id == "add") {
                            _this.createForm();
                        }
                        else if (id == "del") {
                            _this.deleteItem();
                        }
                        else if (id == "edit") {
                            _this.toolbar.hideItem("add");
                            _this.toolbar.hideItem("edit");
                            _this.toolbar.hideItem("del");
                            _this.toolbar.showItem("save");
                            _this.toolbar.showItem("canc");
                            _this.enableEdit = true;
                            dhtmlx.message("Edit");
                        }
                        else if (id == "save") {
                            dhtmlx.message("save");
                            _this.doSave();
                            _this.enableEdit = false;
                        }
                        else if (id == "canc") {
                            _this.toolbar.showItem("add");
                            _this.toolbar.showItem("edit");
                            _this.toolbar.showItem("del");
                            _this.toolbar.hideItem("save");
                            _this.toolbar.hideItem("canc");
                            _this.loadGrid();
                            dhtmlx.message("cancel");
                        }
                        else if (id == "exc") {
                            //this.mygrid.toExcel("http://dhtmlxgrid.appspot.com/export/excel");
                            //this.mygrid.toPDF("http://dhtmlxgrid.appspot.com/export/pdf");
                            console.log("Download completed");
                            var response = dhx.ajax.getSync("EmployeeAction.do?action=excelEmployee");
                            if (response != null) {
                                dhtmlx.alert({
                                    type: "successful",
                                    text: "Data successfully saved to excel file",
                                    title: "Success!",
                                });
                            }
                        }
                    });
                };
                Contacts.prototype.deleteItem = function () {
                    var _this = this;
                    var rowId = this.mygrid.getSelectedRowId();
                    if (rowId == 0) {
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
                                _this.mygrid.deleteRow(rowId);
                                if (rowId != 0) {
                                    dhx.ajax.getSync("EmployeeAction.do?action=removeEmployee&id=" + rowId);
                                }
                            }
                            else {
                                _this.loadGrid();
                            }
                        }
                    });
                };
                Contacts.prototype.doSave = function () {
                    var stringifiedArray = JSON.stringify(this.editArray);
                    console.log(stringifiedArray);
                    dhx.ajax.postSync("EmployeeAction.do?action=saveUpdates&array=" + stringifiedArray);
                    this.toolbar.showItem("add");
                    this.toolbar.showItem("edit");
                    this.toolbar.showItem("del");
                    this.toolbar.hideItem("save");
                    this.toolbar.hideItem("canc");
                    this.loadGrid();
                };
                Contacts.prototype.successMessage = function () {
                    dhtmlx.alert({
                        type: "successful",
                        text: "Data is saved",
                        title: "Success!",
                    });
                };
                Contacts.prototype.warningMessage = function () {
                    dhtmlx.alert({
                        type: "alert-error",
                        text: "Invalid Operation",
                        title: "Error!",
                        ok: "Okay"
                    });
                };
                return Contacts;
            }());
            ContactApp.Contacts = Contacts;
            var ChildClass = /** @class */ (function (_super) {
                __extends(ChildClass, _super);
                function ChildClass(obj) {
                    return _super.call(this, obj) || this;
                }
                return ChildClass;
            }(Contacts));
            ContactApp.ChildClass = ChildClass;
        })(ContactApp = erwin.ContactApp || (erwin.ContactApp = {}));
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=index.js.map