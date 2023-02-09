import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {ModificarMultiple, ModificarSimple, Programacion} from "../../../util/custom-data-types/pedido";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {SelectionChangedEvent} from "ag-grid-community";
import * as moment from 'moment';
import {Catalogo} from "../../../util/custom-data-types/catalogo";
import {CatalogosService} from "../../services/catalogos.service";
import {estadoCatalogoEnumEnum} from "../../../util/enum/estadoCatalogoEnum.enum";
import {ProgramacionService} from "../../services/programacion.service";

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit, OnChanges {

  @Input() pedido: Programacion;
  @Input() navieras: Catalogo[];
  @Input() puertos: Catalogo[];
  @Output() actualizarInfo: EventEmitter<boolean> = new EventEmitter<boolean>();

  public currentTime = moment();
  //public navieras: Catalogo[];
  public editForm: FormGroup;
  public tester: number = 0;

  /** ENUMERABLES */
  public estadosCatalogo = estadoCatalogoEnumEnum;

  /** VARIABLES DE INFORMACIÓN */
  public mostrarFormulario: boolean = false;
  private usuario: string;
  private pais: string;
  private rol: string;
  private simple: ModificarSimple;
  private multiple: ModificarMultiple;

  constructor(private fb: FormBuilder,
              private _catalogoSevice: CatalogosService,
              private _programacionService: ProgramacionService) {
  }

  ngOnInit(): void {
    /** >>>> MODIFICAR USUARIO */
    this.usuario = 'tmoscoso';
    this.pais = 'ECU';
    this.rol = 'COORDINADOR';
    this.mostrarFormulario = false;

    this.editForm = this.fb.group({
      contenedor: new FormControl(null, null),
      sello: new FormControl(null, null),
      bl: new FormControl(null, null),
      estado: new FormControl(null,null),
      prefactura: new FormControl(null, null),
      sri: new FormControl(null, null),
      fechaFacturacion: new FormControl(null, Validators.required),
      fechaEmbarque: new FormControl(null, Validators.required),
      naviera: new FormControl(null, null),
      buque: new FormControl(null, null),
      fleteMaritimo: new FormControl(null, Validators.required),
      puerto: new FormControl(null, null),
      fleteTerrestre: new FormControl(null, Validators.required),
      comentarios: new FormControl(null, null),
      fechaReal: new FormControl(null, Validators.required)
    });
  }

  // Valor del flete es obligatorio
  // Fechas son obligatorias
  // SRI no se recibe en el servicio SIMPLE
  // Modificar campos separados por ;


  ngOnChanges(changes: SimpleChanges) {
    if (changes.pedido && !changes.pedido.firstChange) {
      this.mostrarFormulario = true;
      this.pedido = changes.pedido.currentValue;

      this.editForm.controls.fechaReal.setValue(1);

      const puerto = this.puertos.find(x => x.codigo == this.pedido.codigoPuertoOrigen);
      this.editForm.controls.puerto.setValue(puerto.codigo);

      const naviera = this.navieras.find(x => x.codigo == this.pedido.codigoNaviera);
      this.editForm.controls.naviera.setValue(naviera.codigo);

    }
  }

  saveForm(editForm: FormGroup) {
    let valid = this.validateForm();
    if (this.editForm.valid) {
      this.simple = {
        codigoDetalleProgramacion: 13581,
        numeroFacturaBaan: 0,
        fechaEmbarque: moment(this.editForm.controls.fechaEmbarque.value).format('DD/MM/YYYY'),
        esFechaRealEmbarque: false,
        estado: 'EMBARCADO',
        nombreBuque: 'buque--a',
        comentariosInaexpo: 'comentarioo xxx',
        numeroContenedor: 31231,
        numeroSellos: 5555,
        numeroBL: 66666,
        valorFlete: 15.22,
        fechaFacturacion: moment(this.editForm.controls.fechaFacturacion.value).format('DD/MM/YYYY'),
        fleteMaritimo: 556.01,
        codigoNaviera: 62,
        codigoPuertoDestino: 1,
        dae: 'daee',
        camposModificados: ''
      }


      //   prefactura: new FormControl(null, Validators.required),
      //   sri: new FormControl(null, Validators.required),
      //   fechaFacturacion: new FormControl(null, Validators.required),
      //   fechaEmbarque: new FormControl(null, Validators.required),
      //   naviera: new FormControl(null, Validators.required),
      //   buque: new FormControl(null, Validators.required),
      //   fleteMaritimo: new FormControl(null, Validators.required),
      //   puerto: new FormControl(null, Validators.required),
      //   fleteTerrestre: new FormControl(null, Validators.required),
      //   comentarios: new FormControl(null, Validators.required),

      this.actualizarInfo.emit(true);
      this._programacionService.actualizarInformacion(this.simple).subscribe((result: any) => {
        this.actualizarInfo.emit(false);
      });
    }else{
      alert('Revise los errores');
    }
  }

  validateForm() {
    return true;
  }

  changeValue(value: any) {
    console.log(value.id)
  }

}
