import React, { useEffect } from "react";

import AboutSideNav from "./AboutSideNav";

import { 
    aboutUsDesc,
    socialsDesc,
    teamsDesc,
    competitionsDesc,
    workshopsDesc,
    officers 
} from "../data/about";

interface AboutSectionProps {
    id: string;
    children: React.ReactNode;
}

const AboutSection = (props: AboutSectionProps) => {
    return (
        <section id={props.id} className="h-full m-8 rounded">
            {props.children}
        </section>
    );
};

interface OfficerCardProps {
    key: number
    avatarURL: string;
    name: string;
    position: string;
}

const OfficerCard = (props: OfficerCardProps) => {
    return (
        <div className="bg-dark-surface-variant rounded text-center p-8 hover:text-dark-primary">
            <img 
                className="mx-auto rounded-full"
                src={props.avatarURL}
                width="100" 
                height="100" 
            />
            <span className="block font-bold pt-8">{props.name}</span>
            <span className="block text-sm">{props.position}</span>
        </div>
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
                <div className="p-8 text-center">
                    <h1 className="text-xl font-bold">About Us</h1>
                    <p className="text-sm p-8">{aboutUsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg underline">Socials</h2>
                    <p className="text-sm">{socialsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg underline">Teams</h2>
                    <p className="text-sm">{teamsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg underline">Competitions</h2>
                    <p className="text-sm">{competitionsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg underline">Workshops</h2>
                    <p className="text-sm">{workshopsDesc}</p>
                </div>
            </AboutSection>

            <AboutSection id="officers">
                <div className="p-8 text-center">
                    <h1 className="text-xl font-bold">Officers</h1>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-8">
                        { officers.map((officer, index) => {
                                return <OfficerCard 
                                    key={index} 
                                    avatarURL={officer.avatarURL}
                                    name={officer.name} 
                                    position={officer.position} 
                                />;
                          })
                        }
                    </div>
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
