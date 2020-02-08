/** Flat node with expandable and level information */
export class FlatPropertyNode {
  constructor (public expandable: boolean, public name: string, public value: any, public level: number, public id: string) { }
}
