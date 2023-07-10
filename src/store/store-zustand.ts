import { create } from "zustand";
import { Movie, MovieResult } from "../data/searchMoviesResult";
import { SingleMovie } from "../data/singleMovieResult";
import { ActorsMovieResult } from "../data/actorsMovieResult";

type State = {
  movieList: Movie | null;
  popularList: Movie | null;
  favorites: MovieResult[] | null;
  singleMovie: SingleMovie | null;
  cast: ActorsMovieResult | null;
  chatGPT: string | null;
  isChatGPTLoading: Boolean;
  isCastLoading: Boolean;
  isMovieLoading: Boolean;
};

type Action = {
  setMovieList: (newList: State["movieList"]) => void;
  setPopularList: (newList: State["popularList"]) => void;
  setFavoritesList: (newList: State["favorites"]) => void;
  setSingleMovie: (movie: State["singleMovie"]) => void;
  setCastAndCrew: (cast: State["cast"]) => void;
  setChatGPT: (chatGPT: State["chatGPT"]) => void;
  setIsChatGPTLoading: (value: State["isChatGPTLoading"]) => void;
  setIsCastLoading: (value: State["isCastLoading"]) => void;
  setIsMovieLoading: (value: State["isMovieLoading"]) => void;
};

const useStore = create<State & Action>((set) => ({
  movieList: null,
  popularList: null,
  favorites: null,
  singleMovie: null,
  cast: null,
  chatGPT: null,
  isCastLoading: true,
  isChatGPTLoading: true,
  isMovieLoading: true,
  setSingleMovie: (movie) => set(() => ({ singleMovie: movie })),
  setCastAndCrew: (cast) => set(() => ({ cast: cast })),
  setChatGPT: (chatGPT) => set(() => ({ chatGPT: chatGPT })),
  setMovieList: (newList) => set(() => ({ movieList: newList })),
  setPopularList: (newList) => set(() => ({ popularList: newList })),
  setFavoritesList: (newList) => set(() => ({ favorites: newList })),
  setIsChatGPTLoading: (value) => set({ isChatGPTLoading: value }),
  setIsCastLoading: (value) => set({ isCastLoading: value }),
  setIsMovieLoading: (value) => set({ isMovieLoading: value }),
}));

export const useMovieList = () => useStore((state) => state.movieList);
export const usePopularList = () => useStore((state) => state.popularList);
export const useFavorites = () => useStore((state) => state.favorites);
export const useSingleMovie = () => useStore((state) => state.singleMovie);
export const useCast = () => useStore((state) => state.cast);
export const useChatGPT = () => useStore((state) => state.chatGPT);
export const useIsCastLoading = () => useStore((state) => state.isCastLoading);
export const useIsChatGPTLoading = () =>
  useStore((state) => state.isChatGPTLoading);
export const useIsMovieLoading = () =>
  useStore((state) => state.isMovieLoading);
export const useSetMovieList = () => useStore((state) => state.setMovieList);
export const useSetCastAndCrew = () =>
  useStore((state) => state.setCastAndCrew);
export const useSetChatGPT = () => useStore((state) => state.setChatGPT);
export const useSetIsChatGPTLoading = () =>
  useStore((state) => state.setIsChatGPTLoading);
export const useSetIsMovieLoading = () =>
  useStore((state) => state.setIsMovieLoading);
export const useSetIsCastLoading = () =>
  useStore((state) => state.setIsCastLoading);
export const useSetSingleMovie = () =>
  useStore((state) => state.setSingleMovie);
export const useSetPopularList = () =>
  useStore((state) => state.setPopularList);
export const useSetFavorites = () =>
  useStore((state) => state.setFavoritesList);
