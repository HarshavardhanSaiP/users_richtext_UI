import { TestBed, ComponentFixture } from '@angular/core/testing';
import { TableViewComponent } from './table-view.component';
import { AgGridModule } from 'ag-grid-angular';
import { Router } from '@angular/router';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ApiServiceService } from '../api-service.service';

describe('TableViewComponent', () => {
  let component: TableViewComponent;
  let fixture: ComponentFixture<TableViewComponent>;
  let router: Router;
  let apiService: ApiServiceService;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgGridModule, RouterTestingModule, HttpClientTestingModule, TableViewComponent],
      providers: [ApiServiceService]
    }).compileComponents();

    fixture = TestBed.createComponent(TableViewComponent);
    component = fixture.componentInstance;
    router = TestBed.inject(Router);
    apiService = TestBed.inject(ApiServiceService);
  });

  beforeEach(() => {
    Object.defineProperty(window, 'history', {
      value: {
        state: {
          data: [{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' }]
        }
      }
    });
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  it('should call onRowClicked and navigate to details', () => {
    const event = { data: { id: 1 } };
    spyOn(router, 'navigate');
    component.onRowClicked(event);
    expect(router.navigate).toHaveBeenCalledWith(['/details', 1], { state: { data: event.data } });
  });

  it('should call onGridReady and size columns to fit', () => {
    const params = {
      api: {
        sizeColumnsToFit: jasmine.createSpy('sizeColumnsToFit')
      }
    };
    component.onGridReady(params);
    expect(params.api.sizeColumnsToFit).toHaveBeenCalled();
  });

  it('should set rowData from history.state.data on ngOnInit', () => {
    component.ngOnInit();
    expect(component.rowData).toEqual([{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' }]);
  });

  it('should fallback to cached users if history.state.data is missing', (done) => {
    Object.defineProperty(window, 'history', {
      value: { state: { data: undefined } }
    });
    spyOn(apiService, 'getCachedUsers').and.returnValue([{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' }]);
    component.ngOnInit();
    expect(component.rowData).toEqual([{ id: 2, firstName: 'Jane', lastName: 'Smith', role: 'user' }]);
    done();
  });
});
