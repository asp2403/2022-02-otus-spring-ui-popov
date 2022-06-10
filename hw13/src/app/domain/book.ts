import { Author } from "./author";
import { Genre } from "./genre";

export interface Book {
    id: string | null;
    title: string;
    author: Author;
    genre: Genre;
}