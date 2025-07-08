import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { ApiServiceService } from '../api-service.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

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

    component.onSearch();

    expect(apiService.getUsers).toHaveBeenCalledWith(component.searchText);
    expect(apiService.setUsers).toHaveBeenCalledWith(mockData);
    expect(router.navigate).toHaveBeenCalledWith(['/list-users'], { state: { data: mockData } });
  });

  it('should call getUserByIdOrEmail and navigate to details on id search with one user', () => {
    component.searchByIdOrEmail = true;
    component.searchText = '1';
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' };
    spyOn(apiService, 'getUserByIdOrEmail').and.returnValue(of(mockUser));
    spyOn(router, 'navigate');

    component.onSearch();

    expect(apiService.getUserByIdOrEmail).toHaveBeenCalledWith('1');
    expect(router.navigate).toHaveBeenCalledWith(['/details', 1], { state: { data: mockUser } });
  });

  it('should call getUserByIdOrEmail and navigate to details on email search with one user', () => {
    component.searchByIdOrEmail = true;
    component.searchText = 'john@example.com';
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe', role: 'admin', email: 'john@example.com' };
    spyOn(apiService, 'getUserByIdOrEmail').and.returnValue(of(mockUser));
    spyOn(router, 'navigate');

    component.onSearch();

    expect(apiService.getUserByIdOrEmail).toHaveBeenCalledWith('john@example.com');
    expect(router.navigate).toHaveBeenCalledWith(['/details', 1], { state: { data: mockUser } });
  });

  it('should show popup if searchText is empty for id/email search', () => {
    component.searchByIdOrEmail = true;
    component.searchText = '';
    spyOn(component, 'showPopup');
    component.onSearch();
    expect(component.showPopup).toHaveBeenCalledWith('Please enter an ID or Email.');
  });

  it('should show popup if getUsers returns error', () => {
    component.searchByIdOrEmail = false;
    spyOn(apiService, 'getUsers').and.returnValue(throwError(() => new Error('error')));
    spyOn(component, 'showPopup');
    component.onSearch();
    expect(component.showPopup).toHaveBeenCalledWith('No user found or server error.');
  });

  it('should show popup if getUserByIdOrEmail returns null', () => {
    component.searchByIdOrEmail = true;
    component.searchText = 'notfound';
    spyOn(apiService, 'getUserByIdOrEmail').and.returnValue(of(null));
    spyOn(component, 'showPopup');
    component.onSearch();
    expect(component.showPopup).toHaveBeenCalledWith('No user details for current search');
  });

  it('should show popup if getUserByIdOrEmail throws error', () => {
    component.searchByIdOrEmail = true;
    component.searchText = 'error';
    spyOn(apiService, 'getUserByIdOrEmail').and.returnValue(throwError(() => new Error('error')));
    spyOn(component, 'showPopup');
    component.onSearch();
    expect(component.showPopup).toHaveBeenCalledWith('No user details for current search');
  });

  it('should call onIdOrEmailSearch if searchByIdOrEmail is true', () => {
    component.searchByIdOrEmail = true;
    spyOn(component, 'onIdOrEmailSearch');
    component.onSearch();
    expect(component.onIdOrEmailSearch).toHaveBeenCalled();
  });

  it('should call getUsers if searchByIdOrEmail is false', () => {
    component.searchByIdOrEmail = false;
    spyOn(apiService, 'getUsers').and.returnValue(of([]));
    spyOn(apiService, 'setUsers');
    spyOn(router, 'navigate');
    component.onSearch();
    expect(apiService.getUsers).toHaveBeenCalled();
  });
});
