import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { MovieResult } from "../data/searchMoviesResult";

const initialState: MovieResult[] | null = null;

export const favoriteSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    handleFavoritesAction: (
      state: MovieResult[] | null,
      action: PayloadAction<{
        movie: MovieResult;
        e: React.MouseEvent<HTMLParagraphElement, MouseEvent>;
      }>
    ) => {
      action.payload.e.stopPropagation();
      let newFavoriteList;
      if (state?.find((fav) => fav.id === action.payload.movie.id)) {
        newFavoriteList = state?.filter(
          (fav) => fav.id !== action.payload.movie.id
        );
      } else {
        newFavoriteList = state
          ? [...state!, action.payload.movie]
          : [action.payload.movie];
      }
      state = newFavoriteList;
    },
    readLocalStorageAction: (state: MovieResult[] | null) => {
      const movieFavorites: MovieResult[] =
        JSON.parse(
          localStorage.getItem("is_this_movie_controversial_fav") || ""
        ) ?? null;
      if (movieFavorites) {
        state = movieFavorites;
      }
    },
  },
});

export const { handleFavoritesAction, readLocalStorageAction } =
  favoriteSlice.actions;

export default favoriteSlice.reducer;
