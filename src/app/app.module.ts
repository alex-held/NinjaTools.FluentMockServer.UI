import { PropertyTreeComponent } from './shared/components/property-tree/property-tree.component';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { LayoutModule } from '@angular/cdk/layout';

import { SetupDetailComponent } from './setups/setup-detail/setup-detail.component';

import { NavbarComponent } from './navbar/navbar.component';

import { MaterialComponentsModule } from './shared/material.module';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { ObserversModule } from '@angular/cdk/observers';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    SetupDetailComponent,
    PropertyTreeComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialComponentsModule,
    LayoutModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
    ObserversModule
  ],
  exports: [],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}
