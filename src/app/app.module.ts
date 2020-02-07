import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { SetupsComponent } from './setups/setups.component';
import { PrimeNgComponentsModule } from './shared/primeng.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialComponentsModule } from './shared/material.module';
import { SetupListComponent } from './setup-list/setup-list.component';

@NgModule({
  declarations: [AppComponent, NavbarComponent, SetupsComponent, SetupListComponent],
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
