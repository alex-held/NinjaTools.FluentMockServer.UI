/** Property node data with nested structure. */
export class PropertyNode {
  id: string;
  name: string;
  value: string;
  children?: PropertyNode[];
}
