import { Link } from "react-router-dom";
import { MovieResult } from "../data/searchMoviesResult";
import posterNotFound from "../poster-not-found-background.jpeg";
import FavoriteSVG from "./FavoriteSVG";

type Props = {
  movie: MovieResult;
  handleFavorites: (
    e: React.MouseEvent<HTMLParagraphElement, MouseEvent>,
    movie: MovieResult
  ) => void;
  favorites: MovieResult[] | null;
};

export default function MovieBox({ movie, handleFavorites, favorites }: Props) {
  const isInFavorites = favorites?.find((fav) => fav.id === movie.id);
  return (
    <div className="grid grid-rows-[4fr_1fr] items-center w-52 m-3 rounded-2xl border border-gray-600 overflow-clip cursor-pointer">
      <Link to={movie.id.toString()} key={movie.id} className="block h-full">
        <img
          src={
            movie.poster_path !== null
              ? `https://image.tmdb.org/t/p/w300/${movie.poster_path}`
              : posterNotFound
          }
          alt={movie.title}
          title={`Go to ${movie.title}'s detailed page`}
          className="object-cover h-full blur-[1px] transition ease-in-out hover:blur-none hover:scale-110"
        />
      </Link>
      <div className="bg-white z-10 flex justify-between items-center px-1 h-full">
        <p title={movie.title} className="text-sm cursor-text">
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
