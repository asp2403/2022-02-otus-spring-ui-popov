import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book } from './domain/book';
import { Comment } from './domain/comment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = '/api/books/';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<Book[]> {
    return this.http.get<Book[]>(this.url)
      .pipe(
        catchError(this.handleError)
      );       
  }

  getBook(id: string): Observable<Book> {
    return this.http.get<Book>(this.url + id)
      .pipe(
        catchError(this.handleError)
      ); 
  }

  getBookComments(id: string): Observable<Comment[]> {
    return this.http.get<Comment[]>(this.url + id + '/comments')
      .pipe(
        catchError(this.handleError)
      ); 
  }

  updateBook(book: Book): Observable<any> {
    return this.http.put<void>(this.url, book)
    .pipe(
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.error);
    return throwError(() => new Error('Error in book.service'));
  }
}
