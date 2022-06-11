declare var dhtmlXGridObject: any;
declare var dhtmlXLayoutObject: any;
declare var dhtmlXForm: any
declare var dhtmlx: any;
declare var dhx: any;
declare var dhtmlXWindows: any;

var dhtmlXCombo: any;

module com.erwin {
  class Parent {
    public myWins: any;
    public win: any;
    static myGrid: any;
    public childGrid: any;
    public childGridToolbar: any;
    public editArray: any;
    public toolbar_1: any;
    public a: any;
    public grid1: any
    public languageParam = {
      country: "US"
    }
    public langJSON: any = {};
    public layoutObj: any;
    constructor(layoutObj: any) {
      this.layoutObj = layoutObj;
      //this.getLanguage(this.languageParam);


    }

    public getLanguage(json: any) {
      dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(json)), (resp: any) => {
        this.langJSON = JSON.parse(resp.xmlDoc.responseText);
        console.log(resp.xmlDoc.responseText);
        this.createGrid(this.layoutObj);
      });
    }

    public createGrid(layoutObj: any) {
      this.a = layoutObj.cell.cells("a");
      console.log(this.langJSON)
      this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");
      this.grid1 = this.a.attachGrid();
      this.grid1.setImagePath("./codebase/imgs/");
      this.grid1.setHeader("Id,Name,Contact,Email");
      this.grid1.setInitWidths("100,100,100,100");
      this.loadGrid();
      this.grid1.init();
      this.toolbar_1 = this.a.attachToolbar();
      //  this.toolbar_1.setIconsPath('./codebase/imgs/');
      console.log("hi" + this.toolbar_1)
      this.toolbar_1.addButton("eng", 1, this.langJSON.ENGLISH);
      this.toolbar_1.addButton("hin", 2, this.langJSON.HINDI);
      this.toolbar_1.addButton("chi", 3, this.langJSON.CHINESE);

      this.toolbar_1.attachEvent("onClick", (id: any) => {
        if (id == "eng") {
          this.languageParam.country = "US"
          dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(this.languageParam)), (resp: any) => {
            this.langJSON = JSON.parse(resp.xmlDoc.responseText);
            console.log(resp.xmlDoc.responseText);
          })
          this.toolbar_1.setItemText("eng", this.langJSON.ENGLISH)
          this.toolbar_1.setItemText("hin", this.langJSON.HINDI)
          this.toolbar_1.setItemText("chi", this.langJSON.CHINESE)

          this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");
        }
        else if (id == "hin") {
          this.languageParam.country = "IN";
          dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(this.languageParam)), (resp: any) => {
            this.langJSON = JSON.parse(resp.xmlDoc.responseText);
            console.log(resp.xmlDoc.responseText);
          })
          console.log(this.langJSON.Name + "hgjgjg")
          // this.toolbar_1.setItemText("eng", this.langJSON.ENGLISH);
          // this.toolbar_1.setItemText("hin", this.langJSON.HINDI)
          // this.toolbar_1.setItemText("chi", this.langJSON.CHINESE)
          // this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");0.
        }
        else if (id == "chi") {
          this.languageParam.country = "CH";
          dhx.ajax.get("MultilanguageAction.do?action=getLang&param=" + encodeURIComponent(JSON.stringify(this.languageParam)), (resp: any) => {
            this.langJSON = JSON.parse(resp.xmlDoc.responseText);
            console.log(resp.xmlDoc.responseText);
          })
          // this.toolbar_1.setItemText("eng", this.langJSON.ENGLISH);
          // this.toolbar_1.setItemText("hin", this.langJSON.HINDI)
          // this.toolbar_1.setItemText("chi", this.langJSON.CHINESE)
          // this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");

        }
        this.toolbar_1.setItemText("eng", this.langJSON.ENGLISH);
        this.toolbar_1.setItemText("hin", this.langJSON.HINDI)
        this.toolbar_1.setItemText("chi", this.langJSON.CHINESE)
        this.a.setText("<span style='color:black;'><b>" + this.langJSON.TITLE + "<b></span>");
        this.grid1.setHeader(this.langJSON.Id, this.langJSON.Name, this.langJSON.Contact, this.langJSON.Email);
        //this.getLanguage(this.languageParam);
        // var stringifiedlanguage = JSON.stringify(this.languageParam);
        // dhx.ajax.postSync("MultilanguageAction.do?action=getLang&param=" + stringifiedlanguage), (res: any) => {
        //   this.loadGrid();
        // }
      });

    }


    // public doSave() {
    //   var stringifiedArray = JSON.stringify(this.editArray);
    //   console.log(stringifiedArray);
    //   dhx.ajax.postSync("FormGridAction.do?action=saveUpdates&array=" + stringifiedArray);
    //   this.loadGrid();
    // }

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
        callback: (res: any) => {
          if (res) {
            this.grid1.deleteRow(rowId);
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
      this.grid1.clearAndLoad("MultilanguageAction.do?action=getData");
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
