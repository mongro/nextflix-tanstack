import tmdbLogo from "@/public/tmdb.svg";

export function Footer() {
  return (
    <div className="bg-blue-900 p-2 lg:p-6 mt-8 w-full">
      <div className="flex justify-center gap-4 items-center">
        {" "}
        <p>
          This webite uses the{" "}
          <a href="https://www.themoviedb.org" className="underline">
            TMDB API
          </a>{" "}
          but is not endorsed or certified by TMDB.
        </p>
        <a href="https://www.themoviedb.org">
          <img src={tmdbLogo} alt="The Movie Database Logo" />
        </a>
      </div>
    </div>
  );
}
