import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { Author } from '../domain/author';
import { Book } from '../domain/book';
import { Genre } from '../domain/genre';
import { GenreService } from '../genre.service';
import { Location } from '@angular/common';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  authors: Author[] = [];
  genres: Genre[] = [];
  book?: Book;

  private editMode = true;

  bookForm = new FormGroup({
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required)
  });

  get authorControl() {
    return this.bookForm.controls['author'];
  }

  get genreControl() {
    return this.bookForm.controls['genre'];
  }

  get titleControl() {
    return this.bookForm.controls['title'];
  }

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private genreService: GenreService,
    private bookService: BookService,
    private location: Location) { }

  ngOnInit(): void {
    this.init();
    this.fillAuthors();
    this.fillGenres();
  }

  private fillAuthors(): void {
    this.authorService.getAuthors().subscribe(authorList => {
      this.authors = authorList._embedded.authors;
      this.authorControl.setValue(this.book?.author.name);
    });
  }

  private fillGenres(): void {
    this.genreService.getGenres().subscribe(genreList => {
      this.genres = genreList._embedded.genres;
      this.genreControl.setValue(this.book?.genre.name);
    });
  }

  private init(): void {
    this.editMode = this.route.snapshot.routeConfig?.path?.includes('book-edit') ?? false;
    if (this.editMode) {
      this.book = history.state.data;
      this.titleControl.setValue(this.book?.title);
    }
  }

  goBack(): void {
    this.location.back();
  }

  onSubmit(): void {
    
    if (this.bookForm.valid) {
      const book: Book = {
        title: this.titleControl.value,
        author: {name: this.authorControl.value},
        genre: {name: this.genreControl.value},
        comments: this.book?.comments,
        _links: this.book?._links
      }
      
      if (this.editMode) {
        this.bookService.updateBook(book).subscribe(() => this.goBack());
      } else {
        this.bookService.createBook(book).subscribe(() => this.goBack());
      }

    } else {
      Object.keys(this.bookForm.controls).forEach(key => {
        this.bookForm.controls[key].markAsDirty();
      });
    }
  }

}
