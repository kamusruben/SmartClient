import {Component, Input, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import Swal from 'sweetalert2';
import {ProgramacionService} from "../../services/programacion.service";
import {finalize} from "rxjs/operators";
import {Programacion} from "../../../util/custom-data-types/pedido";

@Component({
  selector: 'btn-trash',
  template: `
    <div>
      <button class="btn btn-outline-dark" (click)="removeHandler($event)"><i class="fa fa-remove"></i></button>
    </div>
  `
})
export class BotonesOpcionComponent implements ICellRendererAngularComp {
  private params: any

  constructor(private _programacionService: ProgramacionService) {
  }

  agInit(params: any): void {
    this.params = params;
  }

  refresh(params: any): boolean {
    return false;
  }

  removeHandler(event: any) {
    this._programacionService.validarBorrado(this.params.data.codigoProgramacion).subscribe((rsp)=>{
      if(rsp){
        Swal.fire({
          title: '¿Está seguro de eliminar este registro?',
          showDenyButton: true,
          showCancelButton: false,
          confirmButtonText: 'Confirmar',
          denyButtonText: 'Cancelar',
          confirmButtonColor: '#224668',
          denyButtonColor: '#DD3333',
          icon: "question"
        }).then((result) => {
          /* Read more about isConfirmed, isDenied below */
          if (result.isConfirmed) {
            const spinner = document.getElementById('spinner').classList.remove('d-none');
            // Swal.fire('Saved!', '', 'success')
            //this.params.clicked(this.params, 'remove')
            // this._programacionService.borrarDetalle(this.params.data.codigoProgramacion)
            this._programacionService.borrarDetalle(this.params.data.codigoProgramacion)
              .subscribe(() => {
                Swal.fire({
                  icon: 'success',
                  title: 'Registro eliminado con éxito',
                  confirmButtonText: 'Listo!',
                  confirmButtonColor: '#224668'
                }).then(()=>{
                  const spinner = document.getElementById('spinner').classList.add('d-none');
                  document.getElementById('aplicarFiltros').click();
                });
              });
          } else if (result.isDenied) {
            //Swal.fire('Changes are not saved', '', 'info')
          }
        });
      }else{
        Swal.fire({
          title: 'No se puede eliminar',
          text: 'La programación tiene varios contenedores',
          showConfirmButton: false,
          showCancelButton: true,
          cancelButtonText: 'Entendido',
          cancelButtonColor:'#DD3333',
          icon: "warning"
        })
      }
    });
  }

}
