import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, throwError } from 'rxjs';
import { Genre, GenreList } from './domain/genre';

@Injectable({
  providedIn: 'root'
})
export class GenreService {

  private url = 'api/genres/';

  constructor(private http: HttpClient) { }

  getGenres(): Observable<GenreList> {
    return this.http.get<GenreList>(this.url)
      .pipe(
        catchError(this.handleError)
      );
  }


  private handleError(error: HttpErrorResponse) {
    console.error(error.error);
    return throwError(() => new Error('Error in genre.service'));
  }
}
