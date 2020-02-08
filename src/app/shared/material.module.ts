import { MatIconModule } from '@angular/material/icon';
import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatGridListModule } from '@angular/material/grid-list';

import { MatButtonModule } from '@angular/material/button';
import { MatTreeModule } from '@angular/material/tree';
@NgModule({
  imports: [
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatButtonModule,
    MatTreeModule
  ],
  exports: [
    MatTableModule,
    MatMenuModule,
    MatCardModule,
    MatExpansionModule,
    MatFormFieldModule,
    MatGridListModule,
    MatIconModule,
    MatTreeModule
  ]
})
export class MaterialComponentsModule {}
