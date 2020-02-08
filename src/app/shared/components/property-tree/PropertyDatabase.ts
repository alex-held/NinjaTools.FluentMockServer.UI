import { BehaviorSubject } from 'rxjs';
import { PropertyNode } from "./PropertyNode";
export class PropertyDatabase {
  dataChange = new BehaviorSubject<PropertyNode[]>([]);
  constructor (root: any) {
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
  buildFileTree(obj: {
    [key: string]: any;
  }, level: number, parentId: string = '0'): PropertyNode[] {
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
      if (value != null)
      {
        if (typeof value === 'object')
        {
          node.children = this.buildFileTree(value, level + 1, node.id);
        }
        else
        {
          node.value = value;
        }
      }
      return accumulator.concat(node);
    }, []);
  }
}
