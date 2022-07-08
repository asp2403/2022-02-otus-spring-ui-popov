export interface Author {
    name: string;
}

export interface AuthorList {
    _embedded: {
        authors: Author[];
    }
}