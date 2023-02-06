import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {Programacion} from "../../../util/custom-data-types/pedido";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {SelectionChangedEvent} from "ag-grid-community";
import * as moment from 'moment';
import {Catalogo} from "../../../util/custom-data-types/catalogo";
import {CatalogosService} from "../../services/catalogos.service";
import {estadoCatalogoEnumEnum} from "../../../util/enum/estadoCatalogoEnum.enum";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit, OnChanges {

  @Input() pedido: Programacion;
  @Input() navieras: Catalogo[];
  @Input() puertos: Catalogo[];

  public currentTime = moment();
  //public navieras: Catalogo[];
  public editForm: FormGroup;
  public tester: number = 0;

  /** ENUMERABLES */
  public estadosCatalogo = estadoCatalogoEnumEnum;

  /** VARIABLES DE INFORMACIÓN */
  public mostrarFormulario: boolean = false;
  public spinner: boolean = false;
  private usuario: string;
  private pais: string;
  private rol: string;

  constructor(private fb: FormBuilder,private _catalogoSevice: CatalogosService) { }

  ngOnInit(): void {
    /** >>>> MODIFICAR USUARIO */
    this.usuario = 'tmoscoso';
    this.pais = 'ECU';
    this.rol = 'COORDINADOR';
    this.mostrarFormulario = false;

    this.editForm = this.fb.group({
      contenedor: new FormControl(null, Validators.required),
      sello: new FormControl(null, Validators.required),
      bl: new FormControl(null, Validators.required),
      prefactura: new FormControl(null, Validators.required),
      sri: new FormControl(null, Validators.required),
      fechaFacturacion: new FormControl(null, Validators.required),
      fechaEmbarque: new FormControl(null, Validators.required),
      naviera: new FormControl(null, Validators.required),
      buque: new FormControl(null, Validators.required),
      fleteMaritimo: new FormControl(null, Validators.required),
      puerto: new FormControl(null, Validators.required),
      fleteTerrestre: new FormControl(null, Validators.required),
      comentarios: new FormControl(null, Validators.required),
    });
  }
  ngOnChanges(changes: SimpleChanges) {
    if(changes.pedido && !changes.pedido.firstChange) {
      this.mostrarFormulario = true;
      this.pedido = changes.pedido.currentValue;

      const puerto = this.puertos.find(x => x.codigo == this.pedido.codigoPuertoOrigen);
      this.editForm.controls.puerto.setValue(puerto.codigo);

      const naviera = this.navieras.find(x => x.codigo == this.pedido.codigoNaviera);
      this.editForm.controls.naviera.setValue(naviera.codigo);

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

  changeValue(value:any){
    console.log(value.id)
  }

}
