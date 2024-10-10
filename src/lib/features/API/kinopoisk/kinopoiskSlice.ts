import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios, { AxiosError } from 'axios';
import { Movie, Review, MoviesResponse } from './types';

// Токен API
const token = '6M6GK5M-7GMM2R7-JD7J0W1-4Z5VYBK';

// Асинхронные thunks

// Популярные фильмы
export const fetchPopularMovies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  'kinopoisk/fetchPopularMovies',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<MoviesResponse> = await axios.get<MoviesResponse>(
        'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=movie&rating.kp=7-10&lists=popular-films',
        {
          headers: {
            accept: 'application/json',
            'X-API-KEY': token,
          },
        }
      );
      return response.data.docs; // Убедитесь, что 'docs' — это массив фильмов
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error fetching popular movies');
    }
  }
);

// Поиск по параметрам
export const searchMovies = createAsyncThunk<Movie[], Record<string, any>, { rejectValue: string }>(
  'kinopoisk/searchMovies',
  async (searchParams, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<MoviesResponse> = await axios.get<MoviesResponse>('https://api.kinopoisk.dev/v1.4/movie', {
        params: searchParams,
        headers: {
          accept: 'application/json',
          'X-API-KEY': token,
        },
      });
      return response.data.docs;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error searching movies');
    }
  }
);

// Поиск по названию
export const searchMoviesByTitle = createAsyncThunk<Movie[], string, { rejectValue: string }>(
  'kinopoisk/searchMoviesByTitle',
  async (title, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<MoviesResponse> = await axios.get<MoviesResponse>('https://api.kinopoisk.dev/v1.4/movie/search', {
        params: { query: title },
        headers: {
          accept: 'application/json',
          'X-API-KEY': token,
        },
      });
      return response.data.docs;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error searching movies by title');
    }
  }
);

// Топ 250 фильмов
export const fetchTop250Movies = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  'kinopoisk/fetchTop250Movies',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<MoviesResponse> = await axios.get<MoviesResponse>(
        'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=movie&lists=top250&rating.kp=7-10',
        {
          headers: {
            accept: 'application/json',
            'X-API-KEY': token,
          },
        }
      );
      return response.data.docs;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error fetching top 250 movies');
    }
  }
);

// Мультфильмы
export const fetchCartoons = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  'kinopoisk/fetchCartoons',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<MoviesResponse> = await axios.get<MoviesResponse>(
        'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=cartoon&rating.kp=5-10',
        {
          headers: {
            accept: 'application/json',
            'X-API-KEY': token,
          },
        }
      );
      return response.data.docs;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error fetching cartoons');
    }
  }
);

// Сериалы
export const fetchSerials = createAsyncThunk<Movie[], void, { rejectValue: string }>(
  'kinopoisk/fetchSerials',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<MoviesResponse> = await axios.get<MoviesResponse>(
        'https://api.kinopoisk.dev/v1.4/movie?page=1&limit=250&type=tv-series&lists=popular-series&rating.kp=7-10',
        {
          headers: {
            accept: 'application/json',
            'X-API-KEY': token,
          },
        }
      );
      return response.data.docs;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error fetching serials');
    }
  }
);

// Положительные отзывы пользователей
export const fetchUserPositiveReview = createAsyncThunk<Review[], void, { rejectValue: string }>(
  'kinopoisk/fetchUserPositiveReview',
  async (_, { rejectWithValue }) => {
    try {
      const response: AxiosResponse<Review[]> = await axios.get<Review[]>('https://api.kinopoisk.dev/v1.4/review', {
        params: {
          page: 1,
          limit: 250,
          type: 'Позитивный',
        },
        headers: {
          accept: 'application/json',
          'X-API-KEY': token,
        },
      });
      return response.data;
    } catch (error) {
      const axiosError = error as AxiosError;
      return rejectWithValue(axiosError.response?.data || 'Error fetching user positive reviews');
    }
  }
);

// Интерфейс состояния
interface KinopoiskState {
  popularMovies: Movie[];
  top250Movies: Movie[];
  cartoons: Movie[];
  serials: Movie[];
  userPositiveReviews: Review[];
  searchResults: Movie[];
  loading: boolean;
  error: string | null;
}

// Начальное состояние
const initialState: KinopoiskState = {
  popularMovies: [],
  top250Movies: [],
  cartoons: [],
  serials: [],
  userPositiveReviews: [],
  searchResults: [],
  loading: false,
  error: null,
};

// Слайс
const kinopoiskSlice = createSlice({
  name: 'kinopoisk',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    // Popular Movies
    builder.addCase(fetchPopularMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchPopularMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false;
      state.popularMovies = action.payload;
    });
    builder.addCase(fetchPopularMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching popular movies';
    });

    // Top 250 Movies
    builder.addCase(fetchTop250Movies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchTop250Movies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false;
      state.top250Movies = action.payload;
    });
    builder.addCase(fetchTop250Movies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching top 250 movies';
    });

    // Cartoons
    builder.addCase(fetchCartoons.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchCartoons.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false;
      state.cartoons = action.payload;
    });
    builder.addCase(fetchCartoons.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching cartoons';
    });

    // Serials
    builder.addCase(fetchSerials.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchSerials.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false;
      state.serials = action.payload;
    });
    builder.addCase(fetchSerials.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching serials';
    });

    // Search Movies
    builder.addCase(searchMovies.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchMovies.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false;
      state.searchResults = action.payload;
    });
    builder.addCase(searchMovies.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error searching movies';
    });

    // Search by Title
    builder.addCase(searchMoviesByTitle.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(searchMoviesByTitle.fulfilled, (state, action: PayloadAction<Movie[]>) => {
      state.loading = false;
      state.searchResults = action.payload;
    });
    builder.addCase(searchMoviesByTitle.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error searching movies by title';
    });

    // User Positive Reviews
    builder.addCase(fetchUserPositiveReview.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchUserPositiveReview.fulfilled, (state, action: PayloadAction<Review[]>) => {
      state.loading = false;
      state.userPositiveReviews = action.payload;
    });
    builder.addCase(fetchUserPositiveReview.rejected, (state, action) => {
      state.loading = false;
      state.error = action.payload || 'Error fetching user positive reviews';
    });
  },
});

export default kinopoiskSlice.reducer;