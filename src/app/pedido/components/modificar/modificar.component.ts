import { Component, OnInit, Input } from '@angular/core';
import {Pedido} from "../../../util/custom-data-types/pedido";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectionChangedEvent} from "ag-grid-community";
import * as moment from 'moment';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  @Input() pedido: Pedido;
  public currentTime = moment();
  editForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      prefactura: new FormControl(this.pedido.prefactAduana, Validators.required),
      buque: new FormControl(this.pedido.buque, Validators.required),
      valorFleteTerrestre: new FormControl(this.pedido.valorFleteTerrestre, Validators.required),
      valorFleteMaritimo: new FormControl(this.pedido.valorFleteMaritimo, Validators.required),
    });
  }

  saveForm(editForm: FormGroup){
    let valid = this.validateForm();
    debugger
    if(valid){
      this.pedido.prefactAduana = this.editForm.controls['prefactura'].value;
      this.pedido.prefactAduana = this.editForm.controls['buque'].value;
      this.pedido.valorFleteTerrestre = this.editForm.controls['valorFleteTerrestre'].value;
      this.pedido.valorFleteMaritimo = this.editForm.controls['valorFleteMaritimo'].value;
    }
  }

  validateForm(){
    return true;
  }

}
