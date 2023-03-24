import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError} from "rxjs/operators";
import Swal from "sweetalert2";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor() {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError((err) => {
        let errorCode = err.status;
        let mensaje = '';
        let texto = '';
        if(errorCode >= 400 && errorCode <= 499){
          mensaje = '';
        }
        if(errorCode >= 500 && errorCode <= 599){
          mensaje = 'Error de Servidor';
        }
        debugger
        switch(err.status){
          case 400:
            mensaje = 'Solicitud fallida';
            texto = 'Error: 400';
            break;
          case 401:
            mensaje = 'Solicitud no autorizada';
            texto = 'Error: 401';
            break;
          case 403:
            mensaje = 'Solicitud prohibida';
            texto = 'Error: ' + err.message;
            break;
          case 404:
          case 410:
            mensaje = 'Recurso no encontrado';
            texto = 'Error: ' + err.status;
            break;
          case 408:
            mensaje = 'Tiempo de espera superado';
            texto = 'Error: 408';
            break;
          case 503:
            mensaje = 'Servicio no disponible, vuelva a intentarlo';
            texto = 'Error: 503';
            break;
          case 504:
            mensaje = 'Tiempo de espera excedido, intente otra consulta';
            texto = 'Error: 504';
            break;
          default:
            mensaje = 'Error no controlado';
            if(err.name == "HttpErrorResponse" && err.error.timeStamp > 40000){
              mensaje = 'Tiempo de espera superado';
              texto = 'Se ha excedido el tiempo máximo de espera, intente otra consulta';
            }else{
              texto = 'Error ' + errorCode + ' ' + err.message;
            }
            break;
        }
        Swal.fire({
          text: texto,
          title: mensaje,
          icon: "error",
          confirmButtonText: 'Entiendo',
          confirmButtonColor: '#224668'
        });
        return throwError(err);
      }),
    );
  }
}
