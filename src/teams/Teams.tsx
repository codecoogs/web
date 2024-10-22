import { useEffect, useState } from "react";
import TeamsMembers from "./TeamsMembers";
import FadeInSection from "../common/FadeInSection";
import { aboutUsDesc, socialsDesc, teamsDesc } from "../data/about";

interface TeamSectionProps {
  id: string;
  children: React.ReactNode;
}

interface TeamSectionTitleProps {
  children: React.ReactNode;
}

const ApplyButton = () => {
  const style =
    "flex items-center p-8 h-10 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary";

  return (
    <div className="animate-fade-down animate-delay-200 relative group">
      <div className="absolute -inset-0.5 bg-dark-primary blur-lg rounded-full opacity-50 transform scale-75 group-hover:scale-100 transition-all duration-300"></div>
      <a href="#opportunitiesInfo" className={style}>
        <span className="flex items-center">
          <span>Join as team member</span>
        </span>
      </a>
    </div>
  );
};

const AboutSection = (props: TeamSectionProps) => {
  return (
    <section id={props.id} className="md:w-3/4 mx-auto">
      {props.children}
    </section>
  );
};

const AboutSectionTitle = (props: TeamSectionTitleProps) => {
  return <h1 className="text-2xl font-bold">{props.children}</h1>;
};

const BackgroundCircles = () => {
  return (
    <>
      <div
        className="absolute transform -translate-x-0 w-full h-full rounded filter blur-xl opacity-70 blob 7s infinite"
        style={{
          background:
            "linear-gradient(0deg, rgba(191, 64, 191, 0) 0%, rgba(0, 198, 247, 0.05) 50%)",
        }}
      ></div>
    </>
  );
};

const TeamsTitle = () => {
  const [index, setIndex] = useState<number>(0);
  const [fade, setFade] = useState<boolean>(true);

  return (
    <div className="flex flex-col items-center text-2xl md:text-4xl lg:text-6xl text-white font-normal text-center">
      <div className="flex animate-fade animate-once animate-duration-[1500ms]">
        <span>Work together as a team</span>
      </div>
    </div>
  );
};

const Divider = () => {
  return <hr style={{ borderTop: "1px solid lightgrey" }}></hr>;
};

const Teams = () => {
  useEffect(() => {
    document.title = "Teams";
  }, []);

  return (
    <div>
      <div className="relative flex flex-col justify-center min-h-[85vh]">
        <BackgroundCircles />
        <BackgroundCircles />
        {/* <BackgroundRoles /> */}

        <div className="my-16">
          <TeamsTitle />
        </div>

        <div className="table mx-auto">
          <ul className="flex flex-col items-center space-x-0 space-y-4 md:space-x-6 md:space-y-0 md:flex-row">
            <li>
              <ApplyButton />
            </li>
          </ul>
        </div>
      </div>

      <div className="text-white rounded md:mx-24 mb-20">
        <AboutSection id="us">
          <div className="p-6 text-center mb-10">
            <p className="text-md p-6 opacity-90">
              Code[Coogs] embraces collaboration by offering members the
              opportunity to create projects as a team of around 10 students.
              Projects use industry-standard practices, frameworks, and APIs.
              It's a journey that nurtures software development skills and the
              ability to collaborate to bring their collective visions to life.
            </p>
          </div>

          <div className="p-3 text-center">
            <AboutSectionTitle>Notable Team Projects</AboutSectionTitle>
          </div>

          <div className="grid grid-cols-1 gap-4">
            <div className="p-12 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
              <div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
                <FadeInSection
                  className={
                    "animate-fade-left animate-once animate-duration-[1700ms]"
                  }
                >
                  <h2 className="text-xl text-dark-primary">
                    UH Events (Spring 2024)
                  </h2>
                  <p className="text-md opacity-70">
                    UH Events is an app that allows students to learn about
                    upcoming events and find event locations and information
                    intuitively.
                  </p>
                </FadeInSection>
              </div>
              <div className="w-96 h-36 flex-shrink-0 border-white/[.8]">
                <FadeInSection
                  className={
                    "animate-fade-right animate-once animate-duration-[1700ms]"
                  }
                >
                  <img
                    className="w-80 h-full mx-auto md:mr-5"
                    src={"/assets/teams/projects/uhevents.jpg"}
                    alt="UH Events"
                  />
                </FadeInSection>
              </div>
            </div>

            <div className="p-12 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
              <div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
                <FadeInSection
                  className={
                    "animate-fade-left animate-once animate-duration-[1700ms]"
                  }
                >
                  <h2 className="text-xl text-dark-primary">
                    Lasso (Spring 2024)
                  </h2>
                  <p className="text-md opacity-70">
                    Lasso is an app that matches people who have an interest in
                    learning each other's languages and provides video calling
                    and chat functionality and the ability to add friends.
                  </p>
                </FadeInSection>
              </div>
              <div className="w-96 h-36 flex-shrink-0 border-white/[.8]">
                <FadeInSection
                  className={
                    "animate-fade-right animate-once animate-duration-[1700ms]"
                  }
                >
                  <img
                    className="w-80 h-full mx-auto md:mr-5"
                    src={"/assets/teams/projects/uhevents.jpg"}
                    alt="UH Events"
                  />
                </FadeInSection>
              </div>
            </div>
          </div>
        </AboutSection>
      </div>

      <TeamsMembers />
    </div>
  );
};

export default Teams;
