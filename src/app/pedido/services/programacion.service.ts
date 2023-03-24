import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GetProgramacion } from 'src/app/util/custom-data-types/get-programacion';
import { UtilFunctions } from 'src/app/util/functions/util-functions';
import { Observable } from 'rxjs';
import {ModificarMultiple, ModificarSimple, Programacion} from 'src/app/util/custom-data-types/pedido';
import {environment} from "../../../environments/environment";

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {
  private url: string;
  private util = new UtilFunctions();

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.smartClientApi;
  }

  consultarProgramacion(opciones: GetProgramacion): Observable<Programacion[]>{
    let a = opciones.porFecha;
    let b = opciones.fechaDesde;
    let c = opciones.fechaHasta;
    let d = opciones.codigoCliente;
    let e = opciones.codigoProducto;
    let f = opciones.codigoMarca;
    let g = opciones.codigoPuertoDestino;
    let h = opciones.numeroConsecutivo;
    let i = opciones.codigoProforma;
    let j = opciones.idContenedor;
    let k = opciones.numeroFactura;
    let l = opciones.estado;
    let m = opciones.codigoRepresentante;
    let n = opciones.codigoNaviera;
    let o = opciones.codigoPais;
    let p = opciones.usuario;


    const url = `${this.url}programacion/por-coordinador/?a=${a}&b=${b}&c=${c}&d=${d}`+
    `&e=${e}&f=${f}&g=${g}&h=${h}&i=${i}&j=${j}`+
    `&k=${k}&l=${l}&m=${m}&n=${n}&o=${o}&p=${p}`;
    return this.http.get<Programacion[]>(url);
  }
  borrarDetalle(idProgramacion: number){
    const url = `${this.url}programacion/eliminar/${idProgramacion}`;
    return this.http.delete(url)
  }
  validarBorrado(idProgramacion: number){
    const url = `${this.url}programacion/validation/?c=${idProgramacion}`;
    return this.http.get(url)
  }
  actualizarInformacion(objeto: ModificarSimple){
    const url = `${this.url}programacion/modificar-detalle/${objeto.codigoDetalleProgramacion}`;
    return this.http.put(url,objeto);
  }
  actualizarInformacionMultiple(objeto: ModificarMultiple){
    const url = `${this.url}programacion/modificar-detalle-mult`;
    return this.http.put(url,objeto);
  }
  mostrarFactura(numeroFactura: string, fechaTentativaEmbarque: string, numeroFue: string, comisionAgente: string){
    const url = `${this.url}programacion/excel/?p=${numeroFactura}&q=${fechaTentativaEmbarque}&r=${numeroFue}&s=${comisionAgente}`;
      return this.http.get(url,{observe: "response", responseType:"blob"});
  }
}
