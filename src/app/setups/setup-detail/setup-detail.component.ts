import { Setup } from './../../models/setup';
import { SetupService } from '../../setup.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-setup-detail',
  templateUrl: './setup-detail.component.html',
  styleUrls: ['./setup-detail.component.scss']
})
export class SetupDetailComponent implements OnInit {
  setup: Setup;
  form: FormGroup = this.fb.group({
    method: this.fb.control('', [
      Validators.maxLength(10),
      Validators.pattern('^[a-zA-Z]*$')
    ]),
    path: this.fb.control('', [Validators.pattern('^/.*$')]),
    statusCode: this.fb.control('', [
      Validators.maxLength(3),
      Validators.pattern('^[0-9]{2,3}$')
    ])
  });

  constructor(
    private setupService: SetupService,
    private route: ActivatedRoute,
    private fb: FormBuilder
  ) {}

  ngOnInit(): void {
    this.loadSetup();
  }

  public onSubmit(): void {
    console.info('submitting form..');
    this.setup.requestMatcher.method = this.form.get('method').value;
    this.setup.requestMatcher.path = this.form.get('path').value;
    this.setup.responseAction.statusCode = this.form.get('statusCode').value;
    console.info(JSON.stringify(this.setup));
  }

  private loadSetup(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.setupService.getSetupById(id).subscribe(setup => (this.setup = setup));
    console.info(`loading setup id=${id}`);
  }
}
