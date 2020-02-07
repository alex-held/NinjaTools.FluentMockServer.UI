import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupDashboardComponent } from './setups/setup-dashboard/setup-dashboard.component';

const routes: Routes = [{ path: 'setups', component: SetupDashboardComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
