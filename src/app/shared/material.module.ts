import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatDividerModule } from '@angular/material/divider';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
import { MatRadioModule } from '@angular/material/radio';

import {
  MatLineModule,
  MatOptionModule,
  MatPseudoCheckboxModule,
  MatRippleModule,
  MatCommonModule,
  MatNativeDateModule
} from '@angular/material/core';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { DriverProvider } from 'protractor/built/driverProviders';

@NgModule({
  imports: [
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatLineModule,
    MatMenuModule,
    MatOptionModule,
    MatPseudoCheckboxModule,
    MatButtonModule,
    MatRippleModule,
    MatSortModule,
    MatCommonModule,
    MatRadioModule,
    MatMenuModule,
    MatCardModule,
    MatLineModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule
  ],
  exports: [
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule,
    MatLineModule,
    MatMenuModule,
    MatOptionModule,
    MatPseudoCheckboxModule,
    MatButtonModule,
    MatRippleModule,
    MatSortModule,
    MatCommonModule,
    MatRadioModule,
    MatMenuModule,
    MatCardModule,
    MatLineModule,
    MatFormFieldModule,
    MatNativeDateModule,
    MatDividerModule
  ]
})
export class MaterialComponentsModule {}
