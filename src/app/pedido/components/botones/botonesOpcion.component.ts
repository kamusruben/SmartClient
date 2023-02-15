import {Component, Input, OnInit} from '@angular/core';
import {ICellRendererAngularComp} from "ag-grid-angular";
import Swal from 'sweetalert2';
import {ProgramacionService} from "../../services/programacion.service";
import {finalize} from "rxjs/operators";

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
    console.log('event');
    console.log(event);
    console.log(this.params);
    Swal.fire({
      title: '¿Está seguro de eliminar este regisrto?',
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
        // Swal.fire('Saved!', '', 'success')
        //this.params.clicked(this.params, 'remove')
        // this._programacionService.borrarDetalle(this.params.data.codigoProgramacion)
        this._programacionService.borrarDetalle(this.params.data.codigoDetalleProgramacion)
          .subscribe(() => {
            Swal.fire({
              icon: 'success',
              title: 'Registro eliminado con éxito',
              confirmButtonText: 'Listo!',
              confirmButtonColor: '#224668'
            });
          });
      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })

  }

}
