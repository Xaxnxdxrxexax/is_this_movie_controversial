import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Movie, MovieResult } from "../data/searchMoviesResult";
import MovieBox from "../components/MovieBox";

type Params = {
  movieList: string;
};

export function ListsMoviesFromSearch() {
  const [movieList, setMovieList] = useState<Movie | null>(null);
  const [favorites, setFavorites] = useState<MovieResult[] | null>(null);
  const params = useParams<Params>();
  //const [searchParams] = useSearchParams();
  //const search = searchParams.get("search");

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
    const movieFavorites: MovieResult[] =
      JSON.parse(
        localStorage.getItem("is_this_movie_controversial_fav") || ""
      ) ?? null;
    if (movieFavorites) {
      setFavorites(movieFavorites);
    }
  }, []);

  //other functions
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
  return (
    <div>
      <h2 className="text-center font-bold">Search List</h2>
      <ul className={displayResultsStyle}>
        {movieList ? (
          movieList?.results.map((movie) => (
            <MovieBox
              movie={movie}
              handleFavorites={handleFavorites}
              favorites={favorites}
              key={movie.id}
            />
          ))
        ) : (
          <div>Search something first</div>
        )}
      </ul>
      <h2 className="text-center font-bold">Favorites List</h2>
      <ul className={displayResultsStyle}>
        {favorites?.length !== 0 ? (
          favorites?.map((movie) => (
            <MovieBox
              movie={movie}
              handleFavorites={handleFavorites}
              favorites={favorites}
              key={movie.id}
            />
          ))
        ) : (
          <div className="text-center">No favorites at the moment</div>
        )}
      </ul>
    </div>
  );
}
