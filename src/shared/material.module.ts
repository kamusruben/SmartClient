import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AgGridModule} from 'ag-grid-angular';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";



const materialModules = [
  MatTabsModule,
  MatSliderModule,
  MatCheckboxModule,
  MatSlideToggleModule,
  MatFormFieldModule,
  MatAutocompleteModule,
  MatInputModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatSelectModule,
  MatOptionModule,
  MatButtonModule,
  BrowserAnimationsModule
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    materialModules,
  ],
  exports: [
    materialModules
  ]
})
export class MaterialModule {
}
