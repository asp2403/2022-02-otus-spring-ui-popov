import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ConfirmationService } from 'primeng/api';
import { BookService } from '../book.service';
import { Book } from '../domain/book';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService, private confirmationService: ConfirmationService, private router: Router) { }

  ngOnInit(): void {
    this.loadBooks();
  }

  private loadBooks(): void {
    this.bookService.getBooks().subscribe(bookList => this.books = bookList._embedded.books);
  }

  deleteBook(book: Book): void {
    this.confirmationService.confirm({
      message: 'Вы действительно хотите удалить книгу "' + book.title + '"?',
      accept: () => 
        this.bookService.deleteBook(book.id).subscribe(() => this.loadBooks())
      
    });
  }

  showDetails(book: Book): void {
    let href: string | undefined = book._links?.self.href;
    if (href) {
      this.bookService.getBook(href).subscribe(book => this.router.navigate(['/book-details'], {state: {data: book}}));
    }
  }
}
