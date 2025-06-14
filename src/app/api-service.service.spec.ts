import { TestBed } from '@angular/core/testing';

import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environment/environment';

describe('ApiServiceService', () => {
  let service: ApiServiceService;
  let httpMock: HttpTestingController;


  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(ApiServiceService);
    httpMock = TestBed.inject(HttpTestingController);
 
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
  it('should call getRecipes and return data', () => {
    const searchText = 'test';
    const mockData = [{ id: 1, name: 'Recipe 1' }];

    service.getRecipes(searchText).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}api/recipes/search?searchText=${searchText}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

});
