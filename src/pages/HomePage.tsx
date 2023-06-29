import { useEffect, useState } from "react";
import { SingleMovie } from "../data/singleMovieResult";
import { ActorsMovieResult } from "../data/actorsMovieResult";

export default function HomePage() {
  const [movie, setMovie] = useState<SingleMovie | null>(null);
  const [cast, setCastAndCrew] = useState<ActorsMovieResult | null>(null);

  useEffect(() => {
    const getMovie = async (): Promise<SingleMovie> => {
      const movieResp = await fetch(
        process.env.REACT_APP_API_URL_SINGLE_MOVIE!
      );
      return await movieResp.json();
    };
    // https://youtu.be/VcOMq3LQtBU?t=683 remember that it needs a url: string
    const getCastAndCrew = async (): Promise<ActorsMovieResult> => {
      const castAndCrewResp = await fetch(
        process.env.REACT_APP_API_URL_ACTORS!
      );
      return await castAndCrewResp.json();
    };

    async function getMovieAndCast() {
      try {
        setMovie(await getMovie());
        setCastAndCrew(await getCastAndCrew());
      } catch (e) {
        console.error(e);
      }
    }
    getMovieAndCast();
  }, []);

  return (
    <div>
      {movie?.title}..and..
      {cast?.cast[0].name}
    </div>
  );
}
