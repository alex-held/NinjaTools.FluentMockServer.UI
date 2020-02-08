import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';
import { FlexLayoutModule } from '@angular/flex-layout';

import { SetupDashboardComponent } from './setups/setup-dashboard/setup-dashboard.component';
import { SetupListComponent } from './setups/setup-list/setup-list.component';
import { SetupDetailComponent } from './setups/setup-detail/setup-detail.component';
import { SetupListExpandedDetailComponent } from './setups/setup-list-expanded-detail/setup-list-expanded-detail.component';

import { NavbarComponent } from './navbar/navbar.component';
import { DashComponent } from './dash/dash.component';

import { PrimeNgComponentsModule } from './shared/primeng.module';
import { MaterialComponentsModule } from './shared/material.module';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SetupDashboardComponent,
    SetupListComponent,
    SetupDetailComponent,
    SetupListExpandedDetailComponent,
    DashComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    PrimeNgComponentsModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    LayoutModule,
    FlexLayoutModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
