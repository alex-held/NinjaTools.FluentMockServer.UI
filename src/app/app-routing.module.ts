import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SetupsComponent } from './setups/setups.component';

const routes: Routes = [{ path: 'setups', component: SetupsComponent }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
