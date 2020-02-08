import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';
import { Observable, of as observableOf } from 'rxjs';
import { FlatTreeControl } from '@angular/cdk/tree';
import {
  MatTreeFlattener,
  MatTreeFlatDataSource
} from '@angular/material/tree';
import { PropertyDatabase } from './PropertyDatabase';
import { FlatPropertyNode } from './FlatPropertyNode';
import { PropertyNode } from './PropertyNode';

@Component({
  selector: 'app-property-tree',
  templateUrl: './property-tree.component.html',
  styleUrls: ['./property-tree.component.scss'],
  encapsulation: ViewEncapsulation.None
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

  log(message: string) {
    console.warn(message);
  }

  toggle(node: FlatPropertyNode) {
    this.log(`Toggled ${node.name} - ${this.treeControl.isExpanded(node)}`);
    this.treeControl.toggle(node);
  }
  ngOnInit(): void {
    this.initialize();
  }
}
