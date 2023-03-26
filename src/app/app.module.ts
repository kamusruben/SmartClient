import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MaterialModule } from "../shared/material.module";
import {PedidoModule} from "./pedido/pedido.module";
import {SharedModule} from "../shared/shared.module";
import {AuthInterceptor} from "./interceptors/auth.intercepto";
import {initializeKeycloak} from "./util/configs/keycloack-init.factory";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    MaterialModule,
    SharedModule,
    PedidoModule,
    KeycloakAngularModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  },{
    provide: APP_INITIALIZER,
    useFactory: initializeKeycloak,
    multi: true,
    deps: [KeycloakService]
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
