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
var myTree;
var grid1;
var grid2;
var grid3;
var mainCellB;
var cellBLayout;
var gridsLayout;
var dataViewCell;
var dhtmlXDataView;
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var customersApp;
        (function (customersApp) {
            var Parents = /** @class */ (function () {
                function Parents(mainLayoutObj) {
                    this.createTree(mainLayoutObj);
                    this.createGrids(mainLayoutObj);
                }
                Parents.prototype.createTree = function (mainLayoutObj) {
                    var _this = this;
                    mainLayoutObj.cell.cells("a").setText("Customers Tree");
                    myTree = mainLayoutObj.cell.cells("a").attachTree("0");
                    myTree.setImagePath("./codebase/imgs/dhxtree_material/");
                    myTree.load("CustomerAction.do?action=loadCustomersNames");
                    myTree.attachEvent("onClick", function (id) {
                        _this.loadGrid1(id);
                        dataViewCell.clearAll();
                        _this.loadDataView(id);
                    });
                };
                Parents.prototype.createGrids = function (mainLayoutObj) {
                    var _this = this;
                    mainCellB = mainLayoutObj.cell.cells("b");
                    cellBLayout = mainCellB.attachLayout("2E");
                    console.log(mainCellB);
                    console.log(cellBLayout);
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
                    grid1.attachEvent("onRowSelect", function (id) {
                        _this.grid1Id = id;
                        _this.loadGrid2();
                    });
                    grid1.init();
                };
                Parents.prototype.loadGrid1 = function (id) {
                    if (id != "0" && id != "customers") {
                        this.customersId = id;
                        grid1.clearAndLoad("CustomerAction.do?action=loadOrders&id=" + id);
                    }
                };
                Parents.prototype.loadDataView = function (id) {
                    var r = dhx.ajax.getSync("CustomerAction.do?action=getCount&id=" + id);
                    console.log(r);
                    var resultOfCounts = JSON.parse(r.xmlDoc.response);
                    var obj1 = {
                        name: "OrdersCount",
                        count: resultOfCounts.ordersCount
                    };
                    var obj2 = {
                        name: "ProductsCount",
                        count: resultOfCounts.productsCount
                    };
                    var obj3 = {
                        name: "SuppliersCount",
                        count: resultOfCounts.suppliersCount
                    };
                    var objArray = [];
                    objArray.push(obj1);
                    objArray.push(obj2);
                    objArray.push(obj3);
                    dataViewCell.parse(objArray, "json");
                };
                Parents.prototype.loadGrid2 = function () {
                    var _this = this;
                    grid2 = gridsLayout.cells("b").attachGrid();
                    console.log(grid2);
                    grid2.setImagePath("./codebase/imgs/");
                    grid2.setHeader("Sno,Order ID, Product Name,Quantity,Unit Price,Order ID");
                    grid2.setInitWidths("100,100,200,150");
                    grid2.setColAlign("left,left,left,left,left,left");
                    grid2.setColTypes("ro,ro,ro,ro,ro,ro");
                    grid2.enableValidation(true);
                    grid2.enableAutoWidth(true);
                    grid2.attachEvent("onRowSelect", function (id) {
                        _this.grid2Id = id;
                        _this.loadGrid3();
                    });
                    grid2.init();
                    grid2.clearAndLoad("CustomerAction.do?action=loadProducts&productId=" + this.grid1Id);
                };
                Parents.prototype.loadGrid3 = function () {
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
                };
                return Parents;
            }());
            customersApp.Parents = Parents;
            var Childs = /** @class */ (function (_super) {
                __extends(Childs, _super);
                function Childs(mainLayoutObj) {
                    return _super.call(this, mainLayoutObj) || this;
                }
                return Childs;
            }(Parents));
            customersApp.Childs = Childs;
        })(customersApp = erwin.customersApp || (erwin.customersApp = {}));
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=tree_grids.js.map