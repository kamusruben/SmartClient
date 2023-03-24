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
import {MatDialog} from "@angular/material/dialog";
import {EspecificacionComponent} from "../especificacion/especificacion.component";

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
  public ids: string[] = [];
  public real: boolean = false;
  constructor(private fb: FormBuilder,
              private _catalogoSevice: CatalogosService,
              private _programacionService: ProgramacionService,
              private _dialog: MatDialog) {
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
      fechaEmbarque: new FormControl(null),
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
    this.ids = [];
    this.seleccionados.forEach(x => this.ids.push(x.codigoDetalleProgramacion));
    if (changes.pedido && !changes.pedido.firstChange) {
      this.mostrarFormulario = true;
      this.errorEstados = false;

      this.pedido = changes.pedido.currentValue;
      const puerto = this.puertos.find(x => x.codigo == this.pedido.codigoPuertoOrigen);
      const naviera = this.navieras.find(x => x.codigo == this.pedido.codigoNaviera);

      //this.editForm.controls.fechaReal.setValue(1);
      /* ASIGNACION DE INFORMACIÓN AL FORMULARIO */
      this.editForm.controls.naviera.setValue(naviera.codigo);
      this.editForm.controls.puerto.setValue(puerto.codigo);

      const ff = this.pedido.fechaFacturacion != '' ? this.toDate(this.pedido.fechaFacturacion): null;
      const fre = this.pedido.fechaRealEmbarque != '' ? this.toDate(this.pedido.fechaRealEmbarque): null;
      //const fte = this.pedido.fechaTentativaEmbarque != '' ? this.toDate(this.pedido.fechaTentativaEmbarque): null;
      if(this.pedido.fechaRealEmbarque != ""){
        this.real = true;
        this.editForm.controls.fechaReal.setValue('1');
      }else{
        this.real = false;
        this.editForm.controls.fechaReal.setValue('0');
      }
      if(fre) {
        this.editForm.controls.fechaEmbarque.setValue(fre);
      }
      this.editForm.controls.fechaFacturacion.setValue(ff);
      this.editForm.controls.fleteMaritimo.setValue(this.pedido.fleteMaritimo);
      this.editForm.controls.fleteTerrestre.setValue(this.pedido.valorFlete);
    }
  }

  private toDate(fecha: string){
    const partes = fecha.split('/');
    const anio = parseInt(partes[2]);
    const mes = parseInt(partes[1])-1;
    const dia = parseInt(partes[0]);
    return new Date(anio,mes,dia);
  }

  public actualizar() {
    this.errorEstados = false;
    if(this.seleccionados.length < 1){
      this.mensajeError = 'Seleccione al menos un Registro';
      return;
    }
    if (this.editForm.valid) {
      if(this.seleccionados.length > 1){
        let indices = this.seleccionados.map(x=> x.codigoDetalleProgramacion);
        /*VALIDACIONES MULTIPLES*/
        let buque = this.seleccionados[0].nombreBuqueNaviera;
        let mismoBuque = true;


        let referencia = this.seleccionados[0].numeroReferenciaRepresentante;
        let referencias = '<li>'+this.seleccionados[0].numeroReferenciaRepresentante+'</li>';
        let mismaReferencia =  true;
        this.seleccionados.forEach(x => {
          if(x.nombreBuqueNaviera != buque){
            mismoBuque = false;
          }
          if(x.numeroReferenciaRepresentante != referencia){
            referencias += '<li>'+x.numeroReferenciaRepresentante+'</li>';
            mismaReferencia = false;
          }
        });
        if(!mismoBuque){
          Swal.fire({
            icon: 'error',
            title: 'Existió un error',
            text: 'Los detalles seleccionados no son del mismo grupo: BUQUE',
            confirmButtonText: 'Entiendo!',
            confirmButtonColor: '#224668'
          });
          this.actualizarInfo.emit(false);
          return;
        }
        const sas = '<ul>'+referencias+'</ul>';
        if(!mismaReferencia){
          Swal.fire({
            icon: 'question',
            html: '<div class="text-start ps-4">Usted está uniendo la(s) referencia(s) Num. '+sas+'<br>Esta seguro?</div>',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Confirmar',
            denyButtonText: 'Cancelar',
            confirmButtonColor: '#224668',
            denyButtonColor: '#DD3333',

          }).then((result) => {
            if (result.isConfirmed) {
              this.actualiarMultiple(indices);
            }
            this.actualizarInfo.emit(false);
          });
          return;
        }else{
          this.actualiarMultiple(indices);
        }
      }else {
        this.simple = {
          codigoDetalleProgramacion: parseInt(this.pedido.codigoDetalleProgramacion),
          numeroFacturaBaan: this.pedido.numeroFacturaBaan,
          fechaEmbarque: moment(this.editForm.controls.fechaEmbarque.value).format('DD/MM/YYYY'),
          esFechaRealEmbarque: this.editForm.controls.fechaReal.value == 1 ? true : false,
          estado: this.editForm.controls.estado.value ? 'ON HOLD' : this.pedido.estadoDetalle,
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
          let msgText = '';
          switch (result.return){
            case 0:
              Swal.fire({
                title: 'Correcto',
                icon: "success",
                text: 'Información actualizada correctamente',
                confirmButtonText: 'OK',
                confirmButtonColor: '#224668',
                showCloseButton: true,
                showCancelButton: false,
                showConfirmButton: true,
                showDenyButton: false,
              });
              break;
            case -1:
              msgText = 'Consulte al administrador';
              break;
            case 1:
              msgText = 'Detalle de programación no encontrado';
              break;
            case 2:
              msgText = 'Factura BAAN pertenece a otro pedido';
              break;
            case 3:
              msgText = 'Pedido ya enviado';
              break;
            case 4:
              msgText = 'Pedido siguiente ya enviado';
              break;
            case 5:
              msgText = 'Pedido estado ON HOLD';
              break;
            case 6:
              msgText = 'Pedido siguiente estado ON HOLD';
              break;
            default:
              msgText = 'Error general, consulte con el Administrador';
              break;
          }
          if(result.return != 0){
            Swal.fire({
              icon: 'error',
              title: 'Existió un error',
              text: msgText,
              confirmButtonText: 'Entiendo!',
              confirmButtonColor: '#224668'
            });
          }
          this.actualizarInfo.emit(false);
        });
      }
    }else{
      this.errorEstados = true;
      this.mensajeError = 'Complete los datos del formulario';
    }
  }

  private actualiarMultiple(indices: any){
    this.multiple = {
      codigoDetalleProgramacion: indices,
      actualizaNumeroFactura: false,
      numeroFacturaAnterior: this.seleccionados[0].numeroFacturaBaan,
      numeroFacturaBaan: this.seleccionados[0].numeroFacturaBaan,
      fechaEmbarque: moment(this.editForm.controls.fechaEmbarque.value).format('DD/MM/YYYY'),
      esFechaRealEmbarque: this.editForm.controls.fechaReal.value == 1 ? true : false,
      estado: this.editForm.controls.estado.value ? 'ON HOLD' : this.seleccionados[0].estadoProgramacion,
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
    let msgText = '';
    this._programacionService.actualizarInformacionMultiple(this.multiple)
      .subscribe((result: any) => {
        switch (result.return){
          case 0:
            Swal.fire({
              title: 'Correcto',
              icon: "success",
              text: 'Información actualizada correctamente',
              confirmButtonText: 'OK',
              confirmButtonColor: '#224668',
              showCloseButton: true,
              showCancelButton: false,
              showConfirmButton: true,
              showDenyButton: false,
            });
            break;
          case -1:
            msgText = 'Consulte al administrador';
            break;
          case 1:
            msgText = 'Detalle de programación no encontrado';
            break;
          case 2:
            msgText = 'Factura BAAN pertenece a otro pedido';
            break;
          case 3:
            msgText = 'Pedido ya enviado';
            break;
          case 4:
            msgText = 'Pedido siguiente ya enviado';
            break;
          case 5:
            msgText = 'Pedido estado ON HOLD';
            break;
          case 6:
            msgText = 'Pedido siguiente estado ON HOLD';
            break;
          default:
            msgText = 'Error general, consulte con el Administrador';
            break;
        }
        if(result.return != 0){
          Swal.fire({
            icon: 'error',
            title: 'Existió un error',
            text: msgText,
            confirmButtonText: 'Entiendo!',
            confirmButtonColor: '#224668'
          });
        }
        this.actualizarInfo.emit(false);
      }, (err) => {
        console.log(err);
      });
  }
  public factura(){
    console.log('Consumiendo servicio factura');
    // this._programacionService.mostrarFactura(this.pedido.numeroFacturaBaan,this.pedido.fechaTentativaEmbarque, this.pedido.numeroFacturaBaan,this.pedido.descripcionFormaPago);
    this._programacionService.mostrarFactura(this.pedido.numeroFacturaBaan,this.pedido.fechaTentativaEmbarque,'FEU100','200')
      .subscribe((rsp: any) => {
        let fileName = 'Factura-'+this.pedido.numeroFacturaBaan+'.xlsx';
        let blob: Blob = rsp.body as Blob;
        let a = document.createElement('a');
        a.download = fileName;
        a.href = window.URL.createObjectURL(blob);
        a.click();
      });
  }

  validateForm() {
    return true;
  }


}
