declare var dhtmlXGridObject: any;
declare var dhtmlXLayoutObject: any;
declare var dhtmlXForm: any
declare var dhtmlx: any;
declare var dhx: any;
declare var dhtmlXWindows: any;
var grid1: any;
var a: any;
var dhtmlXCombo: any;

module com.erwin.formgrid {
  export class Parent {
    public myWins: any;
    public win: any;
    static myGrid: any;
    public childGrid: any;
    public childGridToolbar: any;
    public editArray: any;
    constructor(layoutObj: any) {

      this.createGrid(layoutObj);

    }

    public createGrid(layoutObj: any) {
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

      toolbar_1.attachEvent("onClick", (id: any) => {
        if (id == "add") {
          this.createInnerGrid();
        }

        else if (id == "delete") {
          this.deleteItem();
        }
        else {
          dhtmlx.message("Data load failed");
        }
      });
    }


    public doSave() {
      var stringifiedArray = JSON.stringify(this.editArray);
      console.log(stringifiedArray);
      dhx.ajax.postSync("FormGridAction.do?action=saveUpdates&array=" + stringifiedArray);
      this.loadGrid();
    }

    public createInnerGrid() {

      this.myWins = new dhtmlXWindows();
      this.win = this.myWins.createWindow("form", 500, 500, 400, 400);
      this.win.center();
      this.myWins.window("form").setText("DETAILS FORM");
      this.childGrid = this.win.attachGrid();
      this.childGridToolbar = this.win.attachToolbar();
      this.childGridToolbar.addButton("addChild", 0, "ADD");

      this.childGridToolbar.attachEvent("onClick", (id: any) => {
        if (id == "addChild") {
          var obj = {
            name: this.childGrid.cellById(0, 1).getValue(),
            type: this.childGrid.cellById(1, 1).getValue(),
            value: this.childGrid.cellById(2, 1).getValue()
          }

          var stringifiedObj = encodeURIComponent(JSON.stringify(obj));
          console.log(stringifiedObj);
          dhx.ajax.postSync("FormGridAction.do?action=insertData&obj=" + stringifiedObj);
          this.loadGrid();
          this.win.close();
          dhtmlx.message("Grid Values Successfully Stored!!")
        }

      });

      this.childGrid.init();

      this.childGrid.load("FormGridAction.do?action=loadInnerGrid");
      this.childGrid.attachEvent("onEditCell", (stage: any, rId: any, cInd: any, nvalue: any) => {
        if (stage == 2) {
          console.log(rId + "," + cInd + "," + nvalue);
          if (rId == 1 && cInd == 1) {
            this.childGrid.setCellExcellType(2, 1, nvalue);
          }
        }
        return true;
      });
    }


    public deleteItem(): any {
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
        callback: (res: any) => {
          if (res) {
            grid1.deleteRow(rowId);
            if (rowId != 0) {
              dhx.ajax.postSync("FormGridAction.do?action=removeItem&id=" + rowId);
            }
          }
          else {
            this.loadGrid();
          }
        }
      });
    }

    public loadGrid() {
      grid1.clearAndLoad("FormGridAction.do?action=getData");
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

  export class Child extends Parent {
    constructor(obj: any) {
      super(obj);
    }
  }
}
