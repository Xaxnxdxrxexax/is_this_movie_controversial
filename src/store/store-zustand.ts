import { create } from "zustand";
import { Movie, MovieResult } from "../data/searchMoviesResult";

type Store = {
  movieList: Movie | null;
  popularList: Movie | null;
  favorites: MovieResult[] | null;
};

const useStore = create((set) => ({
  movieList: null,
  popularList: null,
  favorites: null,
  setMovieList: (newList: Movie) => set(() => ({ movieList: newList })),
  setPopularList: (newList: Movie) => set(() => ({ popularList: newList })),
  setFavorites: (newList: Movie) => set(() => ({ favorites: newList })),
}));

export const useMovieList = () => useStore((state) => state.movieList);
export const usePopularList = () => useStore((state) => state.popularList);
export const useFavorites = () => useStore((state) => state.favorites);
export const useSetMovieList = () => useStore((state) => state.setMovieList);
export const useSetPopularList = () =>
  useStore((state) => state.setPopularList);
export const useSetFavorites = () => useStore((state) => state.useSetFavorites);
