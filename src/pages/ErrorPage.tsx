import Footer from "../components/Footer";
import Header from "../components/Header";
import poster_not_found from "../poster-not-found-background.jpeg";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <Header />
      <div className="p-0 text-white overflow-clip relative">
        <img
          src={poster_not_found}
          alt="background"
          className="object-cover brightness-[0.5] blur-sm absolute -z-10  overflow-hidden w-full h-full scale-110"
        />
        <div className="text-center text-4xl py-8">
          <div>Error Page...</div>
          {isError(error) && (
            <p className="text-slate-500">{error.statusText}</p>
          )}
        </div>
      </div>
      <Footer />
    </div>
  );
}

function isError(error: any): error is { statusText: string } {
  return "statusText" in error;
}
