import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule} from "@angular/forms";
import {DateFormat} from "../app/util/pipes/date-format.pipe";
import {AgGridModule} from "ag-grid-angular";
import {OnlyNumbersDirective} from "./directives/only-numbers.directive";


@NgModule({
  declarations: [
    DateFormat,
    OnlyNumbersDirective
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    AgGridModule.withComponents([]),
  ],
  exports: [
    ReactiveFormsModule,
    AgGridModule,
    OnlyNumbersDirective,
    DateFormat
  ]
})
export class SharedModule { }
