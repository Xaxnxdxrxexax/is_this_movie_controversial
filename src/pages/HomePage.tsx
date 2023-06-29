import { useEffect, useState } from "react";
import { SingleMovie } from "../data/singleMovieResult";
import { ActorsMovieResult } from "../data/actorsMovieResult";

export default function HomePage() {
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [cast, setCastAndCrew] = useState<ActorsMovieResult | null>(null);
  const [isMovieLoading, setIsMovieLoading] = useState(true);
  const [isCastLoading, setIsCastLoading] = useState(true);

  useEffect(() => {
    const movieLink = `${process.env
      .REACT_APP_API_TMDB_SINGLE_MOVIE_SEARCH!}550?api_key=${
      process.env.REACT_APP_API_TMDB_KEY
    }`;

    const creditsLink = `${process.env
      .REACT_APP_API_TMDB_SINGLE_MOVIE_SEARCH!}550/credits?api_key=${
      process.env.REACT_APP_API_TMDB_KEY
    }`;

    const getMovie = async (): Promise<SingleMovie> => {
      const movieResp = await fetch(movieLink);
      console.log("the link for get movie:", movieLink);
      return await movieResp.json();
    };
    // https://youtu.be/VcOMq3LQtBU?t=683 remember that it needs a url: string
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
        console.log("the movie state", movie?.genres);
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
