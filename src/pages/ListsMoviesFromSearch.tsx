import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Movie } from "../data/searchMoviesResult";

type Params = {
  movieList: string;
  movieId: string;
};

export function ListsMoviesFromSearch() {
  const [movieList, setMovieList] = useState<Movie | null>(null);
  const params = useParams<Params>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");

  useEffect(() => {
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

  if (search === null || search === "") {
    return (
      <ul>
        {movieList?.results.map((movie) => (
          <li key={movie.id}>
            <Link to={movie.id.toString()}>{movie.title}</Link>
          </li>
        ))}
      </ul>
    );
  }

  return <div>{search?.toLowerCase()}</div>;
}
