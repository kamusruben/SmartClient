import {Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
import {
  ColDef, ExcelStyle,
  GridReadyEvent,
  RowSelectedEvent,
  SelectionChangedEvent
} from "ag-grid-community";
import {Mockup} from "../../../mockup/mockup";
import {Pedido} from '../../../util/custom-data-types/pedido';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDatepicker} from "@angular/material/datepicker";
import * as moment from 'moment';
import {AgGridCdt} from "../../../util/custom-data-types/ag-grid-cdt";
import { TrashButtonComponent } from "../botones/trash-button.component";
import {estadoEnum} from "../../../util/enum/estado.enum";
import {MatSlideToggle} from "@angular/material/slide-toggle";
// import { Alertify } from "./../../../util/libraries/alertify";
declare let alertify: any;

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {

  // protected alertify: Alertify;
  public columnDefs: ColDef[] = [];
  rowSelection: 'single' | 'multiple';
  public defaultColDef: {};
  private mockup: Mockup = new Mockup();
  public pedidosTodos: Pedido[] = [];
  public pedidosFiltrados: Pedido[] = [];
  public pedido: Pedido;
  public filterForm: FormGroup;
  /* Filtro de embarque */
  public estadosFiltrados: string[];
  /* Filtro de embarque */
  public hoy = moment();
  public finMes = moment().endOf('month');
  /* Filtro Cliente */
  public clientes: string[];
  /* Filtro Producto */
  public productosFiltrados: Observable<string[]>;
  public productos: string[];
  /* Filtro Destino */
  public destinosFiltrados: Observable<string[]>;
  public destinos: string[];



  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  public estados = estadoEnum;
  @ViewChildren("toggleElement") ref: QueryList<MatSlideToggle>;

  /*DatePicker*/
  minDate: Date;
  maxDate: Date;
  picker: any;
  picker2: any;

  /*Select*/
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);


  constructor(private fb: FormBuilder) {
    // this.alertify = Alertify.instance;
  }

  ngOnInit(): void {
    console.log('El hoy es: ');

    // INICIALIZAR
    // Filtro Cliente
    this.clientes = [];
    this.productos = [];
    this.destinos = [];
    this.estadosFiltrados = [];


    //Inicialización del formulario
    this.filterForm = this.fb.group({
      estado: new FormControl(null, Validators.required),
      embarqueDesde: new FormControl(this.hoy.toDate(), Validators.required),
      embarqueHasta: new FormControl(this.finMes.toDate(), Validators.required),
      producto: new FormControl(),
      destino: new FormControl(),
    });

    this.mockup = new Mockup();
    this.pedidosTodos = this.mockup.getPedidos();
    this.pedidosFiltrados = this.mockup.getPedidos();
    this.columnDefs = this.mockup.getColDefs();
    this.columnDefs[0].cellRenderer = TrashButtonComponent;
    this.columnDefs[0].cellRendererParams= {
        clicked: (event: any, type: string) => {
          this.pedido = event.data;
          if(type == 'remove'){
            this.removeElement(this.pedido);
          }
        },
      };
    this.productosFiltrados = this.filterForm.controls['producto'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', 'producto')),
    );
    this.destinosFiltrados = this.filterForm.controls['destino'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '', 'destino')),
    );

    this.rowSelection = 'single';
    this.defaultColDef = {
      // editable: true,
      sortable: true,
      flex: 0,
      // minWidth: 150,
      // filter: true,
      // floatingFilter: true,
      // resizable: true,
    };

    // FILTTRADOS
    this.pedidosTodos.forEach((item)=>{
      /* Clientes */
      if(!this.clientes.includes(item.cliente)){
        this.clientes.push(item.cliente);
      }
      /* Productos */
      if(!this.productos.includes(item.producto)){
        this.productos.push(item.producto);
      }
      /* Destinos */
      if(!this.destinos.includes(item.destino)){
        this.destinos.push(item.destino);
      }
    });
  }

  private _filter(value: string, element: string): string[] {
    const filterValue = value.toLowerCase();
    switch (element){
      case 'destino':
        return this.destinos.filter(option => option.toLowerCase().includes(filterValue));
        break;
      case 'producto':
        return this.productos.filter(option => option.toLowerCase().includes(filterValue));
        break;
      default:
        return [];
        break;
    }
  }

  public onSelectionChanged(event: SelectionChangedEvent) {
    /*console.log('Se ha seleccionado');
    var rowCount = event.api.getSelectedNodes();
    console.log('Se tiene: ');
    console.log(rowCount);
    this.pedido = rowCount[0].data;
    console.log('EL PEDIDO ES:');
    console.log(this.pedido);*/
  }

  public removeElement(pedido: Pedido){
    alertify.confirm('Confirm Title', 'Esta seguro de eliminar el elemento', ()=>{
      alertify.success('Eliminado correctamente');
    }, ()=>{
      alertify.error('Cancel');
    })
  }

  public filtro(valor: any, tipo: string):void{
    this.pedidosFiltrados = [];
    this.pedidosFiltrados = this.pedidosTodos;
    let pedido = this.pedidosTodos[0];
    type ObjectKey = keyof typeof pedido;
    let prop: ObjectKey = tipo as ObjectKey;
    let value = valor.value;
    if(value != estadoEnum.TODOS && value != '') {
      this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x[prop] == value);
    }
  }

  public filtroEstado(valor: any, tipo: string, checked: boolean = true){
    this.pedidosFiltrados = [];

    if(checked && !this.estadosFiltrados.includes(valor)) {
      this.estadosFiltrados.push(valor);
    }else{
      let pos = this.estadosFiltrados.findIndex(x => x == valor);
      this.estadosFiltrados.splice(pos,1);
    }
    this.pedidosTodos.forEach(item => {
      if(this.estadosFiltrados.includes(item.estado)){
        this.pedidosFiltrados.push(item);
      }
    });
    if(valor == this.estados.TODOS && checked){
      this.pedidosFiltrados = [];
      this.pedidosFiltrados = this.pedidosTodos;
      this.ref.forEach(x => x.checked = true);
    }
    if(valor == this.estados.TODOS && !checked){
      this.ref.forEach(x => x.checked = false);
      this.pedidosFiltrados = [];
      this.estadosFiltrados = [];
    }
  }

  public aplicarFiltros(){
    let desde = this.filterForm.controls['embarqueDesde'].value;
    let hasta = this.filterForm.controls['embarqueHasta'].value;
    this.filtro(this.filterForm.controls['estado'],'estado');
    this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.embarqueTentativo > desde && x.embarqueTentativo < hasta);
  }
  public limpiarFiltros(){
    this.ref.forEach(x => x.checked = false);
    this.filterForm.controls['estado'].setValue(this.estados.TODOS);
    this.pedidosFiltrados = this.pedidosTodos;
    this.estadosFiltrados = [];
  }
}
