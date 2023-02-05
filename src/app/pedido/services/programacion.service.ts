import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import { GetProgramacion } from 'src/app/util/custom-data-types/get-programacion';
import { UtilFunctions } from 'src/app/util/functions/util-functions';
import { Observable } from 'rxjs';
import { Programacion } from 'src/app/util/custom-data-types/pedido';

@Injectable({
  providedIn: 'root'
})
export class ProgramacionService {
  private url: string;
  private util = new UtilFunctions();

  constructor(
    private http: HttpClient
  ) {
    this.url = 'http://localhost:8181/smartclientapi/';
  }

  getProgramacion(opciones: GetProgramacion): Observable<Programacion[]>{

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
}
