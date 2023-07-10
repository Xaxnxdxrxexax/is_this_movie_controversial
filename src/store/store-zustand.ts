import { create } from "zustand";
import { Movie, MovieResult } from "../data/searchMoviesResult";

type State = {
  movieList: Movie | null;
  popularList: Movie | null;
  favorites: MovieResult[] | null;
};

type Action = {
  setMovieList: (newList: State["movieList"]) => void;
  setPopularList: (newList: State["popularList"]) => void;
  setFavoritesList: (newList: State["favorites"]) => void;
};

const useStore = create<State & Action>((set) => ({
  movieList: null,
  popularList: null,
  favorites: null,
  setMovieList: (newList) => set(() => ({ movieList: newList })),
  setPopularList: (newList) => set(() => ({ popularList: newList })),
  setFavoritesList: (newList) => set(() => ({ favorites: newList })),
}));

export const useMovieList = () => useStore((state) => state.movieList);
export const usePopularList = () => useStore((state) => state.popularList);
export const useFavorites = () => useStore((state) => state.favorites);
export const useSetMovieList = () => useStore((state) => state.setMovieList);
export const useSetPopularList = () =>
  useStore((state) => state.setPopularList);
export const useSetFavorites = () =>
  useStore((state) => state.setFavoritesList);
