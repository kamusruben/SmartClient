import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PedidoRoutingModule } from './pedido-routing.module';
import { RevisionComponent } from './components/revision/revision.component';
import {MaterialModule} from "../../shared/material.module";
import {SharedModule} from "../../shared/shared.module";


@NgModule({
  declarations: [
    RevisionComponent
  ],
  imports: [
    CommonModule,
    PedidoRoutingModule,
    MaterialModule,
    SharedModule
  ]
})
export class PedidoModule { }
