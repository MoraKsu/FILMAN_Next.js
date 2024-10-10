import { configureStore } from '@reduxjs/toolkit';
import kinopoiskReducer from '../lib/features/API/kinopoisk/kinopoiskSlice';

export const store = configureStore({
    reducer: {
      kinopoisk: kinopoiskReducer,
    },
  });
  
  // Типы для store, dispatch и state
  export type RootState = ReturnType<typeof store.getState>;
  export type AppDispatch = typeof store.dispatch;