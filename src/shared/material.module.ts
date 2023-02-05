import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTabsModule} from '@angular/material/tabs';
import {MatSliderModule} from '@angular/material/slider';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatCheckboxModule} from "@angular/material/checkbox";
import {MatButtonModule} from "@angular/material/button";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatAutocompleteModule} from "@angular/material/autocomplete";
import {MAT_DATE_LOCALE, MatNativeDateModule, MatOptionModule} from "@angular/material/core";
import {MatInputModule} from "@angular/material/input";
import {MatDatepickerModule} from "@angular/material/datepicker";
import {MatSelectModule} from "@angular/material/select";
import {MatDividerModule} from "@angular/material/divider";
import {MatProgressSpinnerModule, MatSpinner} from "@angular/material/progress-spinner";



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
  MatSliderModule,
  MatOptionModule,
  MatButtonModule,
  MatDividerModule,
  MatProgressSpinnerModule,
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
  ],
  providers: [
    {
      provide: MAT_DATE_LOCALE, useValue: 'es-ES'
    }
  ]
})
export class MaterialModule {
}
