// import { FunctionsGeneric } from './../util/';
// import { KeycloakService } from 'keycloak-angular';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HttpResponse } from "@angular/common/http";
import { Inject, Injectable, PLATFORM_ID } from "@angular/core";
import { Observable, of, throwError } from "rxjs";
// import Swal from 'sweetalert2';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(
    @Inject(PLATFORM_ID) private _platformId: string,
    // protected keycloakAngular: KeycloakService
  ) {
    // this.getToken();
  }

  // async getToken() {
  //   const userDetails = await this.keycloakAngular.getToken();
  //   FunctionsGeneric.setToken(userDetails);
  // }

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    // this.getToken();
    let token = "Bearer " + localStorage.getItem('token');
    console.log('Token intercept: ' + token)
    const authReq = req.clone({
      setHeaders: {
        authorization: token,
        platform: this._platformId,
        // lang: FunctionsGeneric.getLang()
      }
    },);
    return next.handle(authReq);
  }
}
function handleError(err: any) {
  let errorMessage = '';

  if (err.status === 404) {
    Swal.fire({
      title: "error",
      text: "Petición no encontrada - 404 -"
    });
  }
  if (err.status === 400) {
    Swal.fire({
      title: "error",
      text: "Lo sentimos existen un problema de petición - 400 -"
    });
  }
  if (err.status === 0 || err.status === 4) {
    Swal.fire({
      title: "error",
      text: "En este momento estamos presentando inconvenientes"
    });
  }
  if (err.status === 500) {
    Swal.fire({
      title: "error",
      text: "No se pudo realizar conexión, servidor en mantenimiento"
    });
  }
  if (err.status === 405) {
    Swal.fire({
      title: "error",
      text: "No se pudo realizar conexión, servidor en mantenimiento"
    });
  }
  return throwError(errorMessage);
}
