import { Component, OnInit, Input } from '@angular/core';
import { BehaviorSubject, Observable, of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource
} from '@angular/material/tree';

/** Property node data with nested structure. */
export class PropertyNode {
  id: string;
  name: string;
  value: string;
  children?: PropertyNode[];
}

/** Flat node with expandable and level information */
export class FlatPropertyNode {
  constructor(
    public expandable: boolean,
    public name: string,
    public value: any,
    public level: number,
    public id: string
  ) {}
}

export class PropertyDatabase {
  dataChange = new BehaviorSubject<PropertyNode[]>([]);

  constructor(root: any) {
    this.initialize(root);
  }

  get data(): PropertyNode[] {
    return this.dataChange.value;
  }

  initialize(root: any) {
    // Parse the string to json object.
    const dataObject = root;

    // Build the tree nodes from Json object. The result is a list of `FileNode` with nested
    // file node as children.
    const data = this.buildFileTree(dataObject, 0);

    // Notify the change.
    this.dataChange.next(data);
  }

  /**
   * Build the file structure tree. The `value` is the Json object, or a sub-tree of a Json object.
   * The return value is the list of `FileNode`.
   */
  buildFileTree(
    obj: { [key: string]: any },
    level: number,
    parentId: string = '0'
  ): PropertyNode[] {
    return Object.keys(obj).reduce<PropertyNode[]>((accumulator, key, idx) => {
      const value = obj[key];
      const node = new PropertyNode();
      node.name = key;

      /**
       * Make sure your node has an id so we can properly rearrange the tree during drag'n'drop.
       * By passing parentId to buildFileTree, it constructs a path of indexes which make
       * it possible find the exact sub-array that the node was grabbed from when dropped.
       */
      node.id = `${parentId}/${idx}`;

      if (value != null) {
        if (typeof value === 'object') {
          node.children = this.buildFileTree(value, level + 1, node.id);
        } else {
          node.value = value;
        }
      }

      return accumulator.concat(node);
    }, []);
  }
}

@Component({
  selector: 'app-property-tree',
  templateUrl: './property-tree.component.html',
  styleUrls: ['./property-tree.component.scss']
})
export class PropertyTreeComponent implements OnInit {
  constructor() {}
  @Input() root: any;

  database: PropertyDatabase;
  treeControl: FlatTreeControl<FlatPropertyNode>;
  treeFlattener: MatTreeFlattener<PropertyNode, FlatPropertyNode>;
  dataSource: MatTreeFlatDataSource<PropertyNode, FlatPropertyNode>;
  expandedNodeSet = new Set<string>();

  transformer = (node: PropertyNode, level: number) => {
    return new FlatPropertyNode(
      !!node.children,
      node.name,
      node.value,
      level,
      node.id
    );
  };
  private _getLevel = (node: FlatPropertyNode) => node.level;
  private _isExpandable = (node: FlatPropertyNode) => node.expandable;
  private _getChildren = (node: PropertyNode): Observable<PropertyNode[]> =>
    observableOf(node.children);
  hasChild = (_: number, _nodeData: FlatPropertyNode) => _nodeData.expandable;

  initialize() {
    this.database = new PropertyDatabase(this.root);

    this.treeFlattener = new MatTreeFlattener(
      this.transformer,
      this._getLevel,
      this._isExpandable,
      this._getChildren
    );

    this.treeControl = new FlatTreeControl<FlatPropertyNode>(
      this._getLevel,
      this._isExpandable
    );

    this.dataSource = new MatTreeFlatDataSource(
      this.treeControl,
      this.treeFlattener
    );

    this.database.dataChange.subscribe(data => this.rebuildTreeForData(data));
  }

  /**
   * This constructs an array of nodes that matches the DOM,
   * and calls rememberExpandedTreeNodes to persist expand state
   */
  visibleNodes(): PropertyNode[] {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    const result = [];

    function addExpandedChildren(node: PropertyNode, expanded: Set<string>) {
      result.push(node);
      if (expanded.has(node.id)) {
        node.children.map(child => addExpandedChildren(child, expanded));
      }
    }

    this.dataSource.data.forEach(node => {
      addExpandedChildren(node, this.expandedNodeSet);
    });
    return result;
  }

  /**
   * The following methods are for persisting the tree expand state
   * after being rebuilt
   */
  rebuildTreeForData(data: any) {
    this.rememberExpandedTreeNodes(this.treeControl, this.expandedNodeSet);
    this.dataSource.data = data;
    this.forgetMissingExpandedNodes(this.treeControl, this.expandedNodeSet);
    this.expandNodesById(
      this.treeControl.dataNodes,
      Array.from(this.expandedNodeSet)
    );
  }

  private rememberExpandedTreeNodes(
    treeControl: FlatTreeControl<FlatPropertyNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      treeControl.dataNodes.forEach(node => {
        if (treeControl.isExpandable(node) && treeControl.isExpanded(node)) {
          // capture latest expanded state
          expandedNodeSet.add(node.id);
        }
      });
    }
  }

  private forgetMissingExpandedNodes(
    treeControl: FlatTreeControl<FlatPropertyNode>,
    expandedNodeSet: Set<string>
  ) {
    if (treeControl.dataNodes) {
      expandedNodeSet.forEach(nodeId => {
        // maintain expanded node state
        if (!treeControl.dataNodes.find(n => n.id === nodeId)) {
          // if the tree doesn't have the previous node, remove it from the expanded list
          expandedNodeSet.delete(nodeId);
        }
      });
    }
  }

  private expandNodesById(flatNodes: FlatPropertyNode[], ids: string[]) {
    if (!flatNodes || flatNodes.length === 0) {
      return;
    }
    const idSet = new Set(ids);
    return flatNodes.forEach(node => {
      if (idSet.has(node.id)) {
        this.treeControl.expand(node);
        let parent = this.getParentNode(node);
        while (parent) {
          this.treeControl.expand(parent);
          parent = this.getParentNode(parent);
        }
      }
    });
  }

  private getParentNode(node: FlatPropertyNode): FlatPropertyNode | null {
    const currentLevel = node.level;
    if (currentLevel < 1) {
      return null;
    }
    const startIndex = this.treeControl.dataNodes.indexOf(node) - 1;
    for (let i = startIndex; i >= 0; i--) {
      const currentNode = this.treeControl.dataNodes[i];
      if (currentNode.level < currentLevel) {
        return currentNode;
      }
    }
    return null;
  }

  ngOnInit(): void {
    this.initialize();
  }
}
