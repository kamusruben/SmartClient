import {Component, OnInit} from '@angular/core';
import {
  ColDef,
  GridReadyEvent,
  RowSelectedEvent,
  SelectionChangedEvent
} from "ag-grid-community";
import {Mockup} from "../../../mockup/mockup";
import {Pedido} from '../../../util/custom-data-types/pedido';
import {FormControl, Validators} from '@angular/forms';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {MatDatepicker} from "@angular/material/datepicker";

@Component({
  selector: 'app-revision',
  templateUrl: './revision.component.html',
  styleUrls: ['./revision.component.scss']
})
export class RevisionComponent implements OnInit {

  public columnDefs: ColDef[] = [];
  rowSelection: 'single' | 'multiple';
  public defaultColDef: {};
  components: {};
  private mockup: Mockup = new Mockup();
  public rowData: Pedido[] = [];
  public pedido: Pedido;

  myControl = new FormControl('');
  options: string[] = ['One', 'Two', 'Three'];
  filteredOptions: Observable<string[]>;

  /*DatePicker*/
  minDate: Date;
  maxDate: Date;
  picker: any;
  picker2: any;

  /*Select*/
  selected = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);
  selectFormControl = new FormControl('valid', [Validators.required, Validators.pattern('valid')]);

  nativeSelectFormControl = new FormControl('valid', [
    Validators.required,
    Validators.pattern('valid'),
  ]);


  toppings = new FormControl('');
  toppingList: string[] = ['Extra cheese', 'Mushroom', 'Onion', 'Pepperoni', 'Sausage', 'Tomato'];

  constructor() {
  }

  ngOnInit(): void {
    this.mockup = new Mockup();
    this.rowData = this.mockup.getPedidos();
    this.columnDefs = this.mockup.getColDefs();
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value || '')),
    );
    this.rowSelection = 'single';
    this.defaultColDef = {
      // editable: true,
      sortable: true,
      flex: 0,
      // minWidth: 150,
      // filter: true,
      // floatingFilter: true,
      // resizable: true,
    };
    this.components = {

    }
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }

  public onSelectionChanged(event: SelectionChangedEvent) {
    console.log('Se ha seleccionado');
    var rowCount = event.api.getSelectedNodes();
    console.log('Se tiene: ');
    console.log(rowCount);
    this.pedido = rowCount[0].data;
  }

}
