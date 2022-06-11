var myDiagram = null;

function doInit() {

  var $ = go.GraphObject.make; // for conciseness in defining templates

  myDiagram =
    $(go.Diagram, "myDiagram", // create a Diagram for the DIV HTML element
      {
        maxSelectionCount: 1, // users can select only one part at a time
        validCycle: go.Diagram.CycleDestinationTree, // make sure users can only create trees
        "clickCreatingTool.archetypeNodeData": { // allow double-click in background to create a new node
          name: "(new person)",
          title: "",
          comments: ""
        },
        "clickCreatingTool.insertPart": function(loc) { // scroll to the new node
          var node = go.ClickCreatingTool.prototype.insertPart.call(this, loc);
          if (node !== null) {
            this.diagram.select(node);
            this.diagram.commandHandler.scrollToPart(node);
            this.diagram.commandHandler.editTextBlock(node.findObject("NAMETB"));
          }
          return node;
        },
        layout: $(go.TreeLayout, {
          treeStyle: go.TreeLayout.StyleLastParents,
          arrangement: go.TreeLayout.ArrangementHorizontal,
          // properties for most of the tree:
          angle: 90,
          layerSpacing: 35,
          // properties for the "last parents":
          alternateAngle: 90,
          alternateLayerSpacing: 35,
          alternateAlignment: go.TreeLayout.AlignmentBus,
          alternateNodeSpacing: 20
        }),
        "undoManager.isEnabled": true // enable undo & redo
      });

  // when the document is modified, add a "*" to the title and enable the "Save" button
  myDiagram.addDiagramListener("Modified", function(e) {
    var button = document.getElementById("SaveButton");
    if (button) button.disabled = !myDiagram.isModified;
    var idx = document.title.indexOf("*");
    if (myDiagram.isModified) {
      if (idx < 0) document.title += "*";
    } else {
      if (idx >= 0) document.title = document.title.substr(0, idx);
    }
  });

  // manage boss info manually when a node or link is deleted from the diagram
  myDiagram.addDiagramListener("SelectionDeleting", function(e) {
    var part = e.subject.first(); // e.subject is the myDiagram.selection collection,
    // so we'll get the first since we know we only have one selection
    myDiagram.startTransaction("clear boss");
    if (part instanceof go.Node) {
      var it = part.findTreeChildrenNodes(); // find all child nodes
      while (it.next()) { // now iterate through them and clear out the boss information
        var child = it.value;
        var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
        if (bossText === null) return;
        bossText.text = "";
      }
    } else if (part instanceof go.Link) {
      var child = part.toNode;
      var bossText = child.findObject("boss"); // since the boss TextBlock is named, we can access it by name
      if (bossText === null) return;
      bossText.text = "";
    }
    myDiagram.commitTransaction("clear boss");
  });

  // when a node is double-clicked, add a child to it
  function nodeDoubleClick(e, obj) {
    var clicked = obj.part;
    if (clicked !== null) {
      var thisemp = clicked.data;
      myDiagram.startTransaction("add employee");
      var newemp = {
        name: "(new person)",
        title: "",
        comments: "",
        parent: thisemp.key
      };
      myDiagram.model.addNodeData(newemp);
      myDiagram.commitTransaction("add employee");
    }
  }


  // this is used to determine feedback during drags
  function mayWorkFor(node1, node2) {
    if (!(node1 instanceof go.Node)) return false; // must be a Node
    if (node1 === node2) return false; // cannot work for yourself
    if (node2.isInTreeOf(node1)) return false; // cannot work for someone who works for you
    return true;
  }


  // This function provides a common style for most of the TextBlocks.
  // Some of these values may be overridden in a particular TextBlock.
  function textStyle() {
    return {
      font: "9pt  Segoe UI,sans-serif",
      stroke: "white"
    };
  }

  // This converter is used by the Picture.
  function findHeadShot(key) {
    if (key < 1 || key > 20) return "pictures/HSnopic.png"; // There are only 16 images on the server
    return "pictures/" + key + ".jpg"
  }


  // define a simple Node template
  myDiagram.nodeTemplate =
    $(go.Node, "Auto", {
        doubleClick: nodeDoubleClick
      }, { // handle dragging a Node onto a Node to (maybe) change the reporting relationship
        mouseDragEnter: function(e, node, prev) {
          var diagram = node.diagram;
          var selnode = diagram.selection.first();
          if (!mayWorkFor(selnode, node)) return;
          var shape = node.findObject("SHAPE");
          if (shape) {
            shape._prevFill = shape.fill; // remember the original brush
            shape.fill = "darkred";
          }
        },
        mouseDragLeave: function(e, node, next) {
          var shape = node.findObject("SHAPE");
          if (shape && shape._prevFill) {
            shape.fill = shape._prevFill; // restore the original brush
          }
        },
        mouseDrop: function(e, node) {
          var diagram = node.diagram;
          var selnode = diagram.selection.first(); // assume just one Node in selection
          if (mayWorkFor(selnode, node)) {
            // find any existing link into the selected node
            var link = selnode.findTreeParentLink();
            if (link !== null) { // reconnect any existing link
              link.fromNode = node;
            } else { // else create a new link
              diagram.toolManager.linkingTool.insertLink(node, node.port, selnode, selnode.port);
            }
          }
        }
      },
      // for sorting, have the Node.text be the data.name
      new go.Binding("text", "name"),
      // bind the Part.layerName to control the Node's layer depending on whether it isSelected
      new go.Binding("layerName", "isSelected", function(sel) {
        return sel ? "Foreground" : "";
      }).ofObject(),
      // define the node's outer shape
      $(go.Shape, "RoundedRectangle", {
        name: "SHAPE",
        fill: "white",
        stroke: null,
        // set the port properties:
        portId: "",
        fromLinkable: true,
        toLinkable: true,
        cursor: "pointer"
      }),
      $(go.Panel, "Horizontal",
        $(go.Picture, {
            name: "Picture",
            desiredSize: new go.Size(50, 50),
            margin: new go.Margin(6, 8, 6, 10),
          },
          new go.Binding("source", "key", findHeadShot)),
        // define the panel where the text will appear
        $(go.Panel, "Table", {
            maxSize: new go.Size(150, 999),
            margin: new go.Margin(6, 10, 0, 3),
            defaultAlignment: go.Spot.Left
          },
          $(go.RowColumnDefinition, {
            column: 2,
            width: 4
          }),
          $(go.TextBlock, textStyle(), // the name
            {
              row: 0,
              column: 0,
              columnSpan: 5,
              font: "12pt Segoe UI,sans-serif",
              editable: true,
              isMultiline: false,
              minSize: new go.Size(10, 16)
            },
            new go.Binding("text", "name").makeTwoWay()),
          $(go.TextBlock, "Title: ", textStyle(), {
            row: 1,
            column: 0
          }),
          $(go.TextBlock, textStyle(), {
              row: 1,
              column: 1,
              columnSpan: 4,
              editable: true,
              isMultiline: false,
              minSize: new go.Size(10, 14),
              margin: new go.Margin(0, 0, 0, 3)
            },
            new go.Binding("text", "title").makeTwoWay()),
          $(go.TextBlock, textStyle(), {
              row: 2,
              column: 0
            },
            new go.Binding("text", "key", function(v) {
              return "ID: " + v;
            })),
          $(go.TextBlock, textStyle(), {
              name: "boss",
              row: 2,
              column: 3,
            }, // we include a name so we can access this TextBlock when deleting Nodes/Links
            new go.Binding("text", "parent", function(v) {
              return "Boss: " + v;
            })),
          $(go.TextBlock, textStyle(), // the comments
            {
              row: 3,
              column: 0,
              columnSpan: 5,
              font: "italic 9pt sans-serif",
              wrap: go.TextBlock.WrapFit,
              editable: true, // by default newlines are allowed
              minSize: new go.Size(10, 14)
            },
            new go.Binding("text", "comments").makeTwoWay())
        ) // end Table Panel
      ) // end Horizontal Panel
    ); // end Node

  // the context menu allows users to make a position vacant,
  // remove a role and reassign the subtree, or remove a department
  myDiagram.nodeTemplate.contextMenu =
    $(go.Adornment, "Horizontal",
      $("ContextMenuButton",
        $(go.TextBlock, "Vacate Position"), {
          click: function(e, obj) {
            var node = obj.part.adornedPart;
            if (node !== null) {
              var thisemp = node.data;
              myDiagram.startTransaction("vacate");
              // update the key, name, and comments
              myDiagram.model.setDataProperty(thisemp, "name", "(Vacant)");
              myDiagram.model.setDataProperty(thisemp, "comments", "");
              myDiagram.commitTransaction("vacate");
            }
          }
        }
      ),
      $("ContextMenuButton",
        $(go.TextBlock, "Remove Role"), {
          click: function(e, obj) {
            // reparent the subtree to this node's boss, then remove the node
            var node = obj.part.adornedPart;
            if (node !== null) {
              myDiagram.startTransaction("reparent remove");
              var chl = node.findTreeChildrenNodes();
              // iterate through the children and set their parent key to our selected node's parent key
              while (chl.next()) {
                var emp = chl.value;
                myDiagram.model.setParentKeyForNodeData(emp.data, node.findTreeParentNode().data.key);
              }
              // and now remove the selected node itself
              myDiagram.model.removeNodeData(node.data);
              myDiagram.commitTransaction("reparent remove");
            }
          }
        }
      ),
      $("ContextMenuButton",
        $(go.TextBlock, "Remove Department"), {
          click: function(e, obj) {
            // remove the whole subtree, including the node itself
            var node = obj.part.adornedPart;
            if (node !== null) {
              myDiagram.startTransaction("remove dept");
              myDiagram.removeParts(node.findTreeParts());
              myDiagram.commitTransaction("remove dept");
            }
          }
        }
      )
    );


  myDiagram.linkTemplate =
    $(go.Link, {
        routing: go.Link.AvoidsNodes,
        corner: 5,
        relinkableFrom: true,
        relinkableTo: true
      }, // link route should avoid nodes

      $(go.Shape, {
          strokeWidth: 4
        },
        new go.Binding("stroke", "color"),

      ),
      $(go.Shape, {
        toArrow: "Standard",
        stroke: null
      }),
      new go.Binding("stroke", "color")
    );





  var levelColors = ["Red", "Cyan", "Black", "Orange",
    "Lavender", "Tan", "Gray", "Violet"
  ];


  // override TreeLayout.commitNodes to also modify the background brush based on the tree depth level
  myDiagram.layout.commitNodes = function() {
    go.TreeLayout.prototype.commitNodes.call(myDiagram.layout); // do the standard behavior
    // then go through all of the vertexes and set their corresponding node's Shape.fill
    // to a brush dependent on the TreeVertex.level value
    myDiagram.layout.network.vertexes.each(function(v) {
      if (v.node) {
        var level = v.level % (levelColors.length);
        console.log(level)
        var color = levelColors[level];
        var shape = v.node.findObject("SHAPE");
        if (shape) shape.fill = $(go.Brush, "Linear", {
          0: color,
          1: "Maroon",
          start: go.Spot.Left,
          end: go.Spot.Right
        });
      }
    });
  };



  // create the model data that will be represented by Nodes and Links
  myDiagram.model = new go.GraphLinksModel(
    [{
        key: 1,
        name: "Rahim",
        title: "Manager"
      },
      {
        key: 2,
        name: "Sha",
        title: "Senior Engineer(L-1)",
        parent: 1
      },
      {
        key: 3,
        name: "Basker",
        title: "Senior Engineer(L-1)",
        parent: 1
      },
      {
        key: 4,
        name: "Javva",
        title: "Senior Engineer(L-2)",
        parent: 2
      },
      {
        key: 5,
        name: "Nasir",
        title: "Senior Engineer(L-2)",
        parent: 2
      },
      {
        key: 6,
        name: "Junaid",
        title: "Senior Engineer(L-2)",
        parent: 2
      },
      {
        key: 7,
        name: "Mallick",
        title: "Senior Engineer(L-2)",
        parent: 2
      },
      {
        key: 8,
        name: "Swaroop",
        title: "Senior Engineer(L-2)",
        parent: 3
      },
      {
        key: 9,
        name: "Kanakiah",
        title: "Senior Engineer(L-2)",
        parent: 3
      },
      {
        key: 10,
        name: "Srinu",
        title: "Senior Engineer(L-2)",
        parent: 3
      },
      {
        key: 11,
        name: "Manasa",
        title: "Senior Engineer(L-2)",
        parent: 3
      },
      {
        key: 12,
        name: "Karuna",
        title: "Trainee Engineer",
        parent: 4
      },
      {
        key: 13,
        name: "Shiva Reddy",
        title: "Trainee Engineer",
        parent: 4
      },
      {
        key: 14,
        name: "Anil",
        title: "Trainee Engineer",
        parent: 5
      },
      {
        key: 15,
        name: "Zaheer",
        title: "Trainee Engineer",
        parent: 6
      },
      {
        key: 16,
        name: "Charan",
        title: "Trainee Engineer",
        parent: 7
      },
      {
        key: 17,
        name: "Shiva Shanker",
        title: "Trainee Engineer",
        parent: 8
      },
      {
        key: 18,
        name: "Aditya",
        title: "Trainee Engineer",
        parent: 8
      },
      {
        key: 19,
        name: "Vardhani",
        title: "Trainee Engineer",
        parent: 10
      },
      {
        key: 20,
        name: "Rani",
        title: "Trainee Engineer",
        parent: 11
      },
    ], [{
        from: 1,
        to: 2,
        color: "Red"
      },
      {
        from: 1,
        to: 3,
        color: "Red"
      },
      {
        from: 2,
        to: 4,
        color: "Blue"
      },
      {
        from: 2,
        to: 5,
        color: "Blue"
      },
      {
        from: 2,
        to: 6,
        color: "Blue"
      },
      {
        from: 2,
        to: 7,
        color: "Blue"
      },
      {
        from: 3,
        to: 8,
        color: "Blue"
      },
      {
        from: 3,
        to: 9,
        color: "Blue"
      },
      {
        from: 3,
        to: 10,
        color: "Blue"
      },
      {
        from: 3,
        to: 11,
        color: "Blue"
      },
      {
        from: 4,
        to: 12,
        color: "Green"
      },
      {
        from: 4,
        to: 13,
        color: "Green"
      },
      {
        from: 5,
        to: 14,
        color: "Green"
      },
      {
        from: 6,
        to: 15,
        color: "Green"
      },
      {
        from: 7,
        to: 16,
        color: "Green"
      },
      {
        from: 8,
        to: 17,
        color: "Green"
      },
      {
        from: 8,
        to: 18,
        color: "Green"
      },
      {
        from: 10,
        to: 19,
        color: "Green"
      },
      {
        from: 11,
        to: 20,
        color: "Green"
      }
    ]);



  // This is a dummy context menu for the whole Diagram:
  myDiagram.contextMenu = $(go.Adornment);

  // This is the actual HTML context menu:
  var cxElement = document.getElementById("contextMenu");

  // We don't want the div acting as a context menu to have a (browser) context menu!
  cxElement.addEventListener("contextmenu", function(e) {
    e.preventDefault();
    return false;
  }, false);
  cxElement.addEventListener("blur", function(e) {
    cxMenu.stopTool();
  }, false);

  // Override the ContextMenuTool.showContextMenu and hideContextMenu methods
  // in order to modify the HTML appropriately.
  var cxTool = myDiagram.toolManager.contextMenuTool;

  // This is the override of ContextMenuTool.showContextMenu:
  // This does not not need to call the base method.
  cxTool.showContextMenu = function(contextmenu, obj) {
    var diagram = this.diagram;
    if (diagram === null) return;

    // Hide any other existing context menu
    if (contextmenu !== this.currentContextMenu) {
      this.hideContextMenu();
    }

    // Show only the relevant buttons given the current state.
    var cmd = diagram.commandHandler;
    document.getElementById("cut").style.display = cmd.canCutSelection() ? "block" : "none";
    document.getElementById("copy").style.display = cmd.canCopySelection() ? "block" : "none";
    document.getElementById("paste").style.display = cmd.canPasteSelection() ? "block" : "none";
    document.getElementById("delete").style.display = cmd.canDeleteSelection() ? "block" : "none";
    document.getElementById("color").style.display = obj !== null ? "block" : "none";

    // Now show the whole context menu element
    cxElement.style.display = "block";
    // we don't bother overriding positionContextMenu, we just do it here:
    var mousePt = diagram.lastInput.viewPoint;
    cxElement.style.left = mousePt.x + "px";
    cxElement.style.top = mousePt.y + "px";

    // Remember that there is now a context menu showing
    this.currentContextMenu = contextmenu;
  }

  // This is the corresponding override of ContextMenuTool.hideContextMenu:
  // This does not not need to call the base method.
  cxTool.hideContextMenu = function() {
    if (this.currentContextMenu === null) return;
    cxElement.style.display = "none";
    this.currentContextMenu = null;
  }
}



// This is the general menu command handler, parameterized by the name of the command.
function cxcommand(val) {
  var diagram = myDiagram;
  if (!(diagram.currentTool instanceof go.ContextMenuTool)) return;
  switch (val) {
    case "Cut":
      diagram.commandHandler.cutSelection();
      break;
    case "Copy":
      diagram.commandHandler.copySelection();
      break;
    case "Paste":
      diagram.commandHandler.pasteSelection(diagram.lastInput.documentPoint);
      break;
    case "Delete":
      diagram.commandHandler.deleteSelection();
      break;
    case "Color":
      changeColor(diagram);
      break;
  }
  diagram.currentTool.stopTool();
}


// A custom command, for changing the color of the selected node(s).
function changeColor(diagram) {
  // the object with the context menu, in this case a Node, is accessible as:
  var cmObj = diagram.toolManager.contextMenuTool.currentObject;
  // but this function operates on all selected Nodes, not just the one at the mouse pointer.

  // Always make changes in a transaction, except when initializing the diagram.
  diagram.startTransaction("change color");
  diagram.selection.each(function(node) {
    if (node instanceof go.Node) { // ignore any selected Links and simple Parts
      // Examine and modify the data, not the Node directly.
      var data = node.data;
      var newcolor;
      switch (data.color) {
        case "Red":
          newcolor = "Black";
          break;
        case "Black":
          newcolor = "Orange";
          break;
        case "Orange":
          newcolor = "Cyan";
          break;
        case "Cyan":
          newcolor = "Red";
          break;

      }
      // modify the node data
      // this evaluates data Bindings and records changes in the UndoManager
      diagram.model.setDataProperty(data, "color", newcolor);
    }
  });
  diagram.commitTransaction("change color");
}