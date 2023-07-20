import { Outlet } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { inject } from "@vercel/analytics";

inject();
export default function App() {
  return (
    <div className="max-w-7xl mx-auto">
      <Header />
      <Outlet />
      <Footer />
    </div>
  );
}
