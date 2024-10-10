// Интерфейс для рейтинга
export interface Rating {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number | null;
  }
  
  // Интерфейс для голосов
  export interface Votes {
    kp: number;
    imdb: number;
    filmCritics: number;
    russianFilmCritics: number;
    await: number;
  }
  
  // Интерфейс для постера
  export interface Poster {
    url: string;
    previewUrl: string;
  }
  
  // Интерфейс для жанров
  export interface Genre {
    name: string;
  }
  
  // Интерфейс для стран
  export interface Country {
    name: string;
  }
  
  // Интерфейс для фильма
  export interface Movie {
    id: number;
    name: string;
    alternativeName: string | null;
    enName: string | null;
    type: string;
    typeNumber: number;
    year: number;
    description: string | null;
    shortDescription: string | null;
    status: string | null;
    rating: Rating;
    votes: Votes;
    movieLength: number | null;
    totalSeriesLength: number | null;
    seriesLength: number | null;
    ratingMpaa: string | null;
    ageRating: number;
    poster: Poster;
    backdrop: Poster;
    genres: Genre[];
    countries: Country[];
    top10: number | null;
    top250: number | null;
    isSeries: boolean;
    ticketsOnSale: boolean;
  }
  
  // Интерфейс для отзыва
  export interface Review {
    id: number;
    text: string;
  }
  
  // Интерфейс для ответа API
  export interface MoviesResponse {
    docs: Movie[];
  }