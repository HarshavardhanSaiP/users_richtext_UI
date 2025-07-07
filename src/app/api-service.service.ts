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

  getUsers(searchText: string): Observable<any[]> {
    const params = new HttpParams().set('searchText', searchText);
    return this.http.get<any[]>(`${environment.apiUrl}api/users/search`, { params }).pipe(
      catchError((error) => {
        // Log the error to the console for debugging
        console.error('Error occurred:', error);
        // Handle the error as per your application logic
        return throwError(error);
      })
    );
  }
  
  setUsers(users: any[]) {
    this.userCache = users;
  }

  getCachedUsers(): any[] | null {
    return this.userCache;
  }
}
