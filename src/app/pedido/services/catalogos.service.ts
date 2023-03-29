import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import { environment } from '../../../environments/environment'

@Injectable({
  providedIn: 'root'
})
export class CatalogosService {
  private url: string;

  constructor(
    private http: HttpClient
  ) {
    this.url = environment.smartClientApi;
  }

  getClientePorEstado(estado: 'ACTIVO'|'INACTIVO'){
    const url = `${this.url}cliente/por-estado/?q=${estado}`;
    return this.http.get(url);
  }

  getMarcaPorEstado(estado: 'ACTIVO'|'INACTIVO'){
    const url = `${this.url}marca/por-estado/?q=${estado}`;
    return this.http.get(url);
  }

  getProductoPorEstado(estado: 'ACTIVO'|'INACTIVO'){
    const url = `${this.url}productos/por-estado/?q=${estado}`;
    return this.http.get(url);
  }

  getPaisesPorUsuario(usuario: string, rol: string){
    const url = `${this.url}pais/por-coordinador/?q=${usuario}&p=${rol}`;
    return this.http.get(url);
  }

  getNavieraPorPais(estado: 'ACTIVO'|'INACTIVO', usuario: string, codigoPais: string){
    const url = `${this.url}naviera/por-estado-pais/?q=${estado}&p=${usuario}&r=${codigoPais}`;
    return this.http.get(url);
  }

  getPuertoPorUsuarioPais(estado: 'ACTIVO'|'INACTIVO', usuario: string, codigoPais: string){
    const url = `${this.url}puerto/por-usuario-pais/?q=${estado}&p=${usuario}&r=${codigoPais}`;
    return this.http.get(url);
  }

  getRepresentantePorPais(pais: string){
    const url = `${this.url}representante/por-pais/?q=${pais}`;
    return this.http.get(url);
  }
  getCatalogByCode(code: string){
    const url = `${this.url}generic?code=${code}`;
    return this.http.get(url);
  }
  getCatalogPaises(){
    const url = `${this.url}generic?code=pais`;
    return this.http.get(url);
  }
  getPuertoDestino(naviera: string){
    const url = `${this.url}programacion/puertosDestinos/?c=${naviera}`;
    return this.http.get(url);
  }

  /**
   * MOCKUPS
   */
  getMockPaises(){
    return [
      { codigo: "1", nombre: 'ECUADOR'},
      { codigo: "2", nombre: 'PERU'},
      { codigo: "3", nombre: 'COLOMBIA'},
      { codigo: "4", nombre: 'ARGENTINA'},
      { codigo: "5", nombre: 'CHILE'},
    ];
  }
  getMockClientes(){
    return [
      {codigo: "1", nombre: "GREENYARD PREPARED BELGIUM NV."},
      {codigo: "2", nombre: "INAEXPO USA LTD.CO."},
      {codigo: "3", nombre: "ROCHEFONTAINE"},
      {codigo: "4", nombre: "LIDL STIFTUNG & CO KG"},
      {codigo: "5", nombre: "CARREFOUR IMPORT SAS"},
      {codigo: "6", nombre: "DIN MARKETING AND ROASTING 2021 LTD"},
      {codigo: "7", nombre: "MATZOT AVIV 2014 BAKING LTD"},
      {codigo: "8", nombre: "WALMART CHILE S.A."},
      {codigo: "9", nombre: "SHUFER SAL LTD."},
      {codigo: "10", nombre: "GEIMEX"}
    ];
  }
  getMockRepresentantes(){
    return [
      {codigo: "1", nombre: "RH-1576-13"},
      {codigo: "2", nombre: "EB-3300-1"},
      {codigo: "3", nombre: "RH-1614-2"},
      {codigo: "4", nombre: "RH-1631-2"},
      {codigo: "5", nombre: "RH-1638-10"},
      {codigo: "6", nombre: "EB-3614-1"},
      {codigo: "7", nombre: "EB-3634-1"},
      {codigo: "8", nombre: "EB-3657-1"},
      {codigo: "9", nombre: "GK-1074-1"},
      {codigo: "10", nombre: "EB-3708-1"},
      {codigo: "11", nombre: "EB-3740-1"},
      {codigo: "12", nombre: "EB-3741-1"},
      {codigo: "13", nombre: "GK-1073-1"},
      {codigo: "14", nombre: "JR-1792-4"},
      {codigo: "15", nombre: "RH-1619-19"},
    ];
  }
  getMockProductos(){
    return [
      {codigo: "1", nombre: "LME21-P-SA"},
      {codigo: "2", nombre: "PYR-01"},
      {codigo: "3", nombre: "ME21-OR"},
      {codigo: "4", nombre: "FAE21-P-SE-OR"},
      {codigo: "5", nombre: "ME21-12"},
      {codigo: "6", nombre: "FDE31"},
      {codigo: "7", nombre: "MS100"},
      {codigo: "8", nombre: "FE12"},
      {codigo: "9", nombre: "KE11"},
      {codigo: "10", nombre: "PYP01-E-AMK"},
      {codigo: "11", nombre: "PVR-01DK"},
      {codigo: "12", nombre: "MS210"},
      {codigo: "13", nombre: "LMR-01"},
      {codigo: "14", nombre: "LML-01"},
      {codigo: "15", nombre: "ME21"}
    ];
  }
  getMockNavieras(){
    return [
      { codigo: "1", nombre: "AMBERES"},
      { codigo: "2", nombre: "CMA CGM"},
      { codigo: "3", nombre: "NUEVA YORK"},
      { codigo: "4", nombre: "HAMBURG SUD"},
      { codigo: "5", nombre: "LE HAVRE"},
      { codigo: "6", nombre: "ROTTERDAM"},
      { codigo: "7", nombre: "NEW YORK"},
      { codigo: "8", nombre: "BOSTON-MA"},
      { codigo: "9", nombre: "A.HARTRODT ECUADOR LOGISTICS S.A."},
      { codigo: "10", nombre: "BROOKSHIRE, TX 77423"},
      { codigo: "11", nombre: "SEABOARD MARINE"},
      { codigo: "12", nombre: "ASHDOD"},
      { codigo: "13", nombre: "KUEHNE & NAGEL"},
      { codigo: "14", nombre: "PHILADELPHIA"},
      { codigo: "15", nombre: "PORT EVERGLADES"},
      { codigo: "16", nombre: "KING OCEAN"},
      { codigo: "17", nombre: "TRANSASIA PACIFIC S.A."},
      { codigo: "18", nombre: "SAN ANTONIO"},
      { codigo: "19", nombre: "PANATLANTIC LOGISTICS S.A"},
      { codigo: "20", nombre: "HAIFA-ISRAEL"},
      { codigo: "21", nombre: "SAMISA"}
    ];
  }
  getMockMarcas(){
    return [
      { codigo: "1", nombre: "AMBERES"},
      { codigo: "2", nombre: "AUCHAN"},
      { codigo: "3", nombre: "NUEVA YORK"},
      { codigo: "4", nombre: "WHOLE FOODS MARKET"},
      { codigo: "5", nombre: "LE HAVRE"},
      { codigo: "6", nombre: "ROCHEFONTAINE BIO"},
      { codigo: "7", nombre: "ROTTERDAM"},
      { codigo: "8", nombre: "FRESHONA"},
      { codigo: "9", nombre: "SIMPL"},
      { codigo: "10", nombre: "NEW YORK"},
      { codigo: "11", nombre: "REESE"},
      { codigo: "12", nombre: "BOSTON-MA"},
      { codigo: "13", nombre: "WELLSLEY FARMS"},
      { codigo: "14", nombre: "BROOKSHIRE, TX 77423"},
      { codigo: "15", nombre: "GOYA"},
      { codigo: "16", nombre: "ASHDOD"},
      { codigo: "17", nombre: "SHKEDIA"},
      { codigo: "18", nombre: "PHILADELPHIA"},
      { codigo: "19", nombre: "COCINA SELECTA"},
      { codigo: "20", nombre: "PORT EVERGLADES"},
      { codigo: "21", nombre: "VIGO"},
      { codigo: "22", nombre: "KETO CHEF"},
      { codigo: "23", nombre: "SAN ANTONIO"},
      { codigo: "24", nombre: "LIDER"},
      { codigo: "25", nombre: "HAIFA-ISRAEL"},
      { codigo: "26", nombre: "SHUFERSAL"},
      { codigo: "27", nombre: "MONOPRIX"}
    ];
  }
  getMockDestinos(){
    return [
      { codigo: "1", nombre: "AMBERES"},
      { codigo: "2", nombre: "NUEVA YORK"},
      { codigo: "3", nombre: "LE HAVRE"},
      { codigo: "4", nombre: "ROTTERDAM"},
      { codigo: "5", nombre: "NEW YORK"},
      { codigo: "6", nombre: "BOSTON-MA"},
      { codigo: "7", nombre: "BROOKSHIRE, TX 77423"},
      { codigo: "8", nombre: "ASHDOD"},
      { codigo: "9", nombre: "PHILADELPHIA"},
      { codigo: "10", nombre: "PORT EVERGLADES"},
      { codigo: "11", nombre: "SAN ANTONIO"},
      { codigo: "12", nombre: "HAIFA-ISRAEL"}
    ];
  }
}
