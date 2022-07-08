import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { Book } from '../domain/book';
import { Comment } from '../domain/comment';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent implements OnInit {

  book?: Book;
  comments?: Comment[];

  constructor(private route: ActivatedRoute, private bookService: BookService, private location: Location) { }

  ngOnInit(): void {
    this.getBook()
    //this.getBookComments();
  }

  private getBook(): void {
    this.book = history.state.data;
  }

  goBack(): void {
    this.location.back();
  }

  

}
