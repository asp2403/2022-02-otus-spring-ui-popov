import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../domain/book';
import { Comment } from '../domain/comment';
import { Location } from '@angular/common';
import { AuthService } from '../auth.service';
import { ConfirmationService } from 'primeng/api';
import { CommentService } from '../comment.service';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book?: Book;
  comments?: Comment[];

  constructor(private route: ActivatedRoute, private bookService: BookService, private location: Location, 
    private authService: AuthService, private confirmationService: ConfirmationService, private commentService: CommentService) { }

  ngOnInit(): void {
    this.getBook()
    this.getBookComments();
  }

  private getBook(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBook(id).subscribe(book => this.book = book);
    }
  }

  private getBookComments(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBookComments(id).subscribe(comments => this.comments = comments);
    }
  }

  goBack(): void {
    this.location.back();
  }

  hasAnyRole(roleNames: string[]): boolean {
    return this.authService.hasAnyRole(roleNames);
  }

  deleteComment(comment: Comment): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить комментарий?',
      accept: () => {
        if (comment.id) {
          this.commentService.deleteComment(comment.id).subscribe(() => this.getBookComments());
        }  
      }
      
    });
  }

  

}
