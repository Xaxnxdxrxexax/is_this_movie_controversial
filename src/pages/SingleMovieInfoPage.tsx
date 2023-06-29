import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleMovie } from "../data/singleMovieResult";
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
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [cast, setCastAndCrew] = useState<ActorsMovieResult | null>(null);
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [isCastLoading, setIsCastLoading] = useState(true);

  useEffect(() => {
    const movieLink = `${process.env
      .REACT_APP_API_TMDB_SINGLE_MOVIE_SEARCH!}${movieId}?api_key=${
      process.env.REACT_APP_API_TMDB_KEY
    }`;

    const creditsLink = `${process.env
      .REACT_APP_API_TMDB_SINGLE_MOVIE_SEARCH!}${movieId}/credits?api_key=${
      process.env.REACT_APP_API_TMDB_KEY
    }`;

    const getMovie = async (): Promise<SingleMovie> => {
      const movieResp = await fetch(movieLink);
      console.log("the link for get movie:", movieLink);
      return await movieResp.json();
    };
    // https://youtu.be/VcOMq3LQtBU?t=683
    const getCastAndCrew = async (): Promise<ActorsMovieResult> => {
      const castAndCrewResp = await fetch(creditsLink);
      console.log("the link for the credits", creditsLink);
      return await castAndCrewResp.json();
    };
    setIsMovieLoading(true);
    setIsCastLoading(true);
    async function getMovieAndCast() {
      try {
        setMovie(await getMovie());
        console.log("the movie state", movie?.imdb_id);
        setIsMovieLoading(false);
        setCastAndCrew(await getCastAndCrew());
        console.log("the cast state", cast?.cast[0]);
        setIsCastLoading(false);
      } catch (e) {
        console.error(e);
      }
    }
    getMovieAndCast();
  }, []);

  return (
    <div className="text-center">
      <div>
        {isMovieLoading && <p>Movie is loading...</p>}
        {movie?.title}
      </div>
      <div>..and..</div>
      <div>
        {isCastLoading && <p>Cast is loading...</p>}
        {cast?.cast[0].name}
      </div>
    </div>
  );
}
