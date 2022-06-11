declare var dhtmlXGridObject: any;
declare var dhtmlXLayoutObject: any;
declare var dhtmlx: any;
declare var dhx: any;
declare var toolbar_1: any;
var myForm: any;
var grid_1: any;
var grid_2: any;
var grid_3: any;

module com.erwin.metadataApp {

  export class ParentClass {
    static myForm: any;
    public myWins: any;
    public win: any;
    public a: any;
    public b: any;
    public c: any;

    public grid_1: any;
    public grid_2: any;
    public grid_3: any;

    constructor(mainLayoutObj: any) {
      this.createGrids(mainLayoutObj);
      this.createToolbar(mainLayoutObj);
    }

    public createToolbar(mainLayoutObj: any) {
      var toolbar_1 = mainLayoutObj.cell.attachToolbar();
      toolbar_1.setIconsPath('./codebase/imgs/');

      toolbar_1.loadStruct('<toolbar><item type="button" id="btn1" text="GRID 1" /><item type="button" id="btn2" text="GRID 2" /><item type="button" id="compare" text="COMPARE" /></toolbar>', function() { });

      toolbar_1.attachEvent("onClick", (id: any) => {
        this.perform(id);
      });
    }
    public createGrids(mainLayoutObj: any) {
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
    }

    public perform(id: any) {
      if (id == "btn1") {
        this.loadForm(id);

      }
      else if (id == "btn2") {
        this.loadForm(id);
      }
      else if (id == "compare") {
        this.compareGrids();
      }
    }

    public loadForm(btnId: any) {
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
      ParentClass.myForm.attachEvent("onButtonClick", (id: any) => {
        if (id == "submit") {
          ParentClass.myForm.send("MetadataAction.do?action=loadDetails", "POST", (response: boolean) => {
            //var result = JSON.parse(r.xmlDoc.responseText);
            if (response) {
              if (btnId == "btn1") {
                this.loadGrid1();
              }
              else if (btnId = "btn2") {
                this.loadGrid2();
              }
            }
            this.win.close();
          });
        }
        else if (id == "reset") {
          ParentClass.myForm.clear();
        }
      })
    }


    public loadGrid1() {
      this.grid_1.clearAndLoad("MetadataAction.do?action=loadGrid1");
    }

    public loadGrid2() {
      this.grid_2.clearAndLoad("MetadataAction.do?action=loadGrid2");
    }

    public compareGrids() {
      this.grid_3.clearAndLoad("MetadataAction.do?action=loadGrid3");
    }

  }


  export class ChildClass extends ParentClass {
    constructor(mainLayoutObj: any) {
      super(mainLayoutObj);
    }
  }
}
