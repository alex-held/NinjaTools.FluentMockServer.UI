import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { Setup } from './models/setup';

@Injectable({
  providedIn: 'root'
})
export class SetupService {
  setups: Setup[] = [
    {
      id: '1',
      requestMatcher: { path: '/some/path', method: 'GET' },
      responseAction: { statusCode: 200 }
    },
    {
      id: '2',
      requestMatcher: { path: '/another/path', method: 'POST' },
      responseAction: { statusCode: 404 }
    }
  ];

  constructor() {}

  getActiveSetups(): Observable<Setup[]> {
    return of(this.setups);
  }
  createSetup(setup: Setup): void {
    this.setups.push(setup);
  }
}
