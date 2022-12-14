import { Pipe, PipeTransform } from '@angular/core';

@Pipe({ name: 'defaultDate' })
export class DateFormat implements PipeTransform {
  transform(fecha: Date, format: string = 'dd-mm-yyyy'): string {
    let dd: string | number = fecha.getDate();
    dd = dd < 10 ? '0' + dd : dd;
    let mm: string | number = fecha.getMonth() + 1;
    mm = mm < 10 ? '0' + mm : mm;
    let yyyy = fecha.getFullYear()
    return dd+'/'+mm+'/'+yyyy;
  }
}
