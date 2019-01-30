import { Component, OnInit } from '@angular/core';
import { SelectionModel } from '@angular/cdk/collections';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { CheckListDatabaseService, ListItemNode, ListItemFlatNode } from '../shared/check-list-database.service';

@Component({
  selector: 'app-tree-list',
  templateUrl: './tree-list.component.html',
  styleUrls: ['./tree-list.component.css']
})
export class TreeListComponent implements OnInit {
/** Map from flat node to nested node. This helps us finding the nested node to be modified */
flatNodeMap = new Map<ListItemFlatNode, ListItemNode>();

/** Map from nested node to flattened node. This helps us to keep the same object for selection */
nestedNodeMap = new Map<ListItemNode, ListItemFlatNode>();

/** A selected parent node to be inserted */
selectedParent: ListItemFlatNode | null = null;

/** The new item's name */
newItemName = '';

treeControl: FlatTreeControl<ListItemFlatNode>;

treeFlattener: MatTreeFlattener<ListItemNode, ListItemFlatNode>;

dataSource: MatTreeFlatDataSource<ListItemNode, ListItemFlatNode>;

/**Load form */
loadComponent = false;
itemToLoad: ListItemNode;

/** The selection for checklist */
checklistSelection = new SelectionModel<ListItemFlatNode>(true /* multiple */);
constructor(public database: CheckListDatabaseService) {
  this.treeFlattener = new MatTreeFlattener(this.transformer, this.getLevel,
    this.isExpandable, this.getChildren);
  this.treeControl = new FlatTreeControl<ListItemFlatNode>(this.getLevel, this.isExpandable);
  this.dataSource = new MatTreeFlatDataSource(this.treeControl, this.treeFlattener);
  database.dataChange.subscribe(data => {
    data.forEach((element, index) => {
      element.id = index;
    });
    this.dataSource.data = data;
  });
}

getLevel = (node: ListItemFlatNode) => node.level;

isExpandable = (node: ListItemFlatNode) => node.expandable;

getChildren = (node: ListItemNode): ListItemNode[] => node.children;

hasChild = (_: number, _nodeData: ListItemFlatNode) => _nodeData.expandable;

hasNoContent = (_: number, _nodeData: ListItemFlatNode) => _nodeData.item === '';

/**
 * Transformer to convert nested node to flat node. Record the nodes in maps for later use.
 */
transformer = (node: ListItemNode, level: number) => {
  const existingNode = this.nestedNodeMap.get(node);
  const flatNode = existingNode && existingNode.item === node.item
      ? existingNode
      : new ListItemFlatNode();
  flatNode.item = node.item;
  flatNode.level = level;
  flatNode.id = node.id;
  flatNode.expandable = !!node.children;
  this.flatNodeMap.set(flatNode, node);
  this.nestedNodeMap.set(node, flatNode);
  return flatNode;
}

/* Get the parent node of a node */
getParentNode(node: ListItemFlatNode): ListItemFlatNode | null {
  const currentLevel = this.getLevel(node);

  if (currentLevel < 1) {
    return null;
  }

  const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;

  for (let i = startIndex; i >= 0; i--) {
    const currentNode = this.treeControl.dataNodes[i];

    if (this.getLevel(currentNode) < currentLevel) {
      return currentNode;
    }
  }
  return null;
}



/** Save the node to database */
saveNode(node: ListItemFlatNode, itemValue: string) {
  const nestedNode = this.flatNodeMap.get(node);
  this.database.updateItem(nestedNode, itemValue);
}

nodeSelected(node: ListItemFlatNode) {
  const parentNode = this.flatNodeMap.get(node);
  this.itemToLoad = parentNode;
    console.log('parentNode', parentNode);
   // this.database.insertItem(parentNode, '');
    this.treeControl.expand(node);
    this.loadComponent = true;
}

  ngOnInit() {
  }

  /** Select the category so we can insert the new item. */
// addNewItem(node: ListItemFlatNode) {
//   const parentNode = this.flatNodeMap.get(node);
//   console.log('parentNode', parentNode);
//  // this.database.insertItem(parentNode, '');
//   this.treeControl.expand(node);
//   this.loadComponent = true;
// }
}
