import React, { useState } from "react";

import {
    InstagramIcon,
    LinkedInIcon
} from "./AboutIcons";
import {
    companyLogos
} from "./AboutLogos";

import {
    aboutUsDesc,
    socialsDesc,
    teamsDesc,
    competitionsDesc,
    workshopsDesc,
    officers,
    sponsors,
    partners,
} from "../data/about";

interface AboutSectionProps {
    id: string;
    children: React.ReactNode;
}

const AboutSection = (props: AboutSectionProps) => {
    return (
        <section id={props.id} className="md:w-3/4 mx-auto">
            {props.children}
        </section>
    );
};

interface AboutSectionTitleProps {
    children: React.ReactNode;
}

const AboutSectionTitle = (props: AboutSectionTitleProps) => {
    return (
        <h1 className="text-2xl font-bold">
            {props.children}
        </h1>
    );
};

interface SocialsObj {
    instagram?: string;
    linkedin: string;
}

interface OfficerCardProps {
    key: number;
    name: string;
    position: string;
    photo: string;
    video?: string;
    socials: SocialsObj;
}

// TODO: fix video hover
const OfficerCard = (props: OfficerCardProps) => {
    const {
        instagram,
        linkedin
    } = props.socials;

    return (
        <div className="flex flex-col bg-dark-surface-variant rounded-xl text-center p-4 hover:ring-dark-primary ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300">
            <div className="flex-grow">
                <div className="w-24 h-24 md:w-32 md:h-32 mx-auto">
                    <img
                        className="w-full h-full relative object-cover rounded-full hover:object-top"
                        src={props.photo}
                        alt={props.name}
                        // onMouseOver={e => (e.currentTarget.src = props.video ? props.video : props.photo)}
                        onMouseOut={e => (e.currentTarget.src = props.photo)}
                    />
                </div>
                <span className="block text-sm font-bold pt-4">{props.name}</span>
                <span className="block text-sm opacity-50">{props.position}</span>
            </div>
            <div className="pt-4">
                <div className="flex space-x-2 justify-end">
                    { instagram &&
                        <a href={instagram} target="_blank" aria-label="Go to our Instagram">
                            <InstagramIcon/>
                        </a>
                    }
                    { linkedin &&
                        <a href={linkedin} target="_blank" aria-label="Go to our LinkedIn">
                            <LinkedInIcon/>
                        </a>
                    }
                </div>
            </div>
        </div>
    );
};

// TODO: smooth the semester change transition
const OfficerSection = () => {
    const numOfficers = officers.length;
    const [semester, setSemester] = useState(numOfficers - 1);

    const handleDecrementSemester = () => {
        setSemester(prevSemester => Math.max(0, prevSemester - 1));
    };

    const handleIncrementSemester = () => {
        setSemester(prevSemester => Math.min(numOfficers - 1, prevSemester + 1));
    };

    return (
        <div className="px-2  text-center mx-auto md:w-3/4">
            <AboutSectionTitle>Meet the people behind the scenes</AboutSectionTitle>
            <div className="flex text-lg justify-center items-center space-x-4 my-8">
                <div className="flex-1 relative">
                    <div className="relative flex justify-end">
                        <span
                            className={`absolute transition-transform duration-300 opacity-30 cursor-pointer translate-x-0 -translate-y-6`}
                            onClick={handleDecrementSemester}
                        >
                            {semester - 1 >= 0 && officers[semester - 1].semester}
                        </span>
                        <span
                            className={`text-dark-primary opacity-100 z-10`}
                        >
                                {officers[semester].semester}
                        </span>
                        <span
                            className={`absolute transition-transform duration-300 opacity-30 cursor-pointer translate-y-6`}
                            onClick={handleIncrementSemester}
                        >
                                {semester + 1 < numOfficers && officers[semester + 1].semester}
                        </span>
                    </div>
                </div>
                <span className="flex-1 text-left relative z-10 ml-4">Officers</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 px-0 md:px-8">
                {officers[semester].list.map((officer, index) => {
                    return <OfficerCard
                        key={index}
                        name={officer.name}
                        position={officer.position}
                        photo={officer.photo}
                        video={officer.video}
                        socials={officer.socials}
                    />;
                })
                }
            </div>
        </div>
    );
};

const CompanySection = () => {
    return (
        <div className="text-center">
            <AboutSectionTitle>Where our alumni have worked at</AboutSectionTitle>
            <div className="flex flex-wrap justify-center items-center">
                {companyLogos.map(({name, component: Component}) => (
                    <div key={name} className="p-4">
                        <Component/>
                    </div>
                ))}
            </div>
        </div>
    );
}

const About = () => {
    return (
        <div className="text-white p-4">
            <div className="flex flex-wrap justify-center">
                <div className="p-8 text-center">
                    <AboutSectionTitle>Our sponsors</AboutSectionTitle>
                    <div className="flex flex-wrap justify-center items-center pt-8">
                        { sponsors.map((sponsor, index) => {
                            return (
                                <div key={index} className="p-4">
                                    <a href={sponsor.link} target="_blank">
                                        <img
                                            className={sponsor.name == "HCSS" ? "" : "rounded-full"}
                                            src={sponsor.logo}
                                            alt={sponsor.name}
                                            width="50"
                                            height="50"
                                        />
                                    </a>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
                <div className="p-8 text-center">
                    <AboutSectionTitle>Our partners</AboutSectionTitle>
                    <div className="flex flex-wrap justify-center items-center pt-8">
                        { partners.map((partner, index) => {
                            return (
                                <div key={index} className="p-4">
                                    <a href={partner.link} target="_blank">
                                        <img
                                            className=""
                                            src={partner.logo}
                                            alt={partner.name}
                                            width="50"
                                            height="50"
                                        />
                                    </a>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </div>
            <CompanySection />
            <div className="rounded md:mx-24 my-8">
                <AboutSection id="us">
                    <div className="p-6 text-center">
                        <AboutSectionTitle>About Us</AboutSectionTitle>
                        <p className="text-sm p-6">{aboutUsDesc}</p>
                    </div>
                    {/** TODO: add Icons for each section **/}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="p-8 rounded-lg ring-1 ring-inset ring-white/[.3]">
                            <h2 className="text-lg text-dark-primary">Socials</h2>
                            <p className="text-sm">{socialsDesc}</p>
                        </div>
                        <div className="p-8 rounded-lg ring-1 ring-inset ring-white/[.3]">
                            <h2 className="text-lg text-dark-primary">Teams</h2>
                            <p className="text-sm">{teamsDesc}</p>
                        </div>
                        <div className="p-8 rounded-lg ring-1 ring-inset ring-white/[.3]">
                            <h2 className="text-lg text-dark-primary">Competitions</h2>
                            <p className="text-sm">{competitionsDesc}</p>
                        </div>
                        <div className="p-8 rounded-lg ring-1 ring-inset ring-white/[.3]">
                            <h2 className="text-lg text-dark-primary">Workshops</h2>
                            <p className="text-sm">{workshopsDesc}</p>
                        </div>
                    </div>
                </AboutSection>
            </div>

            <OfficerSection/>
        </div>
    );
};

export default About;
