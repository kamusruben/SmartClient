import { Component, OnInit } from '@angular/core';
import {ColDef} from "ag-grid-community";
import {Mockup} from "../../../mockup/mockup";
import { Pedido } from './../../../pedido';
import {FormControl} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {

  public columnDefs: ColDef[] = [];
  private mockup: Mockup = new Mockup();
  public rowData: Pedido[] = [];

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  constructor() { }

  ngOnInit(): void {
    this.mockup = new Mockup();
    this.rowData = this.mockup.getPedidos();
    this.columnDefs = this.mockup.getColDefs();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

}
