import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { of } from 'rxjs';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;
  let apiService: ApiServiceService;
  let router: Router;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ HttpClientTestingModule,
        RouterTestingModule, 
        HomeComponent ],
        providers: [ApiServiceService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HomeComponent);
    apiService = TestBed.inject(ApiServiceService);
    router = TestBed.inject(Router);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should call getUsers and navigate to list-users on free text search', () => {
    const searchText = 'john';
    const mockData = [
      { id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' },
      { id: 2, firstName: 'Johnny', lastName: 'Smith', role: 'user' }
    ];
    spyOn(apiService, 'getUsers').and.returnValue(of(mockData));
    spyOn(router, 'navigate');
    spyOn(apiService, 'setUsers');

    component.onSearch(searchText, 'free');

    expect(apiService.getUsers).toHaveBeenCalledWith(searchText);
    expect(apiService.setUsers).toHaveBeenCalledWith(mockData);
    expect(router.navigate).toHaveBeenCalledWith(['/list-users'], { state: { data: mockData } });
  });

  it('should call getUsers and navigate to details on id search with one user', () => {
    const searchText = '1';
    const mockData = [
      { id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' }
    ];
    spyOn(apiService, 'getUsers').and.returnValue(of(mockData));
    spyOn(router, 'navigate');

    component.onSearch(searchText, 'id');

    expect(apiService.getUsers).toHaveBeenCalledWith(searchText);
    expect(router.navigate).toHaveBeenCalledWith(['/details', 1], { state: { data: mockData[0] } });
  });

  it('should call getUsers and navigate to details on email search with one user', () => {
    const searchText = 'john@example.com';
    const mockData = [
      { id: 1, firstName: 'John', lastName: 'Doe', role: 'admin', email: 'john@example.com' }
    ];
    spyOn(apiService, 'getUsers').and.returnValue(of(mockData));
    spyOn(router, 'navigate');

    component.onSearch(searchText, 'email');

    expect(apiService.getUsers).toHaveBeenCalledWith(searchText);
    expect(router.navigate).toHaveBeenCalledWith(['/details', 1], { state: { data: mockData[0] } });
  });

  it('should show popup if searchText is empty', () => {
    spyOn(component, 'showPopup');
    component.onSearch('', 'free');
    expect(component.showPopup).toHaveBeenCalledWith('Please enter a value to search.');
  });
});
