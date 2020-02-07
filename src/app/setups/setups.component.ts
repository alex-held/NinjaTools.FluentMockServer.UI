import { SetupService } from './../setup.service';
import { Component, OnInit } from '@angular/core';
import { Setup } from '../setup';
import {
  animate,
  state,
  style,
  transition,
  trigger
} from '@angular/animations';

@Component({
  selector: 'app-setups',
  templateUrl: './setups.component.html',
  styleUrls: ['./setups.component.scss'],
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
export class SetupsComponent implements OnInit {
  activeSetups: Setup[] = [];
  matchedSetups: Setup[] = [];
  
  columns = [
    { field: 'method', header: 'Method' },
    { field: 'path', header: 'Path' }
  ];
  displayedColumns: string[] = ['method', 'path'];
  expandedElement: Setup | null;

  constructor(private setupService: SetupService) {}

  ngOnInit(): void {
    this.setupService
      .getActiveSetups()
      .subscribe(setups => (this.activeSetups = setups));
  }
}
