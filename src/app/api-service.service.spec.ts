import { TestBed } from '@angular/core/testing';
import { ApiServiceService } from './api-service.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { environment } from '../environment/environment';
import { throwError } from 'rxjs';

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

  it('should call getUsers and return data', () => {
    const searchText = 'test';
    const mockData = [{ id: 1, firstName: 'John', lastName: 'Doe', role: 'admin' }];

    service.getUsers(searchText).subscribe((data) => {
      expect(data).toEqual(mockData);
    });

    const req = httpMock.expectOne(`${environment.apiUrl}api/users/search?searchText=${searchText}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockData);
  });

  it('should handle error on getUsers', (done) => {
    const searchText = 'test';
    const errorEvent = new ProgressEvent('error');
    service.getUsers(searchText).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      }
    });
    const req = httpMock.expectOne(`${environment.apiUrl}api/users/search?searchText=${searchText}`);
    req.error(errorEvent);
  });

  it('should call getUserByIdOrEmail and return data', () => {
    const idOrEmail = '1';
    const mockUser = { id: 1, firstName: 'John', lastName: 'Doe' };
    service.getUserByIdOrEmail(idOrEmail).subscribe((data) => {
      expect(data).toEqual(mockUser);
    });
    const req = httpMock.expectOne(`${environment.apiUrl}api/users/find?id=${idOrEmail}`);
    expect(req.request.method).toBe('GET');
    req.flush(mockUser);
  });

  it('should handle error on getUserByIdOrEmail', (done) => {
    const idOrEmail = '1';
    const errorEvent = new ProgressEvent('error');
    service.getUserByIdOrEmail(idOrEmail).subscribe({
      next: () => fail('should have failed with an error'),
      error: (error) => {
        expect(error).toBeTruthy();
        done();
      }
    });
    const req = httpMock.expectOne(`${environment.apiUrl}api/users/find?id=${idOrEmail}`);
    req.error(errorEvent);
  });

  it('should set, get, and clear cached users', () => {
    const users = [{ id: 1, firstName: 'John' }];
    service.setUsers(users);
    expect(service.getCachedUsers()).toEqual(users);
    service.clearUsers();
    expect(service.getCachedUsers()).toBeNull();
  });
});
