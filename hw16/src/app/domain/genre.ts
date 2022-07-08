export interface Genre {
    name: string;
}

export interface GenreList {
    _embedded: {
        genres: Genre[];
    }
}