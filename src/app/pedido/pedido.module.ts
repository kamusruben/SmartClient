import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";
import { ModificarComponent } from './components/modificar/modificar.component';
import { TablaComponent } from './components/tabla/tabla.component';


@NgModule({
  declarations: [
    ModificarComponent,
    TablaComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PedidoModule { }
