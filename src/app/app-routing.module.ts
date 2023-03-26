import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TablaComponent } from "./pedido/components/tabla/tabla.component";
import {AuthGuard} from "./guard/auth.guard";

const routes: Routes = [
  {
    path: 'home',
    component: TablaComponent,
    canActivate: [AuthGuard]
  }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
