import { Component, OnInit } from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";

@Component({
  selector: 'btn-trash',
  template: `<div>
    <button class="btn btn-outline-dark" (click)="removeHandler($event)"><i class="fa fa-remove"></i></button>
    <button class="btn btn-outline-success" (click)="editHandler($event)"><i class="fa fa-edit"></i></button>
  </div>
  `
})
export class TrashButtonComponent implements ICellRendererAngularComp {

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

  editHandler(event: any){
    this.params.clicked(this.params, 'edit')
  }

}
