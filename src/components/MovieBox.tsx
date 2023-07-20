import { Link } from "react-router-dom";
import { MovieResult } from "../data/searchMoviesResult";
import posterNotFound from "../poster-not-found-background.jpeg";
import FavoriteSVG from "./FavoriteSVG";
import { useParams } from "react-router-dom";
import { useFavorites } from "../store/store-zustand";

type Params = {
  movieList: string;
};

type Props = {
  movie: MovieResult;
  handleFavorites: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    movie: MovieResult
  ) => void;
};

export default function MovieBox({ movie, handleFavorites }: Props) {
  const favorites = useFavorites();
  const isInFavorites = favorites?.find((fav) => fav.id === movie.id);
  const params = useParams<Params>();
  return (
    <div className="grid grid-rows-[4fr_1fr] items-center w-52 m-3 rounded-2xl border border-white overflow-clip cursor-pointer">
      <Link
        to={`${params.movieList}/${movie.id.toString()}`}
        key={movie.id}
        className="block h-full"
      >
        <img
          src={
            movie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : posterNotFound
          }
          alt={movie.title}
          title={`Go to ${movie.title}'s detailed page`}
          className="object-cover h-full sm:blur-[1px] transition ease-in-out hover:blur-none hover:scale-110"
        />
      </Link>
      <div className="bg-white z-10 flex justify-between items-center px-1 h-full">
        <p title={movie.title} className="text-base cursor-text">
          {movie.title}
        </p>
        <div
          title={
            isInFavorites
              ? `Remove ${movie.title} from favorites`
              : `Add ${movie.title} to favorites`
          }
          onClick={(e) => {
            handleFavorites(e, movie);
          }}
          className="transition hover:scale-150 hover:translate-y-1"
        >
          <FavoriteSVG favorites={favorites} movie={movie} />
        </div>
      </div>
    </div>
  );
}
