import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, of, throwError } from 'rxjs';
import { catchError, map, tap } from 'rxjs/operators';
import { Book, BookList } from './domain/book';
import { Comment } from './domain/comment';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  private url = '/api/books/';

  constructor(private http: HttpClient) { }

  getBooks(): Observable<BookList> {
    return this.http.get<BookList>(this.url + '?projection=bookCommentCount')
      .pipe(
        catchError(this.handleError)
      );       
  }

  getBook(href: string): Observable<Book> {
    return this.http.get<Book>(href)
      .pipe(
        catchError(this.handleError)
      ); 
  }

  updateBook(book: Book): Observable<any> {
    let href = book._links?.self.href;
    if (href) {
      return this.http.put<void>(href, book)
      .pipe(
        catchError(this.handleError)
      );
    } else {
      return of(null);
    }
  }

  createBook(book: Book): Observable<any> {
    return this.http.post<void>(this.url, book)
    .pipe(
      catchError(this.handleError)
    );
  }

  deleteBook(book: Book): Observable<any> {
    let href = book._links?.self.href;
    if (href) {
      return this.http.delete<void>(href)
      .pipe(
        catchError(this.handleError)
      );
      } else {
        return of(null);
      }  
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.message);
    console.error(error.statusText);
    console.error(error.error);
    return throwError(() => new Error('Error in book.service'));
  }
}
