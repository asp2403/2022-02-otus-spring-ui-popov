import { Component, OnInit } from '@angular/core';
import { BookService } from '../book.service';
import { Book } from '../domain/book';

@Component({
  selector: 'app-index',
  templateUrl: './index.component.html',
  styleUrls: ['./index.component.css']
})
export class IndexComponent implements OnInit {

  books: Book[] = [];

  constructor(private bookService: BookService) { }

  ngOnInit(): void {
    this.bookService.getBooks().subscribe(books => this.books = books);
  }

  editBook(book: Book): void {
    alert('edit');
  }

  deleteBook(book: Book): void {
    alert('delete');
  }

}
