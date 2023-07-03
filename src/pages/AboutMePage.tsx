import profilePicture from "../Profile.jpeg";
export default function AboutMePage() {
  return (
    <div className="AboutMeParent">
      <h2>Hi visitor :)</h2>
      <img
        className="profilePicture"
        src={profilePicture}
        alt="Andrea Sansone, the author of this website"
      />
      <p>
        I am Andrea Sansone, I am 34, live in Oslo and, up until December 2022,
        i was a biologist.
      </p>
      <p>
        I lived and worked in Italy, UK, Switzerland and now Norway, i have a
        Master Degree in Biological Sciences, i also started two PhDs while
        living in Switzerland.
      </p>
      <p>
        There i met my, now, wife who showed me how beautiful the life in Norway
        (and in general) can be.
      </p>
      <p>
        After thinking about it for a while, i decided to change my career from
        biologist to (front-end) programmer.
      </p>
      <p>
        I hope you find this little website useful and do not hesitate to
        <a
          href="mailto:andrea@sansone.no"
          className="contactMe"
          title="send me an email"
        >
          contact me
        </a>{" "}
        or go to my{" "}
        <a
          href="https://github.com/Xaxnxdxrxexax"
          className="contactMe"
          title="go to my github"
        >
          GitHub
        </a>
        for any questions.
      </p>
      <div className="rightSide">
        <p>Sincerely</p>
        <p>Andrea.</p>
      </div>
    </div>
  );
}
