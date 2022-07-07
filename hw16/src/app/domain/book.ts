import { Author } from "./author";
import { Genre } from "./genre";
import { Comment } from "./comment";

export interface Book {
    title: string;
    author: Author;
    genre: Genre;
    comments?: Comment[];
    _links?: {
        self: {
            href: string;
        }    
    }
}

export interface BookList {
    _embedded: {
        books: Book[];
    }
}