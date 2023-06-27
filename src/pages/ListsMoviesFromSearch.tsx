import { Link, useParams, useSearchParams } from "react-router-dom";

type Params = {
  movieList: string;
  movieId: string;
};

export function ListsMoviesFromSearch() {
  const params = useParams<Params>();
  const [searchParams] = useSearchParams();
  const search = searchParams.get("search");
  if (search === null || search === "") {
    return (
      <div>
        <div>Nothing to seach</div>
        <p>
          {params.movieId} and {params.movieList}
        </p>
      </div>
    );
  }

  return <div>{search?.toLowerCase()}</div>;
}
