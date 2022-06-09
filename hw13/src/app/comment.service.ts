import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Comment } from './domain/comment';
@Injectable({
  providedIn: 'root'
})
export class CommentService {

  private url = '/api/comments/'

  constructor(private http: HttpClient) { }

  addComment(comment: Comment): Observable<Comment> {
    return this.http.post<Comment>(this.url, comment);
  }

  deleteComment(id: string): Observable<void> {
    return this.http.delete<void>(this.url + id);
  }
}
