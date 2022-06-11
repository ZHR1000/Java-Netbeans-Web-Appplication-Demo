declare var dhtmlXGridObject: any;
declare var dhtmlXLayoutObject: any;
declare var dhtmlx: any;
declare var dhx: any;

var myTree: any;

var mainCellB: any;
var cellBLayout: any;

module com.erwin.expandTreeApp {

  export class ParentClass {
    static selectedId: any;

    constructor(mainLayoutObj: any) {
      this.createTree(mainLayoutObj);
    }

    public createTree(mainLayoutObj: any) {
      mainLayoutObj.cell.cells("a").setText("Customers Expand Tree")
      myTree = mainLayoutObj.cell.cells("a").attachTree("-1");
      myTree.setImagePath("./codebase/imgs/dhxtree_material/");
      //myTree.load("./data/tree.xml");
      myTree.setXMLAutoLoading("ExpandTreeAction.do?action=expandEmployeeNames");
      //  myTree.load("ExpandTreeAction.do?action=expandEmployeeNames&id=-1", "xml");

      var json = dhx.ajax.getSync("ExpandTreeAction.do?action=expandEmployeeNames&id=" + -1);
      console.log(JSON.parse(json.xmlDoc.responseText));
      //myTree.insertNewChild(-1, 1, "New");
      var parsedResponse = JSON.parse(json.xmlDoc.responseText);
      for (let i = 0; i < parsedResponse.length; i++) {
        myTree.insertNewChild(-1, parsedResponse[i].id, parsedResponse[i].name);
      }
      // myTree.enableThreeStateCheckboxes(true);
      // this.expandTree("-1");
      myTree.attachEvent("onSelect", (id: any) => {
        ParentClass.selectedId = id;
        this.expandTree(id);
      });
    }

    public expandTree(id: any) {
      myTree.deleteChildItems(id);
      var response = dhx.ajax.getSync("ExpandTreeAction.do?action=expandEmployeeNames&id=" + id);
      console.log(response);
      var parsedResponse = JSON.parse(response.xmlDoc.response);
      for (let i = 0; i < parsedResponse.length; i++) {
        myTree.insertNewChild(id, parsedResponse[i].id, parsedResponse[i].name);
      }
      //myTree.load("ExpandTreeAction.do?action=expandEmployeeNames&id=" + id, "xml")
      //if (myTree.hasChildren(id)) {
      // console.log(myTree.getAllFatItems())
      //myTree.openItem(myTree.getSelectedItemId());
      //}
      //myTree.load("ExpandTreeAction.do?action=expandEmployeeNames&id=" + id);
    }
  }

  export class ChildClass extends ParentClass {
    constructor(mainLayoutObj: any) {
      super(mainLayoutObj);
    }
  }
}
