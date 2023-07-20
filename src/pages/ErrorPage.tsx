import Footer from "../components/Footer";
import Header from "../components/Header";
import { useRouteError } from "react-router-dom";

export default function ErrorPage() {
  const error = useRouteError();
  return (
    <div>
      <Header />
      <div className="text-center text-4xl">
        <div>Error Page...</div>
        {isError(error) && <p className="text-slate-500">{error.statusText}</p>}
      </div>
      <Footer />
    </div>
  );
}

function isError(error: any): error is { statusText: string } {
  return "statusText" in error;
}
