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
  @Input() setups: SetupVM[] = [];
  @Input() title = 'Setups';

  displayedColumns: string[] = ['id', 'method', 'path', 'statusCode'];
  expandedElement: Setup | null;

  constructor(private setupService: SetupService) {}

  ngOnInit(): void {
    this.setupService
      .getActiveSetups()
      .subscribe(
        setups => (this.setups = setups.map(setup => new SetupVM(setup)))
      );
  }
}
