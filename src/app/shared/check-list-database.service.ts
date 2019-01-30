import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';


/**
 * Node for  List Item
*/
export class ListItemNode {
  id: number;
  children: ListItemNode[];
  item: string;
}

/**Flat list item node with expandable and level information */
export class ListItemFlatNode {
  id: number;
  item: string;
  level: number;
  expandable: boolean;
}

/**
 * The Json Object For List data
 */
const TREE_DATA = {
    Harshit: {
      Google: null,
      Microsoft: null,
      Conqsys: null
    },
    Pranshu: {
      Capgemini: null,
      Microsoft: null,
      Conqsys: null
    }
};
@Injectable({
  providedIn: 'root'
})
export class CheckListDatabaseService {

  dataChange = new BehaviorSubject<ListItemNode[]>([]);

  get data(): ListItemNode[] { return this.dataChange.value; }
  constructor() {
    this.initialize();
  }

  initialize() {
    // Build the tree nodes from Json object. The result is a list of `TodoItemNode` with nested
    //     file node as children.
    const data = this.buildFileTree(TREE_DATA, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The value is the Json object, or a sub-tree of a Json-object.
   * The return value is the list of ListItemNode.
   */
  buildFileTree(obj: { [key: string]: any }, level: number): ListItemNode[] {

    return Object.keys(obj).reduce<ListItemNode[]>((accumulator, key) => {
      const value = obj[key];
      const node = new ListItemNode();
      node.item = key;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1);
        } else {
          node.item = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }

  /**Add an item to item list */
  insertItem(parent: ListItemNode, name: string) {
    if (parent.children) {
      parent.children.push({ item: name } as ListItemNode);
      this.dataChange.next(this.data);
    }
  }

  updateItem(node: ListItemNode, name: string) {
    node.item = name;
    this.dataChange.next(this.data);
  }

}
