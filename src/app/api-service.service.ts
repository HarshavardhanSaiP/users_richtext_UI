import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environment/environment';
import { catchError, Observable, throwError } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ApiServiceService {

  private userCache: any[] | null = null;

  constructor(private http:HttpClient) { }

  private handleError(operation = 'operation') {
    return (error: any) => {
      console.error(`${operation} failed:`, error);
      return throwError(error);
    };
  }

  getUsers(searchText: string): Observable<any[]> {
    const params = new HttpParams().set('searchText', searchText);
    return this.http.get<any[]>(`${environment.apiUrl}api/users/search`, { params }).pipe(
      catchError(this.handleError('getUsers'))
    );
  }
  
  setUsers(users: any[]) {
    this.userCache = users;
  }

  getCachedUsers(): any[] | null {
    return this.userCache;
  }

  getUserByIdOrEmail(idOrEmail: string): Observable<any> {
    return this.http.get<any>(`${environment.apiUrl}api/users/find`, {
      params: { id: idOrEmail }
    }).pipe(
      catchError(this.handleError('getUserByIdOrEmail'))
    );
  }
  
  clearUsers() {
    this.userCache = null;
  }

}
