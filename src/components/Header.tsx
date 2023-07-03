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
      <nav className="flex flex-col gap-5 items-center text-white bg-black p-5 sm:flex-row sm:justify-between">
        <Link to="/" className="font-bold text-2xl">
          Is this movie controversial
        </Link>
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
            `no-underline p-1 pb-0.5 border-solid border-b-2 self-end ${
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
