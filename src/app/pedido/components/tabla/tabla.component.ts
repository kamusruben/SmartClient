import {
  AfterContentChecked,
  AfterContentInit, AfterViewChecked,
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren
} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from "@angular/forms";
import {Catalogo, Representante} from "../../../util/custom-data-types/catalogo";
import {Observable, forkJoin} from "rxjs";
import {debounceTime, finalize, map, startWith} from 'rxjs/operators';
import {Programacion} from "../../../util/custom-data-types/pedido";
import {estadoProgramacionEnum} from "../../../util/enum/estadoProgramacion.enum";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import * as moment from 'moment';
import {ProgramacionService} from "../../services/programacion.service";
import {GetProgramacion} from "../../../util/custom-data-types/get-programacion";
import {UtilFunctions} from 'src/app/util/functions/util-functions';
import {
  ColDef, ColumnApi, ExcelStyle, GridApi,
  GridReadyEvent, Module,
  RowSelectedEvent,
  SelectionChangedEvent
} from "ag-grid-community";
import {Mockup} from "../../../mockup/mockup";
import {CatalogosService} from "../../services/catalogos.service";
import {estadoCatalogoEnumEnum} from "../../../util/enum/estadoCatalogoEnum.enum";
import {BotonesOpcionComponent} from "../botones/botonesOpcion.component";
import {AllModules} from '@ag-grid-enterprise/all-modules';
import {environment} from "../../../../environments/environment";
import {EspecificacionComponent} from "../especificacion/especificacion.component";
import {MatDialog} from "@angular/material/dialog";
import {KeycloakService} from "keycloak-angular";

@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit, AfterViewInit {
  public modules = AllModules;

  /** AG GRID */
  public columnDefs: ColDef[] = [];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public cargandoRegistros: string = '<h5>Cargando información...</h5>';
  public sinRegistro: string = '<h5>No existe información...</h5>';
  private gridApi!: GridApi;
  private gridColumnApi: ColumnApi;

  /** CATALOGOS */
  public paises: Catalogo[];
  public clientes: Catalogo[];
  public representantes: Representante[];
  public productos: Catalogo[];
  public navieras: Catalogo[];
  public puertos: Catalogo[];
  public marcas: Catalogo[];

  /** FILTROS */
  /* Filtro Producto */
  public productosFiltrados: Observable<Catalogo[]>;
  /* Filtro Destino */
  public destinosFiltrados: Observable<Catalogo[]>;
  /* Filtro Contenedores */
  public contenedoresFiltrados: Observable<string[]>;
  /* Filtro Prefacturas */
  public prefacturasFiltrados: Observable<string[]>;
  /* Filtro de embarque */
  public estadosFiltrados: string[];
  public errorEstados: boolean = false;
  public errorForm: boolean = false;

  /** ENUMERABLES */
  public estadosCatalogo = estadoCatalogoEnumEnum;
  public estados = estadoProgramacionEnum;

  /** FORMULARIO */
  public filterForm: FormGroup;

  /** VARIABLES DE INFORMACIÓN */
  public spinner: boolean = false;
  private usuario: string;
  private pais: string;
  private rol: string;
  public fechasValidas: boolean = true;
  public fechasMaximas: boolean = true;
  public errorFechas: string;
  private inicioDesde: any;
  private finDesde: any;


  public tempPedidosFiltrados: Programacion[] = [];
  public pedidosFiltrados: Programacion[] = [];
  public pedidosSeleccionados: Programacion[] = [];
  public pedido: Programacion;

  private util = new UtilFunctions();


  private mockup: Mockup = new Mockup();

  constructor(private fb: FormBuilder,
              private _progService: ProgramacionService,
              private _catalogoSevice: CatalogosService,
              private _dialog: MatDialog,
              private _keycloak: KeycloakService) {
  }


  @ViewChildren("toggleElement") status: QueryList<MatSlideToggle>;

  ngAfterViewInit(): void {
    /***
     * COLOCAR EN CHECK TODOS ESTADOS
     */
    //debugger
    setTimeout(() => {
      this.estadosTodos();
    },100);
    //this.estadosTodos();
  }

  ngOnInit(): void {
    this.errorEstados = false;
    this.errorForm = false;
    moment.locale('es');
    this.spinner = true;

    // this.inicioDesde = moment().subtract(1, 'months').startOf('month');
    // this.finDesde = moment().subtract(1, 'months').endOf('month');

    this.inicioDesde = moment().set('month',7).set('date',25).set('year',2016);
    this.finDesde = moment().set('month',7).set('date',25).set('year',2016);
    /** >>>> MODIFICAR USUARIO */

    this.usuario = this._keycloak.getUsername();
    this.pais = '';// 'ECU';
    this.rol = environment.rolCoordinador;


    /* DEFINICION DE COLUMNAS */
    this.columnDefs = [
      {field: 'botones', minWidth: 100},
      {field: 'planta', minWidth: 220, resizable: true},
      //{field: 'fechaTentativaEmbarque', headerName: 'Embarq. Tent.', minWidth: 120, resizable: true},
      {field: 'pais', headerName: 'País Planta', minWidth: 120, resizable: true},
      {field: 'refCliente', headerName: 'Ref. Cliente', minWidth: 120, resizable: true},
      {field: 'fechaRequeridaCliente', headerName: 'Req. x Cliente', minWidth: 120, resizable: true},
      {field: 'numeroReferenciaRepresentante', headerName: 'Ref. Rep', minWidth: 120, resizable: true},
      {field: 'numeroContenedor', headerName: 'FCL', minWidth: 60, resizable: false},
      {field: 'descripcionTamanoContenedor', headerName: 'Tam. Cont.', minWidth: 120, resizable: true},
      {field: 'numeroFacturaBaan', headerName: 'Prefact Aduana', minWidth: 140, resizable: true},
      {field: 'numeroFacturaSRI', headerName: 'Factura SRI', minWidth: 120, resizable: true},
      {field: 'numeroContenedorCliente', headerName: 'Sec.', minWidth: 70, resizable: false},
      {field: 'nombreCliente', headerName: 'Cliente', resizable: true, minWidth: 250},
      {field: 'descripcionMarca', headerName: 'Marca', minWidth: 200, resizable: true},
      {field: 'numeroCajas', headerName: 'Cajas', minWidth: 120, resizable: true},
      {field: 'descripcionProducto', headerName: 'Producto', resizable: true, minWidth: 250},
      {field: 'descripcionUnidadesCaja', headerName: 'Unid/Caja', minWidth: 120, resizable: true},
      {field: 'nombrePuertoDestino', headerName: 'Destino', minWidth: 120, resizable: true},
      {field: 'fechaTermino', headerName: 'Término', minWidth: 120, resizable: true},
      {field: 'fechaFinCuarentena', headerName: 'Fin Cuarentena', minWidth: 140, resizable: true},
      {field: 'fechaEtiquetadoFinal', headerName: 'Etiq. Final', minWidth: 120, resizable: true},
      {field: 'fechaCarga', headerName: 'Carga', minWidth: 120, resizable: true},
      {field: 'fechaTentativaEmbarque', headerName: 'Embarq. Tent.', minWidth: 120, resizable: true},
      {field: 'fechaRealEmbarque', headerName: 'Embarq. Real', minWidth: 120, resizable: true},
      {field: 'fechaFacturacion', headerName: 'Fecha de Facturación', minWidth: 180, resizable: true},
      {field: 'nombreNaviera', headerName: 'Naviera', minWidth: 220, resizable: true},
      {field: 'nombreBuqueNaviera', headerName: 'Buque', minWidth: 220, resizable: true},
      {field: 'identificadorContenedor', headerName: 'Nro. Contenedor', minWidth: 160, resizable: true},
      {field: 'numeroSello', headerName: '# Sellos', minWidth: 180, resizable: true},
      {field: 'numeroBL', headerName: '# BL', minWidth: 120, resizable: true},
      {field: 'estadoDetalle', headerName: 'Estado', minWidth: 200, resizable: true},
      // { field: 'estadoProgramacion', headerName: 'Estado' },
      {field: 'comentariosInaexpo', headerName: 'Comentarios Inaexpo', minWidth: 300, resizable: true},
      {field: 'nombreTransportista', headerName: 'Transportista Terrestre', minWidth: 200, resizable: true},
      {field: 'valorFlete', headerName: 'Flete Terrestre', minWidth: 140, resizable: true},
      {field: 'nombrePuertoOrigen', headerName: 'Puerto Origen', minWidth: 220, resizable: true},
      {field: 'fleteMaritimo', headerName: 'Flete Marítimo', minWidth: 140, resizable: true},
    ];

    this.columnDefs[0].cellRenderer = BotonesOpcionComponent;
    this.columnDefs[0].cellRendererParams = {
      clicked: (event: any, type: string) => {
        this.pedido = event.data;
        // if(type == 'remove'){
        //   this.removeElement(this.pedido);
        // }
      },
    };

    /* DEFINICION  DE FORMULARIO */
    this.filterForm = this.fb.group({
      fechaTentativa: new FormControl(true),
      estado: new FormControl(null),
      embarqueDesde: new FormControl(this.inicioDesde),        //b
      embarqueHasta: new FormControl(this.finDesde),     //c
      paisPlanta: new FormControl(null,Validators.required),                            //o
      representante: new FormControl('TODOS'),         //m
      cliente: new FormControl('TODOS'),               //d
      producto: new FormControl(''),              //e
      naviera: new FormControl('TODOS'),               //n
      puerto: new FormControl('TODOS'),               //g
      marca: new FormControl('TODOS'),                 //f
      numeroContenedor: new FormControl(null),    //j
      prefactura: new FormControl(),                            //k
      destino: new FormControl('TODOS'),               //g
    });

    /** DESHABILITAR FILTROS SELECT */
    this.filterForm.controls.representante.disable();
    this.filterForm.controls.naviera.disable();
    this.filterForm.controls.puerto.disable();
    this.filterForm.controls.producto.disable();
    this.filterForm.controls.cliente.disable();
    this.filterForm.controls.marca.disable();

    /** CAMBIO DE PAIS */
    this.filterForm.controls.paisPlanta.valueChanges.subscribe((valor)=>{
      const catalogos = [];
      catalogos.push(this._catalogoSevice.getPuertoPorUsuarioPais(this.estadosCatalogo.ACTIVO, this.usuario, valor));
      catalogos.push(this._catalogoSevice.getRepresentantePorPais(valor));
      catalogos.push(this._catalogoSevice.getNavieraPorPais(this.estadosCatalogo.ACTIVO, this.usuario, valor));
      forkJoin(catalogos).subscribe((result: any[]) => {
        this.puertos = result[0].return;
        this.representantes = result[1].return;
        this.navieras = result[2].return;
        this.filterForm.controls.representante.enable();
        this.filterForm.controls.cliente.enable();
        this.filterForm.controls.producto.enable();
        this.filterForm.controls.naviera.enable();
        this.filterForm.controls.puerto.enable();
        this.filterForm.controls.marca.enable();
      });

    });

    /** CONSULTAR CATALOGOS */
    const catalogos = [];

    catalogos.push(this._catalogoSevice.getClientePorEstado(this.estadosCatalogo.ACTIVO));
    catalogos.push(this._catalogoSevice.getMarcaPorEstado(this.estadosCatalogo.ACTIVO));
    catalogos.push(this._catalogoSevice.getProductoPorEstado(this.estadosCatalogo.ACTIVO));
    catalogos.push(this._catalogoSevice.getPaisesPorUsuario(this.usuario, this.rol));
    catalogos.push(this._catalogoSevice.getNavieraPorPais(this.estadosCatalogo.ACTIVO, this.usuario, this.pais));
    catalogos.push(this._catalogoSevice.getPuertoPorUsuarioPais(this.estadosCatalogo.ACTIVO, this.usuario, this.pais));
    catalogos.push(this._catalogoSevice.getRepresentantePorPais(this.pais));
    catalogos.push(this._catalogoSevice.getRepresentantePorPais(this.pais));
    forkJoin(catalogos).subscribe((result: any[]) => {
      this.clientes = result[0].return;
      this.marcas = result[1].return;
      this.productos = result[2].return;
      this.paises = result[3].return;
      this.navieras = result[4].return;
      this.puertos = result[5].return;
      this.representantes = result[6].return;

      this.productosFiltrados = this.filterForm.controls['producto'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', 'producto')),
      );
    });

    /** CONSULTAR PROGRAMACION */
    let opciones: GetProgramacion = {};
    opciones.porFecha = 'SI';
    opciones.fechaDesde = this.inicioDesde.format('DD/MM/YYYY');// '24/08/2016';
    opciones.fechaHasta = this.finDesde.format('DD/MM/YYYY');// '26/08/2016';
    opciones.estado = 'EMBARCADO';
    opciones.codigoPais = 'ECU';
    opciones.idContenedor = '';
    opciones.usuario = this.usuario;

    opciones = this.completarGetProgramacion(opciones);

    this._progService.consultarProgramacion(opciones).subscribe((result: any) => {
      this.pedidosFiltrados = result.return;
      this.spinner = false;
    });
  }

  public actualizarInfo(spinner: any) {
    this.spinner = spinner;
  }

  public onGridReady(params: any) {
    this.gridColumnApi = params.columnApi;
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
  }

  public filtroEstado(valor: any, tipo: string, checked: boolean = true):void {
    // this.pedidosFiltrados = this.tempPedidosFiltrados;
    // let tempPedidosFiltrados = Object.assign([], this.pedidosFiltrados);
    // this.pedidosFiltrados = [];

    if (checked && !this.estadosFiltrados.includes(valor) && valor != this.estados.TODOS) {
      this.estadosFiltrados.push(valor);
      let estados = Object.keys(this.estados);
      if(this.estadosFiltrados.length == estados.length -1 && !this.estadosFiltrados.includes('TODOS')){
        this.status.forEach(x => {
          if(x.name == this.estados.TODOS){
            x.checked = true;
          }
        });
      }

    } else {
      this.status.forEach(x => {
        if(x.name == this.estados.TODOS){
          x.checked = false;
        }
      });
      let pos = this.estadosFiltrados.findIndex(x => x == valor);
      this.estadosFiltrados.splice(pos, 1);
    }
    if (valor == this.estados.TODOS && checked) {
      // this.pedidosFiltrados = [];
      let estados = Object.keys(this.estados);
      estados.forEach(x => {
        // @ts-ignore
        if (x != this.estados.TODOS) {
          this.estadosFiltrados.push(x);
        }
      });
      // this.pedidosFiltrados = this.pedidosTodos;
      // this.pedidosFiltrados = this.tempPedidosFiltrados;
      this.status.forEach(x => x.checked = true);
    }
    if ((valor == this.estados.TODOS && !checked) || (this.estadosFiltrados.length == 0)) {
      this.status.forEach(x => x.checked = false);
      // this.pedidosFiltrados = [];
      this.estadosFiltrados = [];
    }
    // tempPedidosFiltrados.forEach(item => {
    //   if (this.estadosFiltrados.includes(item.estado)) {
    //     this.pedidosFiltrados.push(item);
    //   }
    // });
  }

  public limpiarFiltros():void {
    this.status.forEach(x => x.checked = false);
    // this.filterForm.controls['embarqueDesde'].setValue(new Date());
    // this.filterForm.controls['embarqueHasta'].setValue(new Date());
    this.filterForm.controls.estado.setValue(this.estados.TODOS);
    this.filterForm.controls.paisPlanta.setValue(this.estados.TODOS);
    this.filterForm.controls.representante.setValue(this.estados.TODOS);
    this.filterForm.controls.cliente.setValue(this.estados.TODOS);
    this.filterForm.controls.naviera.setValue(this.estados.TODOS);
    this.filterForm.controls.producto.setValue('');
    this.filterForm.controls.naviera.setValue(this.estados.TODOS);
    this.filterForm.controls.marca.setValue(this.estados.TODOS);
    this.filterForm.controls.numeroContenedor.setValue('');
    this.filterForm.controls.prefactura.setValue('');
    this.estadosTodos();
    // this.aplicarFiltros();
    this.estadosFiltrados = [];
    this.status.forEach(x => x.checked = false);
  }

  private estadosTodos():void {
    this.estadosFiltrados = [];
    this.status.forEach(x => x.checked = true);
    // Colocar todos los estados
    let estados = Object.keys(this.estados);
    estados.forEach(x => {
      // @ts-ignore
      if (x != this.estados.TODOS) {
        this.estadosFiltrados.push(x);
      }
    });
    this.status.forEach(x => x.checked = true);
  }

  public aplicarFiltros() {
    //Iniciar con todos los pedidos
    // this.pedidosFiltrados = this.pedidosTodos;
    // Aplicar filtros
    let desde = this.filterForm.controls.embarqueDesde.value;
    let hasta = this.filterForm.controls.embarqueHasta.value;

    if(hasta.diff(desde,'years') > 2){
      this.fechasMaximas = false;
      this.errorFechas = 'Consulta máxima permitida (2 años)';
      return;
    }
    /**
     * Validaciones
     */
    //Fecha hasta no puede ser mayor a fecha desde
    if (desde.diff(hasta,'days')>0) {
      this.fechasValidas = false;
      this.errorFechas = 'Las fechas no son correctas';
      return;
    }
    this.fechasValidas = true;
    this.fechasMaximas = true;

    //filtro Pais Planta
    let ppCodigo = this.filterForm.controls.paisPlanta.value;
    //filtro Producto
    let prCodigo = this.filterForm.controls.producto.value;
    let prod = 'TODOS';
    if (prCodigo != null && prCodigo != '') {
      let prodCatalogo = this.productos.find(x => x.descripcionEspanol == prCodigo);
      prod = prodCatalogo.codigo;
    }

    let idc = this.util.nullOrEmpty(this.filterForm.controls.numeroContenedor.value) ? '*' : this.filterForm.controls.numeroContenedor.value;
    let rep = this.util.nullOrEmpty(this.filterForm.controls.representante.value) ? '*' : this.filterForm.controls.representante.value;
    let cli = this.util.nullOrEmpty(this.filterForm.controls.cliente.value) ? 'TODOS' : this.filterForm.controls.cliente.value;
    let nav = this.util.nullOrEmpty(this.filterForm.controls.naviera.value) ? '*' : this.filterForm.controls.naviera.value;
    let marca = this.util.nullOrEmpty(this.filterForm.controls.marca.value) ? 'TODOS' : this.filterForm.controls.marca.value;

    if (this.filterForm.valid) {

      /** CONSULTAR PROGRAMACION */
      let opciones: GetProgramacion = {};
      opciones.porFecha = this.filterForm.controls.fechaTentativa.value ? 'SI' : 'NO';
      opciones.fechaDesde = desde.format('L');
      opciones.fechaHasta = hasta.format('L');
      opciones.estado = 'EMBARCADO';
      opciones.codigoPais = this.filterForm.controls['paisPlanta'].value;
      opciones.idContenedor = idc;
      opciones.usuario = 'omoscoso';
      opciones.codigoRepresentante = rep;
      opciones.codigoCliente = cli;
      opciones.codigoProducto = prod;
      opciones.codigoNaviera = nav;
      opciones.codigoMarca = marca;

      opciones = this.completarGetProgramacion(opciones);

      this.sinRegistro = '<h5>Cargando información...</h5>'

      let registros:any[] = [];
      this.errorForm = false;
      if(this.estadosFiltrados.length > 0) {
        this.spinner = true;
        const ar = this.estadosFiltrados.join(";");
        console.log('Todos los estados son: '  + ar);
        opciones.estado = ar;
        /*this.estadosFiltrados.forEach(x => {
          opciones.estado = x;
          registros.push(this._progService.consultarProgramacion(opciones));
        });*/
        registros.push(this._progService.consultarProgramacion(opciones));
        this.pedidosFiltrados = [];
        forkJoin(registros).pipe(finalize(() => {
          this.sinRegistro = this.pedidosFiltrados.length == 0 ? '<h5>No existe información para estos filtros</h5>' : '';
          this.spinner = false;
        })).subscribe((result: any[]) => {
          this.pedidosFiltrados = result[0].return;
          for(var i=1; i<registros.length; i++){
            const uno = result[i].return;
            this.pedidosFiltrados = this.pedidosFiltrados.concat(uno);
          }
        });
      }else{
        this.errorEstados = true;
      }
    }else{
      this.errorForm = true;
    }
  }

  public onSelectionChanged(event: SelectionChangedEvent) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.pedidosSeleccionados = selectedRows;
    this.pedido = this.pedidosSeleccionados[0];
  }

  exportAsExcel(filename?: string): void {
    const params = {
      columnGroups: true,
      allColumns: true,
      fileName: 'Filename',
    };
    this.gridApi.exportDataAsCsv(params);
    // this.gridApi.exportDataAsExcel();
    // this.gridApi.exportDataAsExcel({
    //   columnKeys: this.generateColumnsForExcel(),
    //   processCellCallback: function (params) {
    //     if (params.column.getColId() === 'currentPrice') {
    //       return params.value?.amount + ' ' + params.value?.currency;
    //     }
    //     return params.value;
    //   }
    // })
  }

  generateColumnsForExcel(): string[] {
    const keys = this.gridColumnApi
      .getAllDisplayedColumns()
      .map(column => column.getColId())

    const amountIndex: number = keys.findIndex(column => column === 'newPrice');
    keys.splice(amountIndex + 1, 0, 'currency');

    return keys;
  }

  /*** COMPLETAR PARAMETROS */
  private completarGetProgramacion(opciones: GetProgramacion) {
    opciones.porFecha = this.util.nullOrEmpty(opciones.porFecha) ? 'SI' : opciones.porFecha;
    opciones.fechaDesde = this.util.nullOrEmpty(opciones.fechaDesde) ? '01/01/2000' : opciones.fechaDesde;
    opciones.fechaHasta = this.util.nullOrEmpty(opciones.fechaHasta) ? '31/12/2023' : opciones.fechaHasta;
    opciones.codigoCliente = this.util.nullOrEmpty(opciones.codigoCliente) ? 'TODOS' : opciones.codigoCliente;
    opciones.codigoProducto = this.util.nullOrEmpty(opciones.codigoProducto) ? 'TODOS' : opciones.codigoProducto;
    opciones.codigoMarca = this.util.nullOrEmpty(opciones.codigoMarca) ? 'TODOS' : opciones.codigoMarca;
    opciones.codigoPuertoDestino = this.util.nullOrEmpty(opciones.codigoPuertoDestino) ? 'TODOS' : opciones.codigoPuertoDestino;
    opciones.numeroConsecutivo = this.util.nullOrEmpty(opciones.numeroConsecutivo) ? '*' : opciones.numeroConsecutivo;
    opciones.codigoProforma = this.util.nullOrEmpty(opciones.codigoProforma) ? '*' : opciones.codigoProforma;
    opciones.idContenedor = this.util.nullOrEmpty(opciones.idContenedor) ? '*' : '*' + opciones.idContenedor + '*';
    opciones.numeroFactura = this.util.nullOrEmpty(opciones.numeroFactura) ? '*' : opciones.numeroFactura;
    opciones.estado = this.util.nullOrEmpty(opciones.estado) ? 'EMBARCADO' : opciones.estado;
    opciones.codigoRepresentante = this.util.nullOrEmpty(opciones.codigoRepresentante) ? '*' : opciones.codigoRepresentante;
    opciones.codigoNaviera = this.util.nullOrEmpty(opciones.codigoNaviera) ? '*' : opciones.codigoNaviera;
    opciones.codigoPais = this.util.nullOrEmpty(opciones.codigoPais) ? 'ECU' : opciones.codigoPais;
    opciones.usuario = this.util.nullOrEmpty(opciones.usuario) ? 'omoscoso' : opciones.usuario;

    return opciones;

  }

  private _filter(value: string, element: string): Catalogo[] {
    const filterValue = value.toLowerCase();
    switch (element) {
      // case 'destino':
      //   return this.destinos.filter(option => option.nombre.toLowerCase().includes(filterValue));
      //   break;
      case 'producto':
        if (this.productos.length > 0) {
          return this.productos.filter(option => option.descripcionEspanol.toLowerCase().includes(filterValue));
        } else {
          return [];
        }
        break;
      default:
        return [];
        break;
    }
  }

  public especificaciones(): void{
    const dialogRef = this._dialog.open(EspecificacionComponent, {
      width: '60%',
      height: 'auto',
      data: {
        codigoDetalleProgramacion: this.pedido.codigoDetalleProgramacion,
        descripcionTipoTapa: this.pedido.descripcionTipoTapa,
        descripcionTipoEmbalaje: this.pedido.descripcionTipoEmbalaje,
        descripcionUnidadesCaja: this.pedido.descripcionUnidadesCaja,
        descripcionTermoencogiblePack: this.pedido.descripcionTermoencogiblePack,
        codigoTermoencogiblePack: this.pedido.codigoTermoencogiblePack,
        descripcionTipoCarga: this.pedido.descripcionTipoCarga,
        descripcionTipoCodificado: this.pedido.descripcionTipoCodificado,
        descripcionTipoMarking: this.pedido.descripcionTipoMarking,
        observacionesMarkings: this.pedido.observacionesMarkings,
        observacionesGenerales: this.pedido.observacionesGenerales,

      }
    });
    dialogRef.afterClosed().subscribe(() => {
      console.log('cerrada la huevada');
    })
  }
}
