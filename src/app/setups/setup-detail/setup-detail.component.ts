import { Setup } from './../../models/setup';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-setup-detail',
  templateUrl: './setup-detail.component.html',
  styleUrls: ['./setup-detail.component.scss']
})
export class SetupDetailComponent implements OnInit {
  @Input() setup: Setup;

  constructor() {}

  ngOnInit(): void {}
}
