import { NavLink, Link, useSearchParams, useNavigate } from "react-router-dom";
import { FormEvent } from "react";

export default function Header() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  function handleSearchSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const search = formData.get("search") as string;
    navigate(`${search}`);
  }
  return (
    <>
      <Link to="/">Is this movie controversial?</Link>
      <nav className="flex justify-between text-white bg-black p-5">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="search"
            placeholder="Search..."
            defaultValue={searchParams.get("search") ?? ""}
            className="rounded py-2 px-3 text-gray-700"
          />
        </form>
        <NavLink
          to="about-me"
          className={({ isActive }) =>
            `no-underline p-1 pb-0.5 border-solid border-b-2 ${
              isActive ? "border-white" : "border-transparent"
            }`
          }
        >
          About me
        </NavLink>
      </nav>
    </>
  );
}
