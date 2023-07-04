import profilePicture from "../Profile.jpeg";
import poster_not_found from "../poster-not-found-background.jpeg";
export default function AboutMePage() {
  const linkStyle = "text-gray-300 px-1 hover:text-amber-700 italic";
  return (
    <div className="p-0 text-white overflow-clip relative">
      <img
        src={poster_not_found}
        alt="background"
        className="object-cover brightness-[0.9] blur-sm absolute -z-10  overflow-hidden w-full h-full scale-110"
      />
      <div className="p-5 sm:grid sm:grid-cols-[1fr,3fr]">
        <img
          className="mx-auto rounded-full w-52 border-2 border-solid border-white"
          src={profilePicture}
          alt="Andrea Sansone, the author of this website"
        />
        <div className="pl-4">
          <p className="py-1">
            I am Andrea Sansone, I am 34, live in Oslo and, up until December
            2022, i was a biologist.
          </p>
          <p className="py-1">
            I lived and worked in Italy, UK, Switzerland and now Norway, i have
            a Master Degree in Biological Sciences, i also started two PhDs
            while living in Switzerland.
          </p>
          <p className="py-1">
            There i met my, now, wife who showed me how beautiful the life in
            Norway (and in general) can be.
          </p>
          <p className="py-1">
            After thinking about it for a while, i decided to change my career
            from biologist to (front-end) programmer.
          </p>
          <p className="py-1">
            I hope you find this little website useful and do not hesitate to
            <a
              href="mailto:andrea@sansone.no"
              className={linkStyle}
              title="send me an email"
            >
              contact me
            </a>{" "}
            or go to my{" "}
            <a
              href="https://github.com/Xaxnxdxrxexax"
              className={linkStyle}
              title="go to my github"
            >
              GitHub
            </a>
            for any questions.
          </p>
          <div className="text-right pr-4">
            <p>Sincerely</p>
            <p>Andrea</p>
          </div>
        </div>
      </div>
    </div>
  );
}
