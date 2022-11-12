import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from 'ag-grid-angular';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule,
  ],
  exports: [
    ReactiveFormsModule,
    AgGridModule
  ]
})
export class SharedModule { }
