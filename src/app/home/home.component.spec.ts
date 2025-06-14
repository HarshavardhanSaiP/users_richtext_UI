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
  it('should call getRecipes and navigate on successful search', () => {
    const searchText = 'test';
    const mockData = [{ id: 1, name: 'Recipe 1' }];
    spyOn(apiService, 'getRecipes').and.returnValue(of(mockData));
    spyOn(router, 'navigate');

    component.onSearch(searchText);

    expect(apiService.getRecipes).toHaveBeenCalledWith(searchText);
    expect(router.navigate).toHaveBeenCalledWith(['/list-recipe'], { state: { data: mockData } });
  });
  it('should log error on failed search', () => {
    const searchText = 'test';
    const error = 'Error fetching recipes';
    spyOn(apiService, 'getRecipes').and.returnValue(throwError({ message: error }));
    spyOn(console, 'error');

    component.onSearch(searchText);

    expect(apiService.getRecipes).toHaveBeenCalledWith(searchText);
    expect(console.error).toHaveBeenCalledWith('Error fetching recipes:', { message: error });
  });

});
