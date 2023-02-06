import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {DateFormat} from "../app/util/pipes/date-format.pipe";
import {AgGridModule} from "ag-grid-angular";


@NgModule({
  declarations: [
    DateFormat
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    ReactiveFormsModule,
    AgGridModule,
    DateFormat
  ]
})
export class SharedModule { }
