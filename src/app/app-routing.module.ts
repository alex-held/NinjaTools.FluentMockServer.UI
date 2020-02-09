import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupDetailComponent } from './setups/setup-detail/setup-detail.component';

const routes: Routes = [
  { path: 'setups/:id', component: SetupDetailComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
