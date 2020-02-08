import { SetupService } from '../../setup.service';
import { Component, OnInit, Input } from '@angular/core';
import { Setup } from '../../models/setup';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

export class SetupVM {
  constructor(setup: Setup) {
    this.id = setup.id;
    this.path = setup.requestMatcher.path;
    this.method = setup.requestMatcher.method;
    this.statusCode = setup.responseAction.statusCode;
  }

  id: string;
  path?: string;
  method?: string;
  statusCode?: number;
}

@Component({
  selector: 'app-setup-list',
  templateUrl: './setup-list.component.html',
  styleUrls: ['./setup-list.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition(
        'expanded <=> collapsed',
        animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')
      )
    ])
  ]
})
export class SetupListComponent implements OnInit {
  constructor(private setupService: SetupService) {}
  @Input() setups: Setup[] = [];
  @Input() title = 'Setups';

  columns: { title: string; propertyPath: string }[] = [
    { title: 'method', propertyPath: 'requestMatcher.method' },
    { title: 'path', propertyPath: 'requestMatcher.path' },
    { title: 'statusCode', propertyPath: 'responseAction.statusCode' }
  ];

  columnsToDisplay: string[] = ['method', 'path', 'statusCode'];

  expandedElement: Setup | null;

  getDisplayedColumns(): string[] {
    return this.columns.map(col => col.title);
  }

  isExpandedElement(setup: Setup): boolean {
    return this.expandedElement === setup;
  }

  getPropertyValue(setup: Setup, path: string): any | null {
    if (!this.expandedElement) {
      return null;
    }
    console.log(`Attempting to resolve deep property with path=${path}...`);
    const segments = path.split('.');
    let property: any = this.expandedElement;

    segments.forEach(ps => {
      console.log(
        `Getting deep property with path-segment=${ps} of path=${path}`
      );
      property = property[ps];
      if (!property) {
        return null;
      }
    });

    return property;
  }

  getPropertyValueForColumn(setup: Setup, column: string): any {
    return this.getPropertyValue(
      setup,
      this.columns.find(col => col.title === column).propertyPath
    );
  }

  toggleExpandedRow(setup: Setup) {
    this.expandedElement = this.expandedElement === setup ? null : setup;
  }

  getExpandedState(setup: Setup): string {
    return this.expandedElement === setup ? 'expanded' : 'collapsed';
  }

  ngOnInit(): void {
    this.setupService
      .getActiveSetups()
      .subscribe(setups => (this.setups = setups));
  }
}
