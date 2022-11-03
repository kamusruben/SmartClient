import { Pedido } from './../../app/pedido';
import {ColDef} from "ag-grid-community";

export class Mockup {
  private pedidos: Pedido[];
  private colDefs: ColDef[];
  private cols: string[];

  constructor() {
    this.pedidos = [];
    this.colDefs = [];
    this.cols = [];
  }
  getPedidos(){
    this.pedidos = [
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '466174',
        reqCliente: new Date(),
        refRep: 'RH-1576-13',
        fcl: 13,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5104',
        facturaSRI: '001-106-000005104',
        sec: 5,
        cliente: 'GREENYARD PREPARED BELGIUM NV.',
        marca: 'AUCHAN',
        cajas: 2400,
        producto: 'LME21-P-SA',
        unidadesPorCaja: 12,
        destino: 'AMBERES',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'CMA CGM',
        buque: 'CMA CGM ARKANSAS',
        numeroContenedor: 'FCIU2903823  ',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE: 028-2022-40-00298240',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 439,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '134211',
        reqCliente: new Date(),
        refRep: 'EB-3300-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5094',
        facturaSRI: '001-106-000005094',
        sec: 72,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'WHOLE FOODS MARKET',
        cajas: 2720,
        producto: 'PYR-01',
        unidadesPorCaja: 12,
        destino: 'NUEVA YORK',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'HAMBURG SUD',
        buque: 'ALGOL',
        numeroContenedor: 'TLLU7837470',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'a.hartrodt Ecuador',
        transportistaTerrestre: 'AVALCARGA',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '134212',
        reqCliente: new Date(),
        refRep: 'EB-3301-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5108',
        facturaSRI: '001-106-000005108',
        sec: 73,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'WHOLE FOODS MARKET',
        cajas: 2720,
        producto: 'PYR-01',
        unidadesPorCaja: 12,
        destino: 'NUEVA YORK',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'HAMBURG SUD',
        buque: 'ARSOS',
        numeroContenedor: 'RFCU4035839',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'ETIQUETADO',
        comentarios: '',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 380,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'RH1614-2',
        reqCliente: new Date(),
        refRep: 'RH-1614-2',
        fcl: 2,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5099',
        facturaSRI: '001-106-000005099',
        sec: 10,
        cliente: 'ROCHEFONTAINE',
        marca: 'ROCHEFONTAINE BIO',
        cajas: 4984,
        producto: 'ME21-OR',
        unidadesPorCaja: 6,
        destino: 'LE HAVRE',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'CMA CGM',
        buque: 'CMA CGM ARKANSAS',
        numeroContenedor: 'CMAU0981837',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE 028-2022-40-00295223',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 681,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'RH1631-2',
        reqCliente: new Date(),
        refRep: 'RH-1631-2',
        fcl: 2,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5100',
        facturaSRI: '001-106-000005100',
        sec: 4,
        cliente: 'LIDL STIFTUNG & CO KG',
        marca: 'FRESHONA',
        cajas: 4973,
        producto: 'FAE21-P-SE-OR',
        unidadesPorCaja: 6,
        destino: 'ROTTERDAM',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'CMA CGM',
        buque: 'CMA CGM ARKANSAS',
        numeroContenedor: 'TRHU1062979',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE 028-2022-40-00295302',
        transportistaTerrestre: 'AVALCARGA',
        valorFleteTerrestre: 681,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '14AL122FRCA0005',
        reqCliente: new Date(),
        refRep: 'RH-1638-10',
        fcl: 10,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5107',
        facturaSRI: '001-106-000005107',
        sec: 12,
        cliente: 'CARREFOUR IMPORT SAS',
        marca: 'SIMPL',
        cajas: 3362,
        producto: 'ME21-12',
        unidadesPorCaja: 12,
        destino: 'LE HAVRE',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'CMA CGM',
        buque: 'CMA CGM ARKANSAS',
        numeroContenedor: 'CMAU0723961',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'ETIQUETADO',
        comentarios: '',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 681,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '320974',
        reqCliente: new Date(),
        refRep: 'EB-3614-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5101',
        facturaSRI: '001-106-000005101',
        sec: 74,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'REESE',
        cajas: 3000,
        producto: 'ME21-12',
        unidadesPorCaja: 12,
        destino: 'NEW YORK',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'CMA CGM',
        buque: 'ALGOL',
        numeroContenedor: 'TGBU8729571',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE 028-2022-40-00295394',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'VE678',
        reqCliente: new Date(),
        refRep: 'EB-3634-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5097',
        facturaSRI: '001-106-000005097',
        sec: 75,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'WELLSLEY FARMS',
        cajas: 1395,
        producto: 'FDE31',
        unidadesPorCaja: 12,
        destino: 'BOSTON-MA',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'A.HARTRODT ECUADOR LOGISTICS S.A.',
        buque: 'ALGOL',
        numeroContenedor: 'CSNU7490532  ',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE: ¿02820224000286681 BKG 6329209800',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '34322-0',
        reqCliente: new Date(),
        refRep: 'EB-3657-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5105',
        facturaSRI: '001-106-000005105',
        sec: 76,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'GOYA',
        cajas: 3180,
        producto: 'ME21-12',
        unidadesPorCaja: 12,
        destino: 'BROOKSHIRE, TX 77423',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'SEABOARD MARINE',
        buque: 'ARSOS',
        numeroContenedor: 'SMLU7855520',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE: 028-2022-40-00298242',
        transportistaTerrestre: 'ADETRANSCORP',
        valorFleteTerrestre: 380,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '34322-0',
        reqCliente: new Date(),
        refRep: 'EB-3657-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5105',
        facturaSRI: '001-106-000005105',
        sec: 76,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'GOYA',
        cajas: 120,
        producto: 'MS100',
        unidadesPorCaja: 12,
        destino: 'BROOKSHIRE, TX 77423',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'SEABOARD MARINE',
        buque: 'ARSOS',
        numeroContenedor: 'SMLU7855520',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: '',
        transportistaTerrestre: 'ADETRANSCORP',
        valorFleteTerrestre: 380,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'AF8184',
        reqCliente: new Date(),
        refRep: 'GK-1074-1',
        fcl: 1,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5093',
        facturaSRI: '001-106-000005093',
        sec: 1,
        cliente: 'DIN MARKETING AND ROASTING 2021 LTD',
        marca: 'SHKEDIA',
        cajas: 1870,
        producto: 'FE12',
        unidadesPorCaja: 12,
        destino: 'ASHDOD',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'KUEHNE & NAGEL',
        buque: 'DIMITRIS C',
        numeroContenedor: 'HLBU1451111',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'BUQUE 2 ABR.',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 380,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '507129',
        reqCliente: new Date(),
        refRep: 'EB-3708-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5106',
        facturaSRI: '001-106-000005106',
        sec: 77,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'COCINA SELECTA',
        cajas: 1680,
        producto: 'KE11',
        unidadesPorCaja: 12,
        destino: 'PHILADELPHIA',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'SEABOARD MARINE',
        buque: 'ARSOS',
        numeroContenedor: 'SMLU7970755   ',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: '028-2022-40-00298243',
        transportistaTerrestre: 'TRANSCARNA',
        valorFleteTerrestre: 380,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '12586',
        reqCliente: new Date(),
        refRep: 'EB-3740-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5098',
        facturaSRI: '001-106-000005098',
        sec: 78,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'VIGO',
        cajas: 3300,
        producto: 'ME21-12',
        unidadesPorCaja: 12,
        destino: 'PORT EVERGLADES',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'KING OCEAN',
        buque: 'ALGOL',
        numeroContenedor: 'KOSU4921974',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE:02820224000286682 BUQUE 1 ABR.',
        transportistaTerrestre: 'ADETRANSCORP',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '12587',
        reqCliente: new Date(),
        refRep: 'EB-3741-1',
        fcl: 1,
        tamanioContenido: '40 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5102',
        facturaSRI: '001-106-000005102',
        sec: 79,
        cliente: 'INAEXPO USA LTD.CO.',
        marca: 'VIGO',
        cajas: 3300,
        producto: 'ME21-12',
        unidadesPorCaja: 12,
        destino: 'PORT EVERGLADES',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'KING OCEAN',
        buque: 'ALGOL',
        numeroContenedor: 'KOSU4924084',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE 028-2022-40-00295473 BUQUE 1 ABR.',
        transportistaTerrestre: 'ADETRANSCORP',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'AF8176',
        reqCliente: new Date(),
        refRep: 'GK-1073-1',
        fcl: 1,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5110',
        facturaSRI: '',
        sec: 2,
        cliente: 'MATZOT AVIV 2014 BAKING LTD',
        marca: 'KETO CHEF',
        cajas: 1400,
        producto: 'PYP01-E-AMK',
        unidadesPorCaja: 6,
        destino: 'ASHDOD',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'TRANSASIA PACIFIC S.A.',
        buque: 'MSC VAISHNAVI R.',
        numeroContenedor: 'TEMU2819370',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: 'DAE: 028-2022-40-00298241',
        transportistaTerrestre: 'ADETRANSCORP',
        valorFleteTerrestre:0,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'AF8176',
        reqCliente: new Date(),
        refRep: 'GK-1073-1',
        fcl: 1,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5110',
        facturaSRI: '',
        sec: 2,
        cliente: 'MATZOT AVIV 2014 BAKING LTD',
        marca: 'KETO CHEF',
        cajas: 1400,
        producto: 'PVR-01DK',
        unidadesPorCaja: 6,
        destino: 'ASHDOD',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'TRANSASIA PACIFIC S.A.',
        buque: 'MSC VAISHNAVI R.',
        numeroContenedor: 'TEMU2819370',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'CARGADO',
        comentarios: '',
        transportistaTerrestre: 'ADETRANSCORP',
        valorFleteTerrestre:600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '168232',
        reqCliente: new Date(),
        refRep: 'JR-1792-4',
        fcl: 2,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5109',
        facturaSRI: '',
        sec: 10,
        cliente: 'WALMART CHILE S.A.',
        marca: 'LIDER',
        cajas: 1589,
        producto: 'MS210',
        unidadesPorCaja: 24,
        destino: 'SAN ANTONIO',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'PANATLANTIC LOGISTICS S.A',
        buque: 'ANTOFAGASTA EXPRESS',
        numeroContenedor: '',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'LIBERADO',
        comentarios: '',
        transportistaTerrestre: '',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '168232',
        reqCliente: new Date(),
        refRep: 'JR-1792-4',
        fcl: 2,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5109',
        facturaSRI: '',
        sec: 10,
        cliente: 'WALMART CHILE S.A.',
        marca: 'LIDER',
        cajas: 187,
        producto: 'LMR-01',
        unidadesPorCaja: 24,
        destino: 'SAN ANTONIO',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'PANATLANTIC LOGISTICS S.A',
        buque: 'ANTOFAGASTA EXPRESS',
        numeroContenedor: '',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'LIBERADO',
        comentarios: '',
        transportistaTerrestre: '',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '168232',
        reqCliente: new Date(),
        refRep: 'JR-1792-4',
        fcl: 2,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '5109',
        facturaSRI: '',
        sec: 10,
        cliente: 'WALMART CHILE S.A.',
        marca: 'LIDER',
        cajas: 94,
        producto: 'LML-01',
        unidadesPorCaja: 24,
        destino: 'SAN ANTONIO',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'PANATLANTIC LOGISTICS S.A',
        buque: 'ANTOFAGASTA EXPRESS',
        numeroContenedor: '',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'LIBERADO',
        comentarios: 'BKG 216820827',
        transportistaTerrestre: '',
        valorFleteTerrestre: 600,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: '8171 SAP113309',
        reqCliente: new Date(),
        refRep: 'GK-1071-1',
        fcl: 1,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '',
        facturaSRI: '',
        sec: 2,
        cliente: 'SHUFER SAL LTD.',
        marca: 'SHUFERSAL',
        cajas: 1870,
        producto: 'ME21',
        unidadesPorCaja: 24,
        destino: 'HAIFA-ISRAEL',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'SAMISA',
        buque: 'MSC RONIT',
        numeroContenedor: '',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'PROGRAMADO',
        comentarios: '',
        transportistaTerrestre: '',
        valorFleteTerrestre: 350,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      },
      {
        planta: 'PLANTA STO DOMINGO',
        paisPlanta: 'ECUADOR',
        refCliente: 'RH1619-19',
        reqCliente: new Date(),
        refRep: 'RH-1619-19',
        fcl: 19,
        tamanioContenido: '20 PIES',
        unidadContenido: 'PIES',
        prefactAduana: '',
        facturaSRI: '',
        sec: 4,
        cliente: 'GEIMEX',
        marca: 'MONOPRIX',
        cajas: 1870,
        producto: 'ME21',
        unidadesPorCaja: 24,
        destino: 'LE HAVRE',
        termino: new Date(),
        finCuarentena: new Date(),
        etiquetaFin: new Date(),
        carga: new Date(),
        embarqueTentativo: new Date(),
        embarqueReal: new Date(),
        fechaFacturación: new Date(),
        naviera: 'CMA CGM',
        buque: 'GUAYAQUIL EXPRESS',
        numeroContenedor: '',
        sellos: ['H0453168', '15529CS', 'CCC5933', 'BRW8816', 'BPT1726', 'F23196T'],
        bl: ['GQL0260845'],
        estado: 'PROGRAMADO',
        comentarios: 'GQL0261927',
        transportistaTerrestre: '',
        valorFleteTerrestre: 300,
        puertoOrigen: 'GUAYAQUIL',
        valorFleteMarítimo: 0
      }
    ];
    return this.pedidos;
  }
  getColDefs(){
    this.pedidos = this.getPedidos();
    this.cols = Object.getOwnPropertyNames(this.pedidos[0]);
    this.cols.forEach(item => {
      let def = {field: item};
      this.colDefs.push(def);
    });
    return this.colDefs;
  }
}