import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'btn-trash',
  template: `<div>
    <button class="btn btn-outline-dark" (click)="removeHandler($event)"><i class="fa fa-remove"></i></button>
  </div>
  `
})
export class BotonesOpcionComponent implements ICellRendererAngularComp {

  private params: any

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  removeHandler(event: any){
    this.params.clicked(this.params, 'remove')
  }

}
