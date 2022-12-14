import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {AgGridModule} from 'ag-grid-angular';
import {DateFormat} from "../app/util/pipes/date-format.pipe";


@NgModule({
  declarations: [
    DateFormat
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule,
  ],
  exports: [
    ReactiveFormsModule,
    AgGridModule,
    DateFormat
  ]
})
export class SharedModule { }
