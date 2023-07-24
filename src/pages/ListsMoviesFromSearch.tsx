import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieResult } from "../data/searchMoviesResult";
import MovieBox from "../components/MovieBox";
import poster_not_found from "../poster-not-found-background.jpeg";
import {
  useMovieList,
  useFavorites,
  usePopularList,
  useSetFavorites,
  useSetMovieList,
  useSetPopularList,
} from "../store/store-zustand";

type Params = {
  movieList: string;
};

export function ListsMoviesFromSearch() {
  const [movieList, setMovieList] = [useMovieList(), useSetMovieList()];
  const [popularList, setPopularList] = [usePopularList(), useSetPopularList()];
  const [favorites, setFavorites] = [useFavorites(), useSetFavorites()];
  const params = useParams<Params>();

  // Fetch the popular list of movies
  useEffect(() => {
    const popularLink = `${process.env.REACT_APP_API_TMDB_POPULAR_MOVIES}?api_key=${process.env.REACT_APP_API_TMDB_KEY}`;
    const getPopularList = async (): Promise<Movie> => {
      const popularResp = await fetch(popularLink);
      return await popularResp.json();
    };

    async function getPopularMovies() {
      try {
        setPopularList(await getPopularList());
      } catch (e) {
        console.error(e);
      }
    }
    getPopularMovies();
  }, []);

  // Fetch the list of movies from the params.movieList value
  useEffect(() => {
    if (params.movieList === undefined) {
      return;
    }
    const moviesSearchLink = `${process.env
      .REACT_APP_API_TMDB_SEARCH_MOVIES!}?api_key=${
      process.env.REACT_APP_API_TMDB_KEY
    }&query=${encodeURIComponent(params.movieList!)}`;

    const getMovieList = async (): Promise<Movie> => {
      const movieListResp = await fetch(moviesSearchLink);
      return await movieListResp.json();
    };

    async function getListOfMovies() {
      try {
        setMovieList(await getMovieList());
      } catch (e) {
        console.error(e);
      }
    }
    getListOfMovies();
  }, [params.movieList]);

  // get favorites useEffect
  useEffect(() => {
    const movieFavoritesJSON = localStorage.getItem(
      "is_this_movie_controversial_fav"
    );
    if (movieFavoritesJSON) {
      try {
        const movieFavorites: MovieResult[] = JSON.parse(movieFavoritesJSON);
        console.log("favorites", movieFavorites);
        setFavorites(movieFavorites);
      } catch (error) {
        console.error("Error parsing favorites:", error);
        // Handle the error or provide a default value if necessary
      }
    }
  }, []);

  //manage the local storage for the favorite movies list
  function updateLocalStorage(movieFavorites: MovieResult[]) {
    localStorage.setItem(
      "is_this_movie_controversial_fav",
      JSON.stringify(movieFavorites)
    );
  }

  function handleFavorites(
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    movie: MovieResult
  ) {
    e.stopPropagation();
    let newFavoriteList;
    if (favorites?.find((fav) => fav.id === movie.id)) {
      newFavoriteList = favorites?.filter((fav) => fav.id !== movie.id);
    } else {
      newFavoriteList = favorites ? [...favorites!, movie] : [movie];
    }
    setFavorites(newFavoriteList);
    updateLocalStorage(newFavoriteList);
  }

  const displayResultsStyle = "flex justify-center items-stretch flex-wrap";
  const listToShow = params.movieList ? movieList : popularList;
  return (
    <div className="relative overflow-clip">
      <img
        src={poster_not_found}
        alt="background"
        className="w-full h-full object-cover brightness-[0.4] blur-sm absolute -z-10 scale-150"
      />
      <h2 className="text-center font-bold text-white text-4xl pt-2">
        {listToShow === movieList ? "Search Results" : "Popular Movies"}
      </h2>
      <ul className={displayResultsStyle}>
        {listToShow ? (
          listToShow?.results.map((movie) => (
            <MovieBox
              movie={movie}
              handleFavorites={handleFavorites}
              key={movie.id}
            />
          ))
        ) : (
          <div>Search something first</div>
        )}
      </ul>
      <h2 className="text-center font-bold text-white text-4xl pt-2">
        Favorite Movies
      </h2>
      <ul className={displayResultsStyle}>
        {favorites?.length !== 0 ? (
          favorites?.map((movie) => (
            <MovieBox
              movie={movie}
              handleFavorites={handleFavorites}
              key={movie.id}
            />
          ))
        ) : (
          <div className="text-center text-white text-xl py-2">
            No favorite movies at the moment...
          </div>
        )}
      </ul>
    </div>
  );
}
