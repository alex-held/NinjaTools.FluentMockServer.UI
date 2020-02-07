import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Setup } from './models/setup';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  setups: Setup[] = [{ path: '/some/path', method: 'GET' }];

  constructor() {}

  getActiveSetups(): Observable<Setup[]> {
    return of(this.setups);
  }
  createSetup(setup: Setup): void {
    this.setups.push(setup);
  }
}
