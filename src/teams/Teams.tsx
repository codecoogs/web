import { useEffect, useState } from "react";
import TeamsMembers from "./TeamsMembers";
import FadeInSection from "../common/FadeInSection";
import { aboutUsDesc, socialsDesc, teamsDesc } from "../data/about";

interface AboutSectionProps {
    id: string;
    children: React.ReactNode;
}

interface AboutSectionTitleProps {
    children: React.ReactNode;
}

const AboutSection = (props: AboutSectionProps) => {
    return (
        <section id={props.id} className="md:w-3/4 mx-auto">
            {props.children}
        </section>
    );
};

const AboutSectionTitle = (props: AboutSectionTitleProps) => {
    return <h1 className="text-2xl font-bold">{props.children}</h1>;
};

const BackgroundCircles = () => {
    return (
        <>
            <div
                className="absolute transform -translate-x-0 w-full h-full rounded filter blur-xl opacity-70 blob 7s infinite"
                style={{
                    background: 'linear-gradient(0deg, rgba(191, 64, 191, 0) 0%, rgba(0, 198, 247, 0.05) 50%)'
                }}>
            </div>
        </>
    );
}

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
    return (
        <hr
            style={{ borderTop: "1px solid lightgrey" }}
        ></hr>
    );
};


const Teams = () => {

    useEffect(() => {
        document.title = "Teams";
    }, []);

    return (
        <div>
            <div className="relative flex flex-col justify-center min-h-[80vh]">
                <BackgroundCircles />
                <BackgroundCircles />
                {/* <BackgroundRoles /> */}

                <div className="my-36">
                    <TeamsTitle />
                </div>
            </div>

            <div className="text-white rounded md:mx-24">
                <AboutSection id="us">
                    <div className="p-6 text-center mb-6">
                        <p className="text-lg p-6 opacity-90">Code[Coogs] embraces collaboration by offering members the opportunity to create projects as a team of around 10 students. Projects use industry-standard practices, frameworks, and APIs. It's a journey that nurtures software development skills and the ability to collaborate to bring their collective visions to life.</p>

                    </div>

                    <div className="p-3 text-center">
                        <AboutSectionTitle>Notable Team Projects</AboutSectionTitle>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-12 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
                            <div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
                                <FadeInSection className={"animate-fade-left animate-once animate-duration-[1700ms]"}>
                                    <h2 className="text-xl text-dark-primary">UH Events (Spring 2024)</h2>
                                    <p className="text-md opacity-70">UH Events is an app that allows students to learn about upcoming events and find event locations and information intuitively.</p>
                                </FadeInSection>
                            </div>
                            <div className="w-96 h-36 flex-shrink-0 border-white/[.8]">
                                <FadeInSection className={"animate-fade-right animate-once animate-duration-[1700ms]"}>
                                    <img
                                        className="w-80 h-full mx-auto md:mr-5"
                                        src={"https://media.licdn.com/dms/image/v2/D5622AQHyCN2fav6Mhg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1715455468631?e=1732147200&v=beta&t=JIkEn_-IzzvCP2c7IJ8mMRgMyDXB9KcJBtTNpVWcGrA"}
                                        alt="UH Events"
                                    />
                                </FadeInSection>
                            </div>
                        </div>

                        <div className="p-12 rounded-lg ring-0 ring-inset ring-white/[.3] flex flex-col md:flex-row items-center">
                            <div className="flex-1 ml-4 pt-2 border-t-2 md:pt-0 md:border-t-0">
                                <FadeInSection className={"animate-fade-left animate-once animate-duration-[1700ms]"}>
                                    <h2 className="text-xl text-dark-primary">Lasso (Spring 2024)</h2>
                                    <p className="text-md opacity-70">Lasso is an app that matches people who have an interest in learning each other's languages and provides video calling and chat functionality and the ability to add friends.</p>
                                </FadeInSection>
                            </div>
                            <div className="w-96 h-36 flex-shrink-0 border-white/[.8]">
                                <FadeInSection className={"animate-fade-right animate-once animate-duration-[1700ms]"}>
                                    <img
                                        className="w-80 h-full mx-auto md:mr-5"
                                        src={"https://media.licdn.com/dms/image/v2/D5622AQHyCN2fav6Mhg/feedshare-shrink_2048_1536/feedshare-shrink_2048_1536/0/1715455468631?e=1732147200&v=beta&t=JIkEn_-IzzvCP2c7IJ8mMRgMyDXB9KcJBtTNpVWcGrA"}
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