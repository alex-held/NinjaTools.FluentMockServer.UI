import { NgModule } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { MegaMenuModule, MegaMenu } from 'primeng/megamenu';
import { TableModule, Table } from 'primeng/table';
import { CalendarModule } from 'primeng/calendar';
import { FullCalendarModule, FullCalendar } from 'primeng/fullcalendar';
import { InputTextModule } from 'primeng/inputtext';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';
import { MenubarModule, Menubar } from 'primeng/menubar';
import { ProgressSpinnerModule } from 'primeng/progressspinner';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { DynamicDialogModule } from 'primeng/dynamicdialog';

@NgModule({
  imports: [
    ButtonModule,
    MegaMenuModule,
    TableModule,
    CalendarModule,
    FullCalendarModule,
    InputTextModule,
    DropdownModule,
    PickListModule,
    MenubarModule,
    ProgressSpinnerModule,
    RouterModule,
    FormsModule,
    DynamicDialogModule
  ],
  exports: [
    ButtonModule,
    MegaMenuModule,
    TableModule,
    CalendarModule,
    FullCalendarModule,
    InputTextModule,
    DropdownModule,
    PickListModule,
    MenubarModule,
    ProgressSpinnerModule,
    RouterModule,
    DynamicDialogModule
  ]
})
export class PrimeNgComponentsModule {}
