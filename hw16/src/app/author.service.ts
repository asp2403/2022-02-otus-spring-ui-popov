import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Author, AuthorList } from './domain/author';

@Injectable({
  providedIn: 'root'
})
export class AuthorService {

  private url = '/api/authors/';

  constructor(private http: HttpClient) { }

  getAuthors(): Observable<AuthorList> {
    return this.http.get<AuthorList>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    console.error(error.error);
    return throwError(() => new Error('Error in author.service'));
  }

}
