import { Component, OnInit } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { AuthService } from '../auth.service';
import { BookService } from '../book.service';
import { Book } from '../domain/book';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService, private confirmationService: ConfirmationService, private authService: AuthService) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  editBook(book: Book): void {
    alert('edit');
  }

  deleteBook(book: Book): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить книгу "' + book.title + '"?',
      accept: () => 
        this.bookService.deleteBook(book.id).subscribe(() => this.loadBooks())
      
    });
  }

  hasRole(roleName: string): boolean {
    return this.authService.hasRole(roleName);
  }
}
