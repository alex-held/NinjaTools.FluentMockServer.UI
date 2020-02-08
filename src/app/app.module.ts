import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SetupDashboardComponent } from './setups/setup-dashboard/setup-dashboard.component';
import { PrimeNgComponentsModule } from './shared/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './shared/material.module';
import { SetupListComponent } from './setups/setup-list/setup-list.component';
import { SetupDetailComponent } from './setups/setup-detail/setup-detail.component';
import { SetupListExpandedDetailComponent } from './setups/setup-list-expanded-detail/setup-list-expanded-detail.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SetupDashboardComponent,
    SetupListComponent,
    SetupDetailComponent,
    SetupListExpandedDetailComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgComponentsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
