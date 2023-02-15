export interface Pedido {
  planta: string,
  paisPlanta: string,
  refCliente: string,
  reqCliente: Date,
  refRep: string,
  fcl: number,
  tamanioContenido: string,
  unidadContenido?: string,
  prefactAduana: string,
  facturaSRI: string,
  sec: number,
  cliente: string,
  marca: string,
  cajas: number,
  producto: string,
  unidadesPorCaja: number,
  destino: string,
  termino: Date,
  finCuarentena: Date,
  etiquetaFin: Date,
  carga: Date,
  embarqueTentativo: Date,
  embarqueReal: Date,
  fechaFacturacion: Date,
  naviera: string,
  buque: string,
  numeroContenedor: string,
  sellos: string[],
  bl: string[],
  estado: string,
  comentarios: string,
  transportistaTerrestre: string,
  valorFleteTerrestre: number,
  puertoOrigen: string,
  valorFleteMaritimo: number
}

export interface Programacion {
  codigoBodegaDespacho: string,
  codigoCliente: string,
  codigoCondicionCompra: string,
  codigoDetalleProgramacion: string,
  codigoFormaPago: string,
  codigoMarca: string,
  codigoNaviera: string,
  codigoProducto: string,
  codigoProductoBaan: string,
  codigoProforma: string,
  codigoProgramacion: string,
  codigoPuertoDestino: string,
  codigoPuertoOrigen: string,
  codigoRepresentante: string,
  codigoTamanoContenedor: string,
  codigoTermoencogiblePack: string,
  codigoTipoCarga: string,
  codigoTipoCodificado: string,
  codigoTipoEmbalaje: string,
  codigoTipoMarking: string,
  codigoTipoTapa: string,
  codigoUnidadesCaja: string,
  codigoViaEmbarque: string,
  comentariosInaexpo: string,
  descripcionCondicionCompra: string,
  descripcionFormaPago: string,
  descripcionMarca: string,
  descripcionProducto: string,
  descripcionTamanoContenedor: string,
  descripcionTermoencogiblePack: string,
  descripcionTipoCarga: string,
  descripcionTipoCodificado: string,
  descripcionTipoEmbalaje: string,
  descripcionTipoMarking: string,
  descripcionTipoTapa: string,
  descripcionUnidadesCaja: string,
  descripcionViaEmbarque: string,
  estadoDetalle: string,
  estadoFechaTermino: string,
  estadoProgramacion: string,
  fechaCarga: string,
  fechaEtiquetadoFinal: string,
  fechaEtiquetadoInicial: string,
  fechaFacturacion: string,
  fechaFinCuarentena: string,
  fechaIngreso: string,
  fechaRealEmbarque: string,
  fechaRequeridaCliente: string,
  fechaTentativaEmbarque: string,
  fechaTermino: string,
  fechaTerminoVirtual: string,
  fleteMaritimo: string,
  identificadorContenedor: string,
  nombreBuqueNaviera: string,
  nombreCliente: string,
  nombreNaviera: string,
  nombrePlantaEtiquetado: string,
  nombrePuertoDestino: string,
  nombrePuertoOrigen: string,
  nombreRepresentante: string,
  nombreTransportista: string,
  nroContenedor: string,
  numeroBL: string,
  numeroCajas: string,
  numeroConsecutivoPedido: string,
  numeroContenedor: string,
  numeroContenedorCliente: string,
  numeroContenedorClienteDescripcion: string,
  numeroContenedores: string,
  numeroFacturaBaan: string,
  numeroFacturaSRI: string,
  numeroFila: string,
  numeroProforma: string,
  numeroReferenciaRepresentante: string,
  numeroSello: string,
  observacionesGenerales: string,
  observacionesMarkings: string,
  pais: string,
  planta: string,
  precioCajaFOB: string,
  refCliente: string,
  seguro: string,
  tienePrecioAlternativo: string,
  tieneTermoencogible: string,
  tipoERP: string,
  usuarioVerificador: string,
  valorFlete: string,
  valorSeguro: string,
  dae: string,
  prefacturaAduana?: string
}

export interface ModificarSimple {
  codigoDetalleProgramacion: number,
  numeroFacturaBaan?: string,
  fechaEmbarque?: string,
  esFechaRealEmbarque?: boolean,
  estado?: string,
  nombreBuque?: string,
  comentariosInaexpo?: string,
  numeroContenedor?: number,
  numeroSellos?: number,
  numeroBL?: number,
  valorFlete?: number,
  fechaFacturacion?: string,
  fleteMaritimo?: number,
  codigoNaviera?: string,
  codigoPuertoDestino?: string,
  dae?: string,
  camposModificados?: string,
}

export interface ModificarMultiple {
  codigoDetalleProgramacion: string[],
  actualizaNumeroFactura?: boolean,
  numeroFacturaAnterior?: string,
  numeroFacturaBaan?: string,
  fechaEmbarque?: string,
  esFechaRealEmbarque?: boolean,
  estado?: string,
  nombreBuque?: string,
  comentariosInaexpo?: string,
  numeroContenedor?: number,
  numeroSellos?: string,
  numeroBL?: string,
  valorFlete?: number,
  fechaFacturacion?: string,
  fleteMaritimo?: number,
  codigoNaviera?: string,
  codigoPuertoDestino?: string,
  nombreBuqueNaviera?: string,
  actulizaCampoPorContenedor?: boolean,
  numeroContenedorClienteDescripcion?: string,
  codigoPuertoOrigen?: string,
  numeroFacturaSRI?: string,
  dae?: string,
  camposModificados?: string
}
