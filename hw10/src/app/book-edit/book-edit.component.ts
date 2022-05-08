import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { AuthorService } from '../author.service';
import { BookService } from '../book.service';
import { Author } from '../domain/author';
import { Book } from '../domain/book';
import { Genre } from '../domain/genre';
import { GenreService } from '../genre.service';

@Component({
  selector: 'app-book-edit',
  templateUrl: './book-edit.component.html',
  styleUrls: ['./book-edit.component.css']
})
export class BookEditComponent implements OnInit {

  authors: Author[] = [];
  genres: Genre[] = [];
  book?: Book;

  bookForm = new FormGroup({
    author: new FormControl('', Validators.required),
    genre: new FormControl('', Validators.required),
    title: new FormControl('', Validators.required)
  });

  constructor(
    private route: ActivatedRoute,
    private authorService: AuthorService,
    private genreService: GenreService,
    private bookService: BookService) { }

  ngOnInit(): void {
    this.fillAuthors();
    this.fillGenres();
    this.init();
  }

  private fillAuthors(): void {
    this.authorService.getAuthors().subscribe(authors => this.authors = authors);
  }

  private fillGenres(): void {
    this.genreService.getGenres().subscribe(genres => this.genres = genres);
  }

  private init(): void {
    const id = this.route.snapshot.paramMap.get('id');
    if (id) {
      this.bookService.getBook(id).subscribe(b => {
        this.book = b;
        this.bookForm.controls['title'].setValue(b.title);
        this.bookForm.controls['author'].setValue(b.author);
        this.bookForm.controls['genre'].setValue(b.genre);
      });
    }
  }

}
