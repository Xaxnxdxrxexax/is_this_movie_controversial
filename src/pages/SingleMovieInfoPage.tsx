import { useParams } from "react-router-dom";
import { singleMovie } from "../data/singleMovieResult";
import { ActorsMovieResult } from "../data/actorsMovieResult";

type Params = {
  movieId: string;
  movieList: string;
};

export default function SingleMovieInfoPage() {
  const params = useParams<Params>();
  // turn id into an integer only if it has a value
  const movieId =
    params.movieId === undefined ? undefined : parseInt(params.movieId);
  // fetch the singleMovie via the movieId and the actors
  return (
    <div>
      {movieId === undefined ? (
        <h1>Unknown movie Id</h1>
      ) : (
        <div className="text-center">
          <h1>{singleMovie.title}</h1>
          <p>{singleMovie.overview}</p>
          <p>
            {movieId} and {params.movieList}
          </p>
        </div>
      )}
    </div>
  );
}
