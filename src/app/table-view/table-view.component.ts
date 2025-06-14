import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, ColDef, GridOptions } from 'ag-grid-community';

@Component({
  selector: 'app-table-view',
  standalone: true,
  imports: [AgGridModule],
  templateUrl: './table-view.component.html',
  styleUrl: './table-view.component.scss'
})
export class TableViewComponent {

  @Input("rowData") rowData!: any[];
  columnDefs : ColDef[] = [
    {headerName: 'Recipe Name', field: 'name', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Servings', field: 'servings', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Difficulty', field: 'difficulty', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Preparation Time', field: 'prepTimeMinutes', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Cuisine', field: 'cuisine', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Rating', field: 'rating', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'CaloriesPerServing', field: 'caloriesPerServing', filter: true , filterParams:{maxNumConditions:1}},
  ];

  gridOptions: GridOptions = {
    context: {
      componentParent: this
    },
    onRowClicked: this.onRowClicked.bind(this)
  }
  constructor(private router: Router) {}

  onRowClicked(event: any): void {
    this.router.navigate(['/details', event.data.id], {state: {data: event.data}});
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }
  
  ngOnInit() {
    this.rowData = history.state.data;
  }

 
  

}
