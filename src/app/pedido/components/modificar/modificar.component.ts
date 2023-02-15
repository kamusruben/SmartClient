import {Component, OnInit, Input, OnChanges, SimpleChanges, Output, EventEmitter} from '@angular/core';
import {ModificarMultiple, ModificarSimple, Programacion} from "../../../util/custom-data-types/pedido";
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
// import {SelectionChangedEvent} from "ag-grid-community";
import * as moment from 'moment';
import {Catalogo} from "../../../util/custom-data-types/catalogo";
import {CatalogosService} from "../../services/catalogos.service";
import {estadoCatalogoEnumEnum} from "../../../util/enum/estadoCatalogoEnum.enum";
import {ProgramacionService} from "../../services/programacion.service";
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit, OnChanges {

  @Input() pedido: Programacion;
  @Input() seleccionados: Programacion[];
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
  public errorEstados: boolean = false;
  public mensajeError: string = 'Debe seleccionar al menos un Estado';

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

    let numRegex = /^-?\d*[.,]?\d{0,2}$/;

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
      fleteMaritimo: new FormControl(null, [Validators.required, Validators.pattern(numRegex)]),
      puerto: new FormControl(null, null),
      fleteTerrestre: new FormControl(null, [Validators.required, Validators.pattern(numRegex)]),
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
      this.errorEstados = false;

      this.pedido = changes.pedido.currentValue;

      this.editForm.controls.fechaReal.setValue(1);

      const puerto = this.puertos.find(x => x.codigo == this.pedido.codigoPuertoOrigen);
      this.editForm.controls.puerto.setValue(puerto.codigo);

      const naviera = this.navieras.find(x => x.codigo == this.pedido.codigoNaviera);
      this.editForm.controls.naviera.setValue(naviera.codigo);

    }
  }

  actualizar() {
    this.errorEstados = false;
    if(this.seleccionados.length < 1){
      this.mensajeError = 'Seleccione al menos un Registro';
      return;
    }
    if (this.editForm.valid) {
      if(this.seleccionados.length > 1){
        let indices = this.seleccionados.map(x=> x.codigoDetalleProgramacion);
        this.multiple = {
          codigoDetalleProgramacion: indices,
          actualizaNumeroFactura: false,
          numeroFacturaAnterior: this.seleccionados[0].numeroFacturaBaan,
          numeroFacturaBaan: this.seleccionados[0].numeroFacturaBaan,
          fechaEmbarque: moment(this.editForm.controls.fechaEmbarque.value).format('DD/MM/YYYY'),
          esFechaRealEmbarque: true,
          estado: this.seleccionados[0].estadoDetalle,
          nombreBuque: this.editForm.controls.buque.value,
          comentariosInaexpo: this.editForm.controls.comentarios.value,
          numeroContenedor: this.editForm.controls.contenedor.value,
          numeroSellos: this.editForm.controls.sello.value,
          numeroBL: this.editForm.controls.bl.value,
          valorFlete: this.editForm.controls.fleteTerrestre.value,
          fechaFacturacion: moment(this.editForm.controls.fechaFacturacion.value).format('DD/MM/YYYY'),
          fleteMaritimo: this.editForm.controls.fleteMaritimo.value,
          codigoNaviera: this.seleccionados[0].codigoNaviera,
          codigoPuertoDestino: this.seleccionados[0].codigoPuertoDestino,
          nombreBuqueNaviera: this.editForm.controls.buque.value,
          actulizaCampoPorContenedor: true,
          numeroContenedorClienteDescripcion: this.seleccionados[0].numeroContenedorClienteDescripcion,
          codigoPuertoOrigen: this.seleccionados[0].codigoPuertoOrigen,
          numeroFacturaSRI: this.seleccionados[0].numeroFacturaSRI,
          dae: this.seleccionados[0].dae,
          camposModificados: ''
        };
        this.actualizarInfo.emit(true);
        let msgError = '';
        this._programacionService.actualizarInformacionMultiple(this.multiple)
          .subscribe((result: any) => {
            switch (result.return){
              case 0:
                break;
              case 1:
                msgError = 'Detalle de Programación no encontrado';
                break;
              case 2:
                msgError = 'Factura BAAN pertenece a otro pedido';
                break;
              case 3:
                msgError = 'Pedido ya enviado';
                break;
              case 4:
                msgError = 'Contenedor Pedido estado ON HOLD';
                break;
              case 5:
                msgError = 'Pedido siguiente ya enviado';
                break;
              case 6:
                msgError = 'Contenedo Pedido siguiente Estado ON HOLD';
                break;
              case 7:
                msgError = 'Factura BAAN ya existe';
                break;
              default:
                msgError = 'Error general';
                break;
            }
            if(result.return > 0){
              Swal.fire({
                icon: 'error',
                title: msgError,
                confirmButtonText: 'Entiendo!',
                confirmButtonColor: '#224668'
              });
            }
            this.actualizarInfo.emit(false);
        }, (err) => {
            console.log(err);
          });
      }else {
        this.simple = {
          codigoDetalleProgramacion: parseInt(this.pedido.codigoDetalleProgramacion),
          numeroFacturaBaan: this.pedido.numeroFacturaBaan,
          fechaEmbarque: moment(this.editForm.controls.fechaEmbarque.value).format('DD/MM/YYYY'),
          esFechaRealEmbarque: false,
          estado: this.pedido.estadoDetalle,
          nombreBuque: this.editForm.controls.buque.value,
          comentariosInaexpo: this.editForm.controls.comentarios.value,
          numeroContenedor: this.editForm.controls.contenedor.value,
          numeroSellos: this.editForm.controls.sello.value,
          numeroBL: this.editForm.controls.bl.value,
          valorFlete: this.editForm.controls.fleteTerrestre.value,
          fechaFacturacion: moment(this.editForm.controls.fechaFacturacion.value).format('DD/MM/YYYY'),
          fleteMaritimo: this.editForm.controls.fleteMaritimo.value,
          codigoNaviera: this.pedido.codigoNaviera,
          codigoPuertoDestino: this.pedido.codigoPuertoDestino,
          dae: this.pedido.dae,
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
      }
    }else{
      this.errorEstados = true;
      this.mensajeError = 'Debe seleccionar al menos un estado';
    }
  }

  validateForm() {
    return true;
  }

  changeValue(value: any) {
    console.log(value.id)
  }

}
