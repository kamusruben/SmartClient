import {Component, OnInit, QueryList, ViewChildren} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {Catalogo, Representante} from "../../../util/custom-data-types/catalogo";
import {Observable, forkJoin} from "rxjs";
import {finalize, map, startWith} from 'rxjs/operators';
import {Programacion} from "../../../util/custom-data-types/pedido";
import {estadoProgramacionEnum} from "../../../util/enum/estadoProgramacion.enum";
import {MatSlideToggle} from "@angular/material/slide-toggle";
import * as moment from 'moment';
import {ProgramacionService} from "../../services/programacion.service";
import {GetProgramacion} from "../../../util/custom-data-types/get-programacion";
import {UtilFunctions} from 'src/app/util/functions/util-functions';
import {
  ColDef, ExcelStyle, GridApi,
  GridReadyEvent, Module,
  RowSelectedEvent,
  SelectionChangedEvent
} from "ag-grid-community";
import {Mockup} from "../../../mockup/mockup";
import {CatalogosService} from "../../services/catalogos.service";
import {estadoCatalogoEnumEnum} from "../../../util/enum/estadoCatalogoEnum.enum";
import {TrashButtonComponent} from "../botones/trash-button.component";


@Component({
  selector: 'app-tabla',
  templateUrl: './tabla.component.html',
  styleUrls: ['./tabla.component.scss']
})
export class TablaComponent implements OnInit {

  /** AG GRID */
  public columnDefs: ColDef[] = [];
  public rowSelection: 'single' | 'multiple' = 'multiple';
  public cargandoRegistros: string = '<h5>Cargando información...</h5>';
  public sinRegistro: string = '<h5>No existe información...</h5>';
  private gridApi!: GridApi;

  /** CATALOGOS */
  public paises: Catalogo[];
  public clientes: Catalogo[];
  public representantes: Representante[];
  public productos: Catalogo[];
  public navieras: Catalogo[];
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
  public errorDates: boolean;
  public errorMsg: string;


  public tempPedidosFiltrados: Programacion[] = [];
  public pedidosFiltrados: Programacion[] = [];
  public pedidosSeleccionados: Programacion[] = [];
  public pedido: Programacion;

  public hoy = moment();
  public finMes = moment().endOf('month');

  private util = new UtilFunctions();


  private mockup: Mockup = new Mockup();

  constructor(private fb: FormBuilder,
              private _progService: ProgramacionService,
              private _catalogoSevice: CatalogosService) {
  }


  @ViewChildren("toggleElement") ref: QueryList<MatSlideToggle>;

  ngOnInit(): void {
    moment.locale('es');
    this.spinner = true;

    /** >>>> MODIFICAR USUARIO */
    this.usuario = 'tmoscoso';
    this.pais = 'ECU';
    this.rol = 'COORDINADOR';

    /* DEFINICION DE COLUMNAS */
    this.columnDefs = [
      {field: 'planta'},
      {field: 'fechaTentativaEmbarque', headerName: 'Embarq. Tent.'},
      {field: 'pais', headerName: 'País Planta'},
      {field: 'refCliente', headerName: 'Ref. Cliente'},
      {field: 'fechaRequeridaCliente', headerName: 'Req. x Cliente'},
      {field: 'numeroReferenciaRepresentante', headerName: 'Ref. Rep'},
      {field: 'descripcionTamanoContenedor', headerName: 'Tam. Cont.'},
      {field: 'numeroFacturaSRI', headerName: 'Factura SRI'},
      {field: 'nombreCliente', headerName: 'Cliente', resizable: true},
      {field: 'descripcionMarca', headerName: 'Marca'},
      {field: 'numeroCajas', headerName: 'Cajas'},
      {field: 'descripcionProducto', headerName: 'Producto', resizable: true},
      {field: 'descripcionUnidadesCaja', headerName: 'Unid/Caja'},
      {field: 'nombrePuertoDestino', headerName: 'Destino'},
      {field: 'fechaTermino', headerName: 'Término'},
      {field: 'fechaFinCuarentena', headerName: 'Fin Cuarentena'},
      {field: 'fechaEtiquetadoFinal', headerName: 'Etiq. Final'},
      {field: 'fechaCarga', headerName: 'Carga'},
      //{field: 'fechaTentativaEmbarque', headerName: 'Embarq. Tent.'},
      {field: 'fechaRealEmbarque', headerName: 'Embarq. Real'},
      {field: 'fechaFacturacion', headerName: 'Fecha de Facturación'},
      {field: 'nombreNaviera', headerName: 'Naviera'},
      {field: 'nombreBuqueNaviera', headerName: 'Buque'},
      {field: 'identificadorContenedor', headerName: 'Nro. Contenedor'},
      {field: 'numeroBL', headerName: 'Nro. BL'},
      {field: 'estadoDetalle', headerName: 'Estado'},
      // { field: 'estadoProgramacion', headerName: 'Estado' },
      {field: 'comentariosInaexpo', headerName: 'Comentarios'},
      {field: 'valorFlete', headerName: 'Flete Terrestre'},
      {field: 'nombrePuertoOrigen', headerName: 'Puerto Origen'},
      {field: 'fleteMaritimo', headerName: 'Flete Marítimo'},
    ];

    this.columnDefs[0].cellRenderer = TrashButtonComponent;
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
      estado: new FormControl(null),
      embarqueDesde: new FormControl(this.hoy.toDate()),
      embarqueHasta: new FormControl(this.finMes.toDate()),
      paisPlanta: new FormControl(),
      representante: new FormControl(),
      cliente: new FormControl(),
      producto: new FormControl(),
      naviera: new FormControl(),
      marca: new FormControl(),
      numeroContenedor: new FormControl(),
      prefactura: new FormControl(),
      destino: new FormControl(),
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
    forkJoin(catalogos).subscribe((result: any[]) => {
      this.clientes = result[0].return;
      this.marcas = result[1].return;
      this.productos = result[2].return;
      this.paises = result[3].return;
      this.navieras = result[4].return;
      this.representantes = result[6].return;

      this.productosFiltrados = this.filterForm.controls['producto'].valueChanges.pipe(
        startWith(''),
        map(value => this._filter(value || '', 'producto')),
      );
    });

    /** CONSULTAR PROGRAMACION */
    let opciones: GetProgramacion = {};
    opciones.porFecha = 'SI';
    opciones.fechaDesde = '01/01/2000';
    opciones.fechaHasta = '31/12/2023';
    opciones.estado = 'EMBARCADO';
    opciones.codigoPais = 'ECU';
    opciones.idContenedor = 'RH618';
    opciones.usuario = this.usuario;

    opciones = this.completarGetProgramacion(opciones);

    this._progService.getProgramacion(opciones).subscribe((result: any) => {
      this.pedidosFiltrados = result.return;
      this.spinner = false;
    });
  }

  public onGridReady(params: any) {

    this.gridApi = params.api;

  }

  public filtroEstado(valor: any, tipo: string, checked: boolean = true) {
    // this.pedidosFiltrados = this.tempPedidosFiltrados;
    // let tempPedidosFiltrados = Object.assign([], this.pedidosFiltrados);
    // this.pedidosFiltrados = [];

    if (checked && !this.estadosFiltrados.includes(valor) && valor != this.estados.TODOS) {
      this.estadosFiltrados.push(valor);
    } else {
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
      this.ref.forEach(x => x.checked = true);
    }
    if ((valor == this.estados.TODOS && !checked) || (this.estadosFiltrados.length == 0)) {
      this.ref.forEach(x => x.checked = false);
      // this.pedidosFiltrados = [];
      // this.estadosFiltrados = [];
    }
    // tempPedidosFiltrados.forEach(item => {
    //   if (this.estadosFiltrados.includes(item.estado)) {
    //     this.pedidosFiltrados.push(item);
    //   }
    // });
  }

  public limpiarFiltros() {
    this.ref.forEach(x => x.checked = false);
    // this.filterForm.controls['embarqueDesde'].setValue(new Date());
    // this.filterForm.controls['embarqueHasta'].setValue(new Date());
    this.filterForm.controls['estado'].setValue(this.estados.TODOS);
    this.filterForm.controls['paisPlanta'].setValue(this.estados.TODOS);
    this.filterForm.controls['representante'].setValue(this.estados.TODOS);
    this.filterForm.controls['cliente'].setValue(this.estados.TODOS);
    this.filterForm.controls['naviera'].setValue(this.estados.TODOS);
    this.filterForm.controls['producto'].setValue('');
    this.filterForm.controls['naviera'].setValue(this.estados.TODOS);
    this.filterForm.controls['marca'].setValue(this.estados.TODOS);
    this.filterForm.controls['numeroContenedor'].setValue('');
    this.filterForm.controls['prefactura'].setValue('');
    this.estadosTodos();
    // this.aplicarFiltros();
    this.estadosFiltrados = [];
  }

  private estadosTodos() {
    this.ref.forEach(x => x.checked = true);
    // Colocar todos los estados
    let estados = Object.keys(this.estados);
    estados.forEach(x => {
      // @ts-ignore
      if (x != this.estados.TODOS) {
        this.estadosFiltrados.push(x);
      }
    });
    this.ref.forEach(x => x.checked = true);
  }

  public aplicarFiltros() {
    this.spinner = true;
    this.pedidosFiltrados = [];
    //Iniciar con todos los pedidos
    // this.pedidosFiltrados = this.pedidosTodos;
    // Aplicar filtros
    let desde = this.filterForm.controls['embarqueDesde'].value;
    let hasta = this.filterForm.controls['embarqueHasta'].value;

    /**
     * Validaciones
     */
    if (desde > hasta) {
      this.errorDates = true;
      this.errorMsg = 'Las fechas no son válidas';
      return;
    }

    //filtro Pais Planta
    let ppCodigo = this.filterForm.controls['paisPlanta'].value;
    //filtro Producto
    let prCodigo = this.filterForm.controls['producto'].value;
    let prod = 'TODOS';
    if (prCodigo != null && prCodigo != '') {
      let prodCatalogo = this.productos.find(x => x.descripcionEspanol == prCodigo);
      prod = prodCatalogo.codigo;
    }

    let idc = this.util.nullOrEmpty(this.filterForm.controls['numeroContenedor'].value) ? '*' : this.filterForm.controls['numeroContenedor'].value;
    let rep = this.util.nullOrEmpty(this.filterForm.controls['representante'].value) ? '*' : this.filterForm.controls['representante'].value;
    let cli = this.util.nullOrEmpty(this.filterForm.controls['cliente'].value) ? 'TODOS' : this.filterForm.controls['cliente'].value;
    let nav = this.util.nullOrEmpty(this.filterForm.controls['naviera'].value) ? '*' : this.filterForm.controls['naviera'].value;
    let marca = this.util.nullOrEmpty(this.filterForm.controls['marca'].value) ? 'TODOS' : this.filterForm.controls['marca'].value;

    /** CONSULTAR PROGRAMACION */
    let opciones: GetProgramacion = {};
    opciones.porFecha = 'SI';
    opciones.fechaDesde = moment(desde).format('L');
    opciones.fechaHasta = moment(hasta).format('L');
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

    console.log('OPCIONES');
    console.log(opciones);

    this.sinRegistro = '<h5>Cargando información...</h5>'

    this._progService.getProgramacion(opciones).pipe(finalize(() => {
      this.sinRegistro = this.pedidosFiltrados.length == 0 ? '<h5>No existe información para estos filtros</h5>' : '';
      this.spinner = false;
    })).subscribe((result: any) => {
      this.pedidosFiltrados = result.return;
    });

  }

  public onSelectionChanged(event: SelectionChangedEvent) {
    var selectedRows = this.gridApi.getSelectedRows();
    this.pedidosSeleccionados = selectedRows;
    this.pedido = this.pedidosSeleccionados[0];
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
}
