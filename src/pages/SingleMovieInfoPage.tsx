import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { SingleMovie } from "../data/singleMovieResult";
import { ActorsMovieResult } from "../data/actorsMovieResult";
import IMDB_logo from "../IMDB_logo.png";
import poster_not_found from "../poster-not-found-background.jpeg";
import { Configuration, OpenAIApi } from "openai";
import {
  useSingleMovie,
  useCast,
  useChatGPT,
  useIsCastLoading,
  useIsChatGPTLoading,
  useIsMovieLoading,
  useSetIsCastLoading,
  useSetIsChatGPTLoading,
  useSetIsMovieLoading,
  useSetCastAndCrew,
  useSetChatGPT,
  useSetSingleMovie,
} from "../store/store-zustand";

type Params = {
  movieId: string;
  movieList: string;
};

export default function SingleMovieInfoPage() {
  const params = useParams<Params>();

  // fetch the singleMovie via the movieId and the actors
  const [movie, setMovie] = [useSingleMovie(), useSetSingleMovie()];
  const [cast, setCastAndCrew] = [useCast(), useSetCastAndCrew()];
  const [chatGPT, setChatGPT] = [useChatGPT(), useSetChatGPT()];
  const [isChatGPTLoading, setIsChatGPTLoading] = [
    useIsChatGPTLoading(),
    useSetIsChatGPTLoading(),
  ];
  const [isCastLoading, setIsCastLoading] = [
    useIsCastLoading(),
    useSetIsCastLoading(),
  ];
  const [isMovieLoading, setIsMovieLoading] = [
    useIsMovieLoading(),
    useSetIsMovieLoading(),
  ];
  const [error, setError] = useState(false);

  //open ai configuration and response
  const openAI = new OpenAIApi(
    new Configuration({
      apiKey: process.env.REACT_APP_API_CHATGPT_KEY,
    })
  );

  //fetch the movie link and the credits for that movie,
  useEffect(() => {
    setMovie(null);
    setIsCastLoading(true);
    setIsMovieLoading(true);

    const movieLink = `${process.env.REACT_APP_API_TMDB_SINGLE_MOVIE_SEARCH!}${
      params.movieId
    }?api_key=${process.env.REACT_APP_API_TMDB_KEY}`;

    const creditsLink = `${process.env
      .REACT_APP_API_TMDB_SINGLE_MOVIE_SEARCH!}${
      params.movieId
    }/credits?api_key=${process.env.REACT_APP_API_TMDB_KEY}`;

    const getMovie = async (): Promise<SingleMovie> => {
      const movieResp = await fetch(movieLink);
      return await movieResp.json();
    };

    const getCastAndCrew = async (): Promise<ActorsMovieResult> => {
      const castAndCrewResp = await fetch(creditsLink);
      return await castAndCrewResp.json();
    };

    async function getMovieAndCast() {
      try {
        setMovie(await getMovie());
        setIsMovieLoading(false);
        setCastAndCrew(await getCastAndCrew());
        setIsCastLoading(false);
      } catch (e) {
        console.error(e);
        setError(true);
      }
    }
    getMovieAndCast();
  }, [params.movieId]);

  //useeffect to wait for the movie to be fetched and then ask chatGPT
  useEffect(() => {
    setIsChatGPTLoading(true);
    if (!isMovieLoading) {
      const chatGPTMessage = `I know that you are an AI language model so do not write that in the response. Up to your knowledge as of 2021, Are there any controversies connected to any actors, crew members and companies associated with the movie ${movie?.title}`;

      const getGPTResponse = async (): Promise<string> => {
        return await openAI
          .createChatCompletion({
            model: "gpt-3.5-turbo",
            messages: [
              {
                role: "user",
                content: chatGPTMessage,
              },
            ],
          })
          .then((res) => {
            return res.data.choices[0].message?.content!;
          });
      };
      const getResponse = async function () {
        try {
          setChatGPT(await getGPTResponse());
          setIsChatGPTLoading(false);
        } catch (e) {
          console.error(e);
          setError(true);
        }
      };
      getResponse();
    }
  }, [isMovieLoading]);

  const isPosterAvailable = movie?.poster_path
    ? `https://image.tmdb.org/t/p/original/${movie?.poster_path}`
    : poster_not_found;

  return (
    <div className="flex flex-col relative text-white py-3 px-4 overflow-hidden">
      <img
        src={isPosterAvailable}
        alt={movie?.title}
        className="w-full h-full object-cover brightness-[0.25] blur-sm absolute -z-10 scale-150"
      />
      <div className="flex flex-col flex-wrap gap-5 sm:flex-row sm:flex-nowrap">
        <img
          src={isPosterAvailable}
          alt={movie?.title}
          className="w-80 mx-auto border-2 border-solid rounded-2xl"
        />
        <div>
          <div className="flex gap-3 items-baseline">
            <h1 className="font-bold text-3xl">{movie?.title}</h1>
            <a
              target="_blank"
              rel="noreferrer"
              href={`https://www.imdb.com/title/${movie?.imdb_id}`}
            >
              <img
                src={IMDB_logo}
                title={`go to ${movie?.title}'s IMDB webpage`}
                alt={`IMDB logo and link to ${movie?.title}'s IMDB webpage`}
                className="w-11 rounded"
              />
            </a>
            <p className="font-bold text-lg">
              {movie?.vote_average.toFixed(1)}
            </p>
          </div>
          <p className="font-bold pt-4">Genres</p>
          <ul className="list-none">
            {movie?.genres.map((genre) => (
              <li key={genre.id} className="pl-6">
                {genre.name}
              </li>
            ))}
          </ul>
          <p className="font-bold pt-4">Top Cast:</p>
          {isCastLoading ? (
            <p>Loading Cast...</p>
          ) : (
            <ul className="list-none">
              {cast?.cast?.slice(0, 10).map((actor) => (
                <li key={actor.cast_id} className="pl-6">
                  {actor.name} as "{actor.character}"
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
      <h2 className="font-bold text-3xl pt-4 pb-3">Overview:</h2>
      <p className="">{movie?.overview}</p>
      <div className="flex-wrap">
        <h2 className="font-bold text-2xl pt-4 pb-3">
          Is {movie?.title} controversial?{" "}
          <span className="text-xs">(powered by ChatGPT)</span>
        </h2>
        <p>{isChatGPTLoading ? "Loading response..." : `${chatGPT}`}</p>
        {error && (
          <p className="text-red-500">
            There was a problem fetching the data, see console log
          </p>
        )}
      </div>
    </div>
  );
}
