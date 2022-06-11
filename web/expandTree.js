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
var mainCellB;
var cellBLayout;
var com;
(function (com) {
    var erwin;
    (function (erwin) {
        var expandTreeApp;
        (function (expandTreeApp) {
            var ParentClass = /** @class */ (function () {
                function ParentClass(mainLayoutObj) {
                    this.createTree(mainLayoutObj);
                }
                ParentClass.prototype.createTree = function (mainLayoutObj) {
                    var _this = this;
                    mainLayoutObj.cell.cells("a").setText("Customers Expand Tree");
                    myTree = mainLayoutObj.cell.cells("a").attachTree("-1");
                    myTree.setImagePath("./codebase/imgs/dhxtree_material/");
                    //myTree.load("./data/tree.xml");
                    myTree.setXMLAutoLoading("ExpandTreeAction.do?action=expandEmployeeNames");
                    //  myTree.load("ExpandTreeAction.do?action=expandEmployeeNames&id=-1", "xml");
                    var json = dhx.ajax.getSync("ExpandTreeAction.do?action=expandEmployeeNames&id=" + -1);
                    console.log(JSON.parse(json.xmlDoc.responseText));
                    //myTree.insertNewChild(-1, 1, "New");
                    var parsedResponse = JSON.parse(json.xmlDoc.responseText);
                    for (var i = 0; i < parsedResponse.length; i++) {
                        myTree.insertNewChild(-1, parsedResponse[i].id, parsedResponse[i].name);
                    }
                    // myTree.enableThreeStateCheckboxes(true);
                    // this.expandTree("-1");
                    myTree.attachEvent("onSelect", function (id) {
                        ParentClass.selectedId = id;
                        _this.expandTree(id);
                    });
                };
                ParentClass.prototype.expandTree = function (id) {
                    myTree.deleteChildItems(id);
                    var response = dhx.ajax.getSync("ExpandTreeAction.do?action=expandEmployeeNames&id=" + id);
                    console.log(response);
                    var parsedResponse = JSON.parse(response.xmlDoc.response);
                    for (var i = 0; i < parsedResponse.length; i++) {
                        myTree.insertNewChild(id, parsedResponse[i].id, parsedResponse[i].name);
                    }
                    //myTree.load("ExpandTreeAction.do?action=expandEmployeeNames&id=" + id, "xml")
                    //if (myTree.hasChildren(id)) {
                    // console.log(myTree.getAllFatItems())
                    //myTree.openItem(myTree.getSelectedItemId());
                    //}
                    //myTree.load("ExpandTreeAction.do?action=expandEmployeeNames&id=" + id);
                };
                return ParentClass;
            }());
            expandTreeApp.ParentClass = ParentClass;
            var ChildClass = /** @class */ (function (_super) {
                __extends(ChildClass, _super);
                function ChildClass(mainLayoutObj) {
                    return _super.call(this, mainLayoutObj) || this;
                }
                return ChildClass;
            }(ParentClass));
            expandTreeApp.ChildClass = ChildClass;
        })(expandTreeApp = erwin.expandTreeApp || (erwin.expandTreeApp = {}));
    })(erwin = com.erwin || (com.erwin = {}));
})(com || (com = {}));
//# sourceMappingURL=expandTree.js.map