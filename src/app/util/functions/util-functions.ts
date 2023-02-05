import { isNull } from "@angular/compiler/src/output/output_ast";
import {isNullCheck} from "@angular/core/schematics/utils/typescript/nodes";

export class UtilFunctions {
    public constructor(){

    }
    public nullOrEmpty(opcion: string, base: string = 'TODOS') {
      if((typeof opcion != 'undefined' && opcion)) {
        if (opcion != '' && opcion != base) {
          return false;
        }
        return true;
      }
      return true;
    }
    public stringToDate(fecha: string){
      let secciones = fecha.split('/');
      let fechaFormat = secciones[1]+'/'+secciones[0]+'/'+secciones[2];
      return new Date(fechaFormat);
    }
}
