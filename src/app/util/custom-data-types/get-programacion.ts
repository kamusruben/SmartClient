export interface GetProgramacion {
    porFecha?: 'SI'|'NO',
    fechaDesde?: string,
    fechaHasta?: string, 
    codigoCliente?: string,
    codigoProducto?: string, 
    codigoMarca?: string, 
    codigoPuertoDestino?: string, 
    numeroConsecutivo?: string,
    codigoProforma?: string,
    idContenedor?: string,
    numeroFactura?: string, 
    estado?: string, 
    codigoRepresentante?:string,
    codigoNaviera?: string,
    codigoPais?: string, 
    usuario?: string
}