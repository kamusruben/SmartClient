import { Component, OnInit, Input } from '@angular/core';
import {Programacion} from "../../../util/custom-data-types/pedido";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {SelectionChangedEvent} from "ag-grid-community";
import * as moment from 'moment';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {

  @Input() pedido: Programacion;
  public currentTime = moment();
  editForm: FormGroup;
  constructor(private fb: FormBuilder) { }

  ngOnInit(): void {
    if(this.editForm != null) {
      this.editForm = this.fb.group({
        prefactura: new FormControl(this.pedido.prefacturaAduana, Validators.required),
        buque: new FormControl(this.pedido.nombreBuqueNaviera, Validators.required),
        valorFleteTerrestre: new FormControl(this.pedido.valorFlete, Validators.required),
        valorFleteMaritimo: new FormControl(this.pedido.fleteMaritimo, Validators.required),
      });
    }else{
      this.editForm = this.fb.group({
        prefactura: new FormControl(null, Validators.required),
        buque: new FormControl(null, Validators.required),
        valorFleteTerrestre: new FormControl(null, Validators.required),
        valorFleteMaritimo: new FormControl(null, Validators.required),
      });
    }
  }

  saveForm(editForm: FormGroup){
    let valid = this.validateForm();
    if(valid){
      this.pedido.prefacturaAduana = this.editForm.controls['prefactura'].value;
      this.pedido.nombreBuqueNaviera = this.editForm.controls['buque'].value;
      this.pedido.valorFlete = this.editForm.controls['valorFleteTerrestre'].value;
      this.pedido.fleteMaritimo = this.editForm.controls['valorFleteMaritimo'].value;
    }
  }

  validateForm(){
    return true;
  }



}
