// /*
//
// import {AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChild, ViewChildren} from '@angular/core';
// import {
//   ColDef, ExcelStyle, GridApi,
//   GridReadyEvent, Module,
//   RowSelectedEvent,
//   SelectionChangedEvent
// } from "ag-grid-community";
// import {Mockup} from "../../../mockup/mockup";
// import {Pedido, Programacion} from '../../../util/custom-data-types/pedido';
// import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
// import {Observable, forkJoin} from 'rxjs';
// import {finalize, map, startWith} from 'rxjs/operators';
// import {MatDatepicker} from "@angular/material/datepicker";
// import * as moment from 'moment';
// import {AgGridCdt} from "../../../util/custom-data-types/ag-grid-cdt";
// import { TrashButtonComponent } from "../botones/trash-button.component";
// import { estadoProgramacionEnum } from "../../../util/enum/estadoProgramacion.enum";
// import { estadoCatalogoEnumEnum  } from "../../../util/enum/estadoCatalogoEnum.enum";
// import {MatSlideToggle} from "@angular/material/slide-toggle";
// import {CatalogosService} from "../../services/catalogos.service";
// import {Catalogo} from "../../../util/custom-data-types/catalogo";
// import {GetProgramacion} from "../../../util/custom-data-types/get-programacion";
// import { DateAdapter  } from "@angular/material/core"
// declare let alertify: any;
// // import '@ag-grid-community/all-modules/dist/styles/ag-grid.css';
// // import '@ag-grid-community/all-modules/dist/styles/ag-theme-alpine.css';
//
// // import { AllModules } from '@ag-grid-enterprise/all-modules';
// import {parse} from "@angular/compiler/src/render3/view/style_parser";
// import { ProgramacionService } from '../../services/programacion.service';
// import { UtilFunctions } from 'src/app/util/functions/util-functions';
//
// @Component({
//   selector: 'app-revision',
//   templateUrl: './revision.component.html',
//   styleUrls: ['./revision.component.scss']
// })
// export class RevisionComponent implements OnInit, AfterViewInit {
//
//   public errorDates:  boolean;
//   public errorMsg:  string;
//   /**
//    * AG GRID CONFIG
//    *
//   public cargandoRegistros: string;
//   public sinRegistro: string;
//   public gridApi: any;
//   // @ts-ignore
//   // public modules: Module[] = AllModules;
//   public excelStyles: ExcelStyle[];
//   public defaultExportParams: any;
//   /**
//    * CATALOGOS
//    *
//   public paises: Catalogo[];
//   public clientes: Catalogo[];
//   public representantes: Catalogo[];
//   public productos: Catalogo[];
//   public navieras: Catalogo[];
//   public marcas: Catalogo[];
//   // public destinos: Catalogo[];
//   // CATALOGOS
//   public elementos: string[];
//   public prefacturas: string[];
//   /** FUNCIONES UTILES *
//
//   private util = new UtilFunctions();
//
//   // protected alertify: Alertify;
//   public columnDefs: ColDef[] = [];
//   public rowSelection: 'single' | 'multiple' = 'multiple';
//   public defaultColDef: {};
//   private mockup: Mockup = new Mockup();
//   public pedidosTodos: Programacion[] = [];
//   public pedidosFiltrados: Programacion[] = [];
//   public programaciones: Programacion[];
//   public tempPedidosFiltrados: Programacion[] = [];
//   public pedido: Pedido;
//   public filterForm: FormGroup;
//   /* Filtro de embarque *
//   public estadosFiltrados: string[];
//   /* Filtro de embarque *
//   public hoy = moment();
//   public finMes = moment().endOf('month');
//
//   /* Filtro Producto *
//   public productosFiltrados: Observable<Catalogo[]>;
//   /* Filtro Destino *
//   // public destinosFiltrados: Observable<Catalogo[]>;
//   /* Filtro Contenedores *
//   public contenedoresFiltrados: Observable<string[]>;
//   /* Filtro Prefacturas *
//   public prefacturasFiltrados: Observable<string[]>;
//
//
//   public estados = estadoProgramacionEnum;
//   public estadosCatalogo = estadoCatalogoEnumEnum;
//   @ViewChildren("toggleElement") ref: QueryList<MatSlideToggle>;
//
//   /*DatePicker*
//   minDate: Date;
//   maxDate: Date;
//
//   constructor(
//       private fb: FormBuilder,
//       private _catalogoSevice: CatalogosService,
//       private _progService: ProgramacionService,
//       private dateAdapter: DateAdapter<any>) {
//     // this.alertify = Alertify.instance;
//     this.dateAdapter.setLocale('es-ES');
//   }
//
//   ngAfterViewInit() : void{
//     /***
//      * COLOCAR EN CHECK TODOS ESTADOS
//      *
//     this.estadosTodos();
//   }
//   ngOnInit(): void {
//
//     moment.locale('es');
//     this.cargandoRegistros = "<h5>Cargando información...</h5>";
//     this.sinRegistro = "<h5>No existen registros</h5>";
//     //>> LLAMADO A CATALOGOS
//     // this._catalogoSevice.getCatalogPaises().subscribe((result: any) => {
//     //   this.paises = result[0].items;
//     // });
//     /**
//      * TOMANDO INFORMACION DESDE CATALOGO MEDIANTE SERVICIOS
//      *
//     const catalogos = [];
//     catalogos.push(this._catalogoSevice.getClientePorEstado(this.estadosCatalogo.ACTIVO));
//     catalogos.push(this._catalogoSevice.getMarcaPorEstado(this.estadosCatalogo.ACTIVO));
//     catalogos.push(this._catalogoSevice.getProductoPorEstado(this.estadosCatalogo.ACTIVO));
//     catalogos.push(this._catalogoSevice.getPaisesPorUsuario('tmoscoso','COORDINADOR'));
//     catalogos.push(this._catalogoSevice.getNavieraPorPais('ACTIVO','tmoscoso','PER3'));
//     catalogos.push(this._catalogoSevice.getPuertoPorUsuarioPais('ACTIVO','tmoscoso','PER3'));
//     forkJoin(catalogos).subscribe((result: any[]) => {
//       this.clientes = result[0].return;
//       this.marcas = result[1].return;
//       this.productos = result[2].return;
//       this.paises = result[3].return;
//       this.navieras = result[4].return;
//       // this.destinos = result[5].return;
//       this.productosFiltrados = this.filterForm.controls['producto'].valueChanges.pipe(
//         startWith(''),
//         map(value => this._filter(value || '', 'producto')),
//       );
//       console.log('Paises');
//       console.log(result);
//     });
//     /** CONSULTA INICIAL DE INFORMACION *
//     let opciones: GetProgramacion = {};
//     opciones.porFecha = 'SI';
//     opciones.fechaDesde = '01/01/2000';
//     opciones.fechaHasta = '31/12/2023';
//     opciones.estado = 'EMBARCADO';
//     opciones.codigoPais = 'ECU';
//     opciones.idContenedor = 'RH618-3';
//     opciones.usuario = 'omoscoso';
//
//     opciones = this.completarGetProgramacion(opciones);
//
//     this._progService.getProgramacion(opciones).subscribe((result: any)=>{
//       console.log('Las programaciones son:');
//       this.pedidosFiltrados = result.return;
//       //this.programaciones = data;
//       console.log(this.programaciones);
//       //console.log(this.programaciones[0]);
//     });
//     // this.destinos = this._catalogoSevice.getMockDestinos();
//     // this.marcas = this._catalogoSevice.getMockMarcas();
//     // this.productos = this._catalogoSevice.getMockProductos();
//     // this.navieras = this._catalogoSevice.getMockNavieras();
//     // this.paises = this._catalogoSevice.getMockPaises();
//     // this.clientes = this._catalogoSevice.getMockClientes();
//     this.representantes = this._catalogoSevice.getMockRepresentantes();
//
//     /***
//      * INICIALIZAR EL FORMULARIO DE BUSQUEDA
//      *
//     this.filterForm = this.fb.group({
//       estado: new FormControl(null),
//       embarqueDesde: new FormControl(this.hoy.toDate()),
//       embarqueHasta: new FormControl(this.finMes.toDate()),
//       paisPlanta: new FormControl(),
//       representante: new FormControl(),
//       cliente: new FormControl(),
//       producto: new FormControl(),
//       naviera: new FormControl(),
//       marca: new FormControl(),
//       numeroContenedor: new FormControl(),
//       prefactura: new FormControl(),
//       destino: new FormControl(),
//     });
//
//     /**
//      * INICIALIZAR LOS FILTROS A LOS VALORES ADECUADOS
//      *
//
//     this.filterForm.controls['estado'].setValue(this.estados.TODOS);
//     this.filterForm.controls['paisPlanta'].setValue(this.estados.TODOS);
//     this.filterForm.controls['representante'].setValue(this.estados.TODOS);
//     this.filterForm.controls['cliente'].setValue(this.estados.TODOS);
//     this.filterForm.controls['naviera'].setValue(this.estados.TODOS);
//     this.filterForm.controls['producto'].setValue('');
//     this.filterForm.controls['naviera'].setValue(this.estados.TODOS);
//     this.filterForm.controls['marca'].setValue(this.estados.TODOS);
//     this.filterForm.controls['numeroContenedor'].setValue('');
//     this.filterForm.controls['prefactura'].setValue('');
//
//
//
//     // INICIALIZAR
//     // Filtro Cliente
//     //this.clientes = [];
//     // this.productos = [];
//     // this.destinos = [];
//     this.estadosFiltrados = [];
//
//     this.mockup = new Mockup();
//     // this.pedidosTodos = this.mockup.getPedidos();
//     // this.pedidosFiltrados = this.pedidosTodos;
//     this.tempPedidosFiltrados = Object.assign([], this.pedidosFiltrados);
//     this.excelStyles = [
//       {
//         id: 'header',
//         alignment: { vertical: 'Center' },
//         interior: {
//           color: '#1B4160',
//           pattern: 'Solid',
//         },
//         borders: {
//           borderBottom: {
//             color: '#000000',
//             lineStyle: 'Continuous',
//             weight: 1,
//           },
//         },
//         font: {
//           bold: true,
//           size: 14,
//           color: '#ffffff'
//         },
//       },
//       {
//         id: 'cell',
//         font: {
//           bold: false,
//           color: '#085353',
//         }
//       },
//       {
//         id: 'botones',
//         font: {
//           bold: false,
//           color: '#085353',
//         }
//       },
//     ];
//     this.columnDefs = this.mockup.getColDefs();
//     this.columnDefs[0].cellRenderer = TrashButtonComponent;
//     this.columnDefs[0].cellRendererParams= {
//         clicked: (event: any, type: string) => {
//           this.pedido = event.data;
//           if(type == 'remove'){
//             this.removeElement(this.pedido);
//           }
//         },
//       };
//
//     // this.destinosFiltrados = this.filterForm.controls['destino'].valueChanges.pipe(
//     //   startWith(''),
//     //   map(value => this._filter(value || '', 'destino')),
//     // );
//     this.contenedoresFiltrados = this.filterForm.controls['numeroContenedor'].valueChanges.pipe(
//       startWith(''),
//       map(value => this._filterString(value || '','numeroContenedor')),
//     );
//     this.prefacturasFiltrados = this.filterForm.controls['prefactura'].valueChanges.pipe(
//       startWith(''),
//       map(value => this._filterString(value || '', 'prefactAduana')),
//     );
//
//     // this.rowSelection = 'single';
//     this.defaultColDef = {
//       // editable: true,
//       // sortable: false,
//       // flex: 0,
//       // minWidth: 150,
//       // filter: true,
//       // floatingFilter: true,
//       // resizable: true,
//     };
//
//   }
//
//   private _filter(value: string, element: string): Catalogo[] {
//     const filterValue = value.toLowerCase();
//     switch (element){
//       // case 'destino':
//       //   return this.destinos.filter(option => option.nombre.toLowerCase().includes(filterValue));
//       //   break;
//       case 'producto':
//         debugger
//         if(this.productos.length > 0) {
//           return this.productos.filter(option => option.descripcionEspanol.toLowerCase().includes(filterValue));
//         }else{
//           return [];
//         }
//         break;
//       default:
//         return [];
//         break;
//     }
//   }
//   private _filterString(value: string, tipo: string): string[] {
//     const filterValue = value.toLowerCase();
//     let pedido = this.pedidosTodos[0];
//     type ObjectKey = keyof typeof pedido
//     let prop: ObjectKey = tipo as ObjectKey;
//
//     // @ts-ignore
//     let pedidos = this.pedidosTodos.filter(option => option[prop].toLowerCase().includes(filterValue));
//     this.elementos = [];
//     pedidos.forEach(item => {
//       let valor = item[prop] != '' ? item[prop] : 'N/A';
//       if(!this.elementos.includes(<string>valor)){
//         if (typeof valor === "string") {
//           this.elementos.push(valor)
//         }
//       }
//     });
//     return this.elementos;
//   }
//
//   public onSelectionChanged(event: SelectionChangedEvent) {
//     var selectedRows = this.gridApi.getSelectedRows();
//     var selectedRowsString = '';
//     var maxToShow = 5;
//     selectedRows.forEach(function (selectedRow: any, index:any) {
//       if (index >= maxToShow) {
//         return;
//       }
//       if (index > 0) {
//         selectedRowsString += ', ';
//       }
//       selectedRowsString += selectedRow.athlete;
//     });
//     console.log('selectedRowsString');
//     console.log(selectedRows);
//     /*console.log('Se ha seleccionado');
//     var rowCount = event.api.getSelectedNodes();
//     console.log('Se tiene: ');
//     console.log(rowCount);
//     this.pedido = rowCount[0].data;
//     console.log('EL PEDIDO ES:');
//     console.log(this.pedido);*
//   }
//
//   public removeElement(pedido: Pedido){
//     console.log(pedido);
//     alertify.confirm('Confirmar', '¿Esta seguro de eliminar el elemento<br/>'+pedido.refCliente, ()=>{
//       alertify.success('Eliminado correctamente');
//     }, ()=>{
//       alertify.error('Cancel');
//     }).set('labels',{ok: 'Aceptar',cancel:'Cancelar'});
//   }
//
//   public filtro(valor: any, tipo: string):void{
//     // this.pedidosFiltrados = [];
//     // this.pedidosFiltrados = this.pedidosTodos;
//     let pedido = this.pedidosTodos[0];
//     type ObjectKey = keyof typeof pedido;
//     let prop: ObjectKey = tipo as ObjectKey;
//
//     let value = valor.value;
//     /**
//      * EN CASO DE SER POR OBJETOS EL FILTRADO
//      *
//     let catalogo = this.getCatalogo(tipo);
//     console.log('catalogo');
//     console.log(catalogo);
//     // si es de tipo objeto
//     let elemento:any;
//     // @ts-ignore
//     elemento = catalogo.hasOwnProperty('codigo') ? catalogo.find(x => x.codigo == parseInt(value)) : catalogo.find(x => x == parseInt(value));
//     if(elemento != null) {
//       value = catalogo.hasOwnProperty('codigo') ? elemento.nombre : elemento;
//     }
//     if(value != estadoProgramacionEnum.TODOS && value != '') {
//       if((prop == 'numeroContenedor') && value == 'N/A') {
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x[prop] == '');
//       }else{
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x[prop] == value);
//       }
//     }
//   }
//
//   public getCatalogo(tipo: string){
//     switch (tipo){
//       case 'producto':
//         return this.productos;
//         break;
//       case 'paisPlanta':
//         return this.paises;
//         break;
//       case 'cliente':
//         return this.clientes;
//         break;
//       case 'refRep':
//         return this.representantes;
//         break;
//       case 'naviera':
//         return this.navieras;
//         break;
//       case 'marca':
//         return this.marcas;
//         break;
//       case 'numeroContenedor':
//       case 'prefactAduana':
//         return this.elementos;
//         break;
//       default:
//         return [];
//     }
//   }
//
//   public filtroEstado(valor: any, tipo: string, checked: boolean = true){
//     this.pedidosFiltrados = this.tempPedidosFiltrados;
//     let tempPedidosFiltrados = Object.assign([], this.pedidosFiltrados);
//     this.pedidosFiltrados = [];
//     if(checked && !this.estadosFiltrados.includes(valor) && valor != this.estados.TODOS) {
//       this.estadosFiltrados.push(valor);
//     }else{
//       let pos = this.estadosFiltrados.findIndex(x => x == valor);
//       this.estadosFiltrados.splice(pos,1);
//     }
//     if(valor == this.estados.TODOS && checked){
//       this.pedidosFiltrados = [];
//       let estados = Object.keys(this.estados);
//       estados.forEach(x=>{
//         // @ts-ignore
//         if(x != this.estados.TODOS){
//           this.estadosFiltrados.push(x);
//         }
//       });
//       // this.pedidosFiltrados = this.pedidosTodos;
//       // this.pedidosFiltrados = this.tempPedidosFiltrados;
//       this.ref.forEach(x => x.checked = true);
//     }
//     if((valor == this.estados.TODOS && !checked) || (this.estadosFiltrados.length == 0)){
//       this.ref.forEach(x => x.checked = false);
//       this.pedidosFiltrados = [];
//       this.estadosFiltrados = [];
//     }
//     tempPedidosFiltrados.forEach(item => {
//       if(this.estadosFiltrados.includes(item.estado)){
//         this.pedidosFiltrados.push(item);
//       }
//     });
//   }
//
//   public aplicarFiltros(){
//     //Iniciar con todos los pedidos
//     this.pedidosFiltrados = this.pedidosTodos;
//     // Aplicar filtros
//     let desde = this.filterForm.controls['embarqueDesde'].value;
//     let hasta = this.filterForm.controls['embarqueHasta'].value;
//
//     /**
//      * Validaciones
//      *
//     if(desde > hasta){
//       this.errorDates = true;
//       this.errorMsg = 'Las fechas no son válidas';
//       return;
//     }
//     // this.filtro(this.filterForm.controls['estado'],'estado');
//     this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.fechaTentativaEmbarque > desde && x.fechaTentativaEmbarque < hasta);
//     //filtro Pais Planta
//     // let ppCodigo = this.filterForm.controls['paisPlanta'].value;
//     // if(ppCodigo != null && ppCodigo != estadoProgramacionEnum.TODOS) {
//     //   let paisPlanta = this.paises.find(x => x.codigo == ppCodigo);
//     //   if(paisPlanta != null) {
//     //     this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.paisPlanta == paisPlanta.nombre);
//     //   }
//     // }
//     //filtro Representante
//     let rCodigo = this.filterForm.controls['representante'].value;
//     if(rCodigo != null && rCodigo != estadoProgramacionEnum.TODOS) {
//       let representante = this.representantes.find(x => x.codigo == rCodigo);
//       if(representante != null) {
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.nombreRepresentante == representante.nombre);
//       }
//     }
//     //filtro Cliente
//     let clCodigo = this.filterForm.controls['cliente'].value;
//     if(clCodigo != null && clCodigo != estadoProgramacionEnum.TODOS) {
//       let cliente = this.clientes.find(x => x.codigo == clCodigo);
//       if(cliente != null) {
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.nombreCliente == cliente.nombre);
//       }
//     }
//     //filtro Producto
//     let prCodigo = this.filterForm.controls['producto'].value;
//     if(prCodigo != null && prCodigo != '') {
//       let producto = this.productos.find(x => x.nombre == prCodigo);
//       if(producto != null) {
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.descripcionProducto == producto.nombre);
//       }
//     }
//     //filtro Naviera
//     let navCodigo = this.filterForm.controls['naviera'].value;
//     if(navCodigo != null && navCodigo != estadoProgramacionEnum.TODOS) {
//       let naviera = this.navieras.find(x => x.codigo == navCodigo);
//       if(naviera != null) {
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.nombreNaviera == naviera.nombre);
//       }
//     }
//     //filtro Naviera
//     let marCodigo = this.filterForm.controls['marca'].value;
//     if(marCodigo != null && marCodigo != estadoProgramacionEnum.TODOS) {
//       let marca = this.marcas.find(x => x.codigo == marCodigo);
//       if(marca != null) {
//         this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.descripcionMarca == marca.nombre);
//       }
//     }
//     //filtro Contenedor
//     let contCodigo = this.filterForm.controls['numeroContenedor'].value;
//     if(contCodigo != null && contCodigo != '') {
//       this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.numeroContenedor == contCodigo);
//     }
//     //filtro Prefactura Aduana
//     /*let prefCodigo = this.filterForm.controls['prefactura'].value;
//     if(prefCodigo != null && prefCodigo != '') {
//       this.pedidosFiltrados = this.pedidosFiltrados.filter(x => x.prefactAduana == prefCodigo);
//     }*
//     this.tempPedidosFiltrados = Object.assign([], this.pedidosFiltrados);
//     if(this.tempPedidosFiltrados.length == 0){
//       alertify.alert('Notificación','No se encontraron registros para la búsqueda');
//     }
//   }
//   public limpiarFiltros(){
//     this.ref.forEach(x => x.checked = false);
//     // this.filterForm.controls['embarqueDesde'].setValue(new Date());
//     // this.filterForm.controls['embarqueHasta'].setValue(new Date());
//     this.filterForm.controls['estado'].setValue(this.estados.TODOS);
//     this.filterForm.controls['paisPlanta'].setValue(this.estados.TODOS);
//     this.filterForm.controls['representante'].setValue(this.estados.TODOS);
//     this.filterForm.controls['cliente'].setValue(this.estados.TODOS);
//     this.filterForm.controls['naviera'].setValue(this.estados.TODOS);
//     this.filterForm.controls['producto'].setValue('');
//     this.filterForm.controls['naviera'].setValue(this.estados.TODOS);
//     this.filterForm.controls['marca'].setValue(this.estados.TODOS);
//     this.filterForm.controls['numeroContenedor'].setValue('');
//     this.filterForm.controls['prefactura'].setValue('');
//     this.estadosTodos();
//     this.aplicarFiltros();
//     this.estadosFiltrados = [];
//   }
//
//   private estadosTodos(){
//     this.ref.forEach(x => x.checked = true);
//     // Colocar todos los estados
//     let estados = Object.keys(this.estados);
//     estados.forEach(x=>{
//       // @ts-ignore
//       if(x != this.estados.TODOS){
//         this.estadosFiltrados.push(x);
//       }
//     });
//     this.ref.forEach(x => x.checked = true);
//   }
//   public onGridReady(params: any){
//     console.log('Se carga la información');
//     this.gridApi = params.api;
//     console.log(this.gridApi);
//   }
//   public exportar(){
//     debugger
//     this.gridApi.exportDataAsExcel({ fileName: 'registro'});
//   }
//
//   /*** COMPLETAR PARAMETROS *
//   private completarGetProgramacion(opciones: GetProgramacion){
//     opciones.porFecha             = this.util.nullOrEmpty(opciones.porFecha) ? 'SI' : opciones.porFecha;
//     opciones.fechaDesde           = this.util.nullOrEmpty(opciones.fechaDesde) ? '01/01/2000' : opciones.fechaDesde;
//     opciones.fechaHasta           = this.util.nullOrEmpty(opciones.fechaHasta) ? '31/12/2023' : opciones.fechaHasta;
//     opciones.codigoCliente        = this.util.nullOrEmpty(opciones.codigoCliente) ? 'TODOS' : opciones.codigoCliente;
//     opciones.codigoProducto       = this.util.nullOrEmpty(opciones.codigoProducto) ? 'TODOS' : opciones.codigoProducto;
//     opciones.codigoMarca          = this.util.nullOrEmpty(opciones.codigoMarca) ? 'TODOS' : opciones.codigoMarca;
//     opciones.codigoPuertoDestino  = this.util.nullOrEmpty(opciones.codigoPuertoDestino) ? 'TODOS' : opciones.codigoPuertoDestino;
//     opciones.numeroConsecutivo    = this.util.nullOrEmpty(opciones.numeroConsecutivo) ? '*' : opciones.numeroConsecutivo;
//     opciones.codigoProforma       = this.util.nullOrEmpty(opciones.codigoProforma) ? '*' : opciones.codigoProforma;
//     opciones.idContenedor         = this.util.nullOrEmpty(opciones.idContenedor) ? '*' : '*'+opciones.idContenedor+'*';
//     opciones.numeroFactura        = this.util.nullOrEmpty(opciones.numeroFactura) ? '*' : opciones.numeroFactura;
//     opciones.estado               = this.util.nullOrEmpty(opciones.estado) ? 'EMBARCADO' : opciones.estado;
//     opciones.codigoRepresentante  = this.util.nullOrEmpty(opciones.codigoRepresentante) ? '*' : opciones.codigoRepresentante;
//     opciones.codigoNaviera        = this.util.nullOrEmpty(opciones.codigoNaviera) ? '*' : opciones.codigoNaviera;
//     opciones.codigoPais           = this.util.nullOrEmpty(opciones.codigoPais) ? 'ECU' : opciones.codigoPais;
//     opciones.usuario              = this.util.nullOrEmpty(opciones.usuario) ? 'omoscoso' : opciones.usuario;
//
//     return opciones;
//
//   }
// }
// */
