import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";
import {ModificarComponent} from "../modificar/modificar.component";

@Component({
  selector: 'app-especificacion',
  templateUrl: './especificacion.component.html',
  styleUrls: ['./especificacion.component.scss']
})
export class EspecificacionComponent {

  constructor(public dialogRef: MatDialogRef<EspecificacionComponent>,
              @Inject(MAT_DIALOG_DATA) public data: any) { }

  regresar(){
    this.dialogRef.close();
  }
}
