import { createBrowserRouter, RouterProvider } from "react-router-dom";
import SingleMovieInfoPage from "./pages/SingleMovieInfoPage";
import AboutMePage from "./pages/AboutMePage";
import App from "./App";
import ErrorPage from "./pages/ErrorPage";
import HomePage from "./pages/HomePage";
import { ListsMoviesFromSearch } from "./pages/ListsMoviesFromSearch";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "about-me",
        element: <AboutMePage />,
      },
      {
        path: ":movieList",
        element: <ListsMoviesFromSearch />,
      },
      {
        path: ":movieList/:movieId",
        element: <SingleMovieInfoPage />,
      },
    ],
  },
]);

export function Routes() {
  return <RouterProvider router={router} />;
}
