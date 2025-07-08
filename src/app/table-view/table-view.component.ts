import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AgGridModule } from 'ag-grid-angular';
import { ClientSideRowModelModule, ColDef, GridOptions } from 'ag-grid-community';
import { ApiServiceService } from '../api-service.service';

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
    {headerName: 'First Name', field: 'firstName', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Last Name', field: 'lastName', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Email', field: 'email', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Username', field: 'username', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Gender', field: 'gender', filter: true , filterParams:{maxNumConditions:1}},
    {headerName: 'Age', field: 'age', filter: true, filterParams:{maxNumConditions:1}, sortable: true, sort: 'asc'},
    {headerName: 'Role', field: 'role', filter: true , filterParams:{maxNumConditions:1}},
  ];

  gridOptions: GridOptions = {
    context: {
      componentParent: this
    },
    onRowClicked: this.onRowClicked.bind(this)
  }
  constructor(private router: Router, private apiService: ApiServiceService) {}

  onRowClicked(event: any): void {
    console.log('User sent to details:', event.data);
    this.router.navigate(['/details', event.data.id], {state: {data: event.data}});
  }

  onGridReady(params: any) {
    params.api.sizeColumnsToFit();
  }
  
  ngOnInit() {
    this.rowData = history.state.data;
    if (!this.rowData || this.rowData.length === 0) {
      this.rowData = this.apiService.getCachedUsers() || [];
    }
  }

  goBack() {
    this.apiService.clearUsers();
    this.router.navigate(['/']);
  }
  

}
