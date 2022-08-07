import React, { useEffect } from "react";

import AboutSideNav from "./AboutSideNav";

const aboutUsDesc = "Founded in September 2021, we are student-led computer science organization at the University of Houston. We focus on socials, teams, competitions, and workshops. We hope to foster an environment to develop exciting projects, refine technical skills, and gain new friends.";
const socialsDesc = "The socials are a time for members to kick back and relax. Whether it is a sports day at a park or a virtual movie night, our socials are sure to enable our members to get closer to one another to promote the community aspect within our members. Show up to our in-person socials for a good time!";
const teamsDesc = "Being part of a team in Code Coogs gives members the opportunity to hone their coding skills while making worthwhile friends. Members will work with a diverse group of fellow programmers, and people from all coding and cultural backgrounds. Members will get to experience a collective effort from their own team in producing a hefty end of year project showcased at our banquet";
const competitionsDesc = "Every two weeks we will hold a competition that will put your skills to the test. Each competition will push you to become a better programmer. The skills you gain from solving these problems will show when you do technical interviews!";
const workshopsDesc = "Workshops are where our members will develop their programming skills and gain a sense of collaboration with their peers, and gain confidence in their problem-solving skills. Workshops will go over challenging problems that utilize a variety of programming concepts, and students will learn the patterns and techniques used to tackle these problems. It is encouraged to collaborate and bounce ideas off of one another to understand different angles of solving these problems!";

interface AboutSectionProps {
    id: string;
    children: React.ReactNode;
}

const AboutSection = (props: AboutSectionProps) => {
    return (
        <section id={props.id} className="h-full m-8 bg-dark-surface-variant rounded">
            {props.children}
        </section>
    );
};

const About = () => {

    useEffect(() => {
        document.title = "About";
    }, []);

    return (
        <div className="bg-dark-surface text-white">
            <AboutSideNav/>
            <AboutSection id="us">
                <div className="p-8">
                    <h1 className="text-xl">About Us</h1>
                    <p className="text-sm">{aboutUsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg">Socials</h2>
                    <p className="text-sm">{socialsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg">Teams</h2>
                    <p className="text-sm">{teamsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg">Competitions</h2>
                    <p className="text-sm">{competitionsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg">Workshops</h2>
                    <p className="text-sm">{workshopsDesc}</p>
                </div>
            </AboutSection>

            <AboutSection id="officers">
                <div className="p-8">
                    <h1 className="text-xl">Officers</h1>
                    <p>TBA</p>
                </div>
            </AboutSection>
            <AboutSection id="sponsors">
                <div className="p-8">
                    <h1 className="text-xl">Sponsors</h1>
                    <p>TBA</p>
                </div>
            </AboutSection>
            <AboutSection id="partners">
                <div className="p-8">
                    <h1 className="text-xl">Partners</h1>
                    <p>TBA</p>
                </div>
            </AboutSection>
            <AboutSection id="faq">
                <div className="p-8">
                    <h1 className="text-xl">FAQ</h1>
                    <p>TBA</p>
                </div>
            </AboutSection>
        </div>
    );
};

export default About;
