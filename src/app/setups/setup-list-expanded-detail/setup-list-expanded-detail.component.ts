import { Setup } from './../../models/setup';
import { Component, OnInit, Input } from '@angular/core';

export class NameValuePair {
  constructor(name: string, value: any | null) {
    this.name = name;
    this.value = value;
  }
  name: string;
  value: any | null;
}
@Component({
  selector: 'app-setup-list-expanded-detail',
  templateUrl: './setup-list-expanded-detail.component.html',
  styleUrls: ['./setup-list-expanded-detail.component.scss']
})
export class SetupListExpandedDetailComponent implements OnInit {
  @Input() setup: Setup | null;
  panelOpenState = false;
  matcherProperties: NameValuePair[];

  getMatcherPropertyColumns(): string[] {
    return this.matcherProperties.map(mp => mp.name);
  }

  constructor() {}

  ngOnInit(): void {
    const propertyNames = Object.getOwnPropertyNames(this.setup);

    this.matcherProperties = propertyNames
      .map(pName => new NameValuePair(pName, this.setup[pName]))
      .filter(nvp => nvp.value);

    this.matcherProperties.forEach(nvp =>
      console.log(`Property=${nvp.name}; Value=${nvp.value}`)
    );
  }
}
