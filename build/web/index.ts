declare var dhtmlXGridObject: any;
declare var dhtmlXLayoutObject: any;
declare var dhtmlXForm: any
declare var dhtmlx: any;
declare var dhx: any;
declare var dhtmlXWindows: any;
declare var formobj_submit: any;

module com.erwin.ContactApp {
  export class Contacts {
    public myLayout: any;
    public mygrid: any;
    public myWins: any;
    public win: any;
    public id: number = 0;
    public toolbar: any;
    public enableEdit = false;
    public editArray: any = [];
    public formWin: any;
    public window2: any;
    public formData: any;
    static myForm: any;

    constructor(obj: any) {
      this.myLayout = obj.cell;
      this.createGrid();
      this.toolBar();
    }

    public createGrid() {
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
      this.mygrid.attachEvent("onRowDblClicked", () => {
        if (this.enableEdit) {
          return true;
        }
        else {
          this.warningMessage();
          return false;
        }
      });
      this.mygrid.attachEvent("onEditCell", (stage: any, rId: any, cInd: any, nvalue: any, ovalue: any) => {
        if (stage == 2) {

          var obj = {
            id: this.mygrid.cellById(rId, 1).getValue(),
            name: this.mygrid.cellById(rId, 2).getValue(),
            number: this.mygrid.cellById(rId, 3).getValue(),
            email: this.mygrid.cellById(rId, 4).getValue(),
          }
          //if (this.checkDuplicates(obj, rId, cInd, nvalue)) {
          var schema = {
            name: function(value: any) {
              return /^[a-zA-Z]/.test(value);
            },
            number: function(value: any) {
              return /^[0-9]{10}$/.test(value);
            },
            email: function(value: any) {
              return /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/.test(value);
            }
          };

          if (this.validateGrid(obj, schema)) {
            if (this.checkDuplicates(rId, cInd, nvalue)) {

              if (this.editArray.length == 0) {
                this.editArray.push(obj);
              }
              else {
                for (let i = 0; i < this.editArray.length; i++) {
                  if (this.editArray[i].id == obj.id) {
                    this.editArray.splice(i, 1);
                  }
                }
                this.editArray.push(obj);
                console.log(this.editArray);
              }
            }
          }
          return true;
        }
      });

    }


    public validateGrid(object: any, schema: any) {
      var errors = Object.keys(schema).map(function(property) {
        var validator = schema[property];

        return [property, validator(object[property])];
      }).reduce(function(errors, pair) {
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
    }


    public checkDuplicates(rId: any, cInd: any, nvalue: any) {
      this.mygrid.forEachRow((id: any) => {
        if (this.mygrid.cellById(id, cInd).getValue() == nvalue && rId != id) {
          dhtmlx.alert("Duplicate entries not allowed");
          return true;
        }
      });
      return false;
    }


    public createForm(): any {
      this.myWins = new dhtmlXWindows();
      this.win = this.myWins.createWindow("form", 500, 500, 400, 400);
      this.win.center();
      this.myWins.window("form").setText("DETAILS FORM");
      Contacts.myForm = this.win.attachForm();
      Contacts.myForm.loadStruct("EmployeeAction.do?action=loadEmployeeForm");
      Contacts.myForm.enableLiveValidation(true);
      Contacts.myForm.attachEvent("onButtonClick", (id: any) => {
        if (id == "submit") {
          //if (Contacts.myForm.validate() && this.checkFormDuplicates(Contacts.myForm.getItemValue("name"))) {
          if (Contacts.myForm.validate()) {
            this.loadForm();
          }
          else {
            this.warningMessage();
          }
        }
        else {
          Contacts.myForm.clear();
        }
      });
    }


    public loadGrid() {
      this.mygrid.clearAndLoad("EmployeeAction.do?action=getEmployee");
    }


    public loadForm() {
      Contacts.myForm.send("EmployeeAction.do?action=setEmployee", "POST", (response: boolean) => {
        if (response) {
          this.win.close();
          this.successMessage();
          this.loadGrid();
        }
        else {
          dhtmlx.message("Data load failed");
        }
      });

    }


    public toolBar() {
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
      this.toolbar.attachEvent("onClick", (id: any) => {
        if (id == "add") {
          this.createForm();
        }
        else if (id == "del") {
          this.deleteItem();
        }
        else if (id == "edit") {
          this.toolbar.hideItem("add");
          this.toolbar.hideItem("edit");
          this.toolbar.hideItem("del");
          this.toolbar.showItem("save");
          this.toolbar.showItem("canc");
          this.enableEdit = true;
          dhtmlx.message("Edit");
        } else if (id == "save") {
          dhtmlx.message("save");
          this.doSave();
          this.enableEdit = false;
        } else if (id == "canc") {
          this.toolbar.showItem("add");
          this.toolbar.showItem("edit");
          this.toolbar.showItem("del");
          this.toolbar.hideItem("save");
          this.toolbar.hideItem("canc");
          this.loadGrid();
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
    }


    public deleteItem(): any {
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
        callback: (res: any) => {
          if (res) {
            this.mygrid.deleteRow(rowId);
            if (rowId != 0) {
              dhx.ajax.getSync("EmployeeAction.do?action=removeEmployee&id=" + rowId);
            }
          }
          else {
            this.loadGrid();
          }
        }
      });
    }


    public doSave() {
      var stringifiedArray = JSON.stringify(this.editArray);
      console.log(stringifiedArray);
      dhx.ajax.postSync("EmployeeAction.do?action=saveUpdates&array=" + stringifiedArray);
      this.toolbar.showItem("add");
      this.toolbar.showItem("edit");
      this.toolbar.showItem("del");
      this.toolbar.hideItem("save");
      this.toolbar.hideItem("canc");
      this.loadGrid();
    }


    public successMessage(): any {
      dhtmlx.alert({
        type: "successful",
        text: "Data is saved",
        title: "Success!",
      });
    }


    public warningMessage(): any {
      dhtmlx.alert({
        type: "alert-error",
        text: "Invalid Operation",
        title: "Error!",
        ok: "Okay"
      });
    }

  }



  export class ChildClass extends Contacts {
    constructor(obj: any) {
      super(obj);
    }
  }
}
