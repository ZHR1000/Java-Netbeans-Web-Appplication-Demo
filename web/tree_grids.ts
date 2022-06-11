declare var dhtmlXGridObject: any;
declare var dhtmlXLayoutObject: any;
declare var dhtmlXForm: any
declare var dhtmlx: any;
declare var dhx: any;
declare var dhtmlXWindows: any;
var myTree: any;
var grid1: any;
var grid2: any;
var grid3: any;
var mainCellB: any;
var cellBLayout: any;
var gridsLayout: any;
var dataViewCell: any;
var dhtmlXDataView: any;



module com.erwin.customersApp {

  export class Parents {
    static selectedId: any;
    public customersId: any;
    public grid1Id: any;
    public grid2Id: any;
    constructor(mainLayoutObj: any) {
      this.createTree(mainLayoutObj);
      this.createGrids(mainLayoutObj);

    }
    public createTree(mainLayoutObj: any) {
      mainLayoutObj.cell.cells("a").setText("Customers Tree")
      myTree = mainLayoutObj.cell.cells("a").attachTree("0");
      myTree.setImagePath("./codebase/imgs/dhxtree_material/");
      myTree.load("CustomerAction.do?action=loadCustomersNames");
      myTree.attachEvent("onClick", (id: any) => {
        this.loadGrid1(id);
        dataViewCell.clearAll();
        this.loadDataView(id);
      });
    }

    public createGrids(mainLayoutObj: any) {
      mainCellB = mainLayoutObj.cell.cells("b");
      cellBLayout = mainCellB.attachLayout("2E");
      console.log(mainCellB)
      console.log(cellBLayout)
      dataViewCell = cellBLayout.cells("a").attachDataView({
        template: "#name#<br>#count#",
      });

      gridsLayout = cellBLayout.cells("b").attachLayout("3E");
      grid1 = gridsLayout.cells("a").attachGrid();
      grid1.setImagePath("./codebase/imgs/");
      grid1.setHeader("Sno,Order Id,OrderNumber,TotalAmount");
      grid1.setInitWidths("100,100,150,150,100");
      grid1.setColAlign("left,left,left,left,left");
      grid1.setColTypes("ro,ro,ro,ro");
      grid1.enableValidation(true);
      grid1.attachEvent("onRowSelect", (id: any) => {
        this.grid1Id = id;
        this.loadGrid2();
      });
      grid1.init();
    }

    public loadGrid1(id: any) {
      if (id != "0" && id != "customers") {
        this.customersId = id;
        grid1.clearAndLoad("CustomerAction.do?action=loadOrders&id=" + id);

      }
    }

    public loadDataView(id: any) {
      var r = dhx.ajax.getSync("CustomerAction.do?action=getCount&id=" + id);
      console.log(r);
      var resultOfCounts = JSON.parse(r.xmlDoc.response);
      let obj1 = {
        name: "OrdersCount",
        count: resultOfCounts.ordersCount
      }

      let obj2 = {
        name: "ProductsCount",
        count: resultOfCounts.productsCount
      }

      let obj3 = {
        name: "SuppliersCount",
        count: resultOfCounts.suppliersCount
      }

      let objArray = [];
      objArray.push(obj1);
      objArray.push(obj2);
      objArray.push(obj3);

      dataViewCell.parse(objArray, "json");
    }

    public loadGrid2() {
      grid2 = gridsLayout.cells("b").attachGrid();
      console.log(grid2);
      grid2.setImagePath("./codebase/imgs/");
      grid2.setHeader("Sno,Order ID, Product Name,Quantity,Unit Price,Order ID");
      grid2.setInitWidths("100,100,200,150");
      grid2.setColAlign("left,left,left,left,left,left");
      grid2.setColTypes("ro,ro,ro,ro,ro,ro");
      grid2.enableValidation(true);
      grid2.enableAutoWidth(true);

      grid2.attachEvent("onRowSelect", (id: any) => {
        this.grid2Id = id;
        this.loadGrid3();
      });
      grid2.init();
      grid2.clearAndLoad("CustomerAction.do?action=loadProducts&productId=" + this.grid1Id);
    }

    public loadGrid3() {
      grid3 = gridsLayout.cells("c").attachGrid();
      grid3.setImagePath("./codebase/imgs/");
      grid3.setHeader("Sno,Supplier ID, Company Name,Phone Number");
      grid3.setInitWidths("100,100,200,150");
      grid3.setColAlign("left,left,left,left,left");
      grid3.setColTypes("ro,ro,ro,ro,ro");
      grid3.enableValidation(true);
      grid3.enableAutoWidth(true);
      console.log(this.grid2Id);
      grid3.init();
      grid3.clearAndLoad("CustomerAction.do?action=loadSuppliers&supplierId=" + this.grid2Id);
    }
  }

  export class Childs extends Parents {
    constructor(mainLayoutObj: any) {
      super(mainLayoutObj);
    }
  }
}
