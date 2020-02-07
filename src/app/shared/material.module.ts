import { NgModule } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { MatMenuModule } from '@angular/material/menu';
import { MatCardModule } from '@angular/material/card';

@NgModule({
  imports: [MatTableModule, MatMenuModule, MatCardModule],
  exports: [MatTableModule, MatMenuModule, MatCardModule]
})
export class MaterialComponentsModule {}
