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

// TODO: add moving section of where we have worked at
// TODO: add moving section of partners and sponsors

interface AboutSectionProps {
    id: string;
    children: React.ReactNode;
}

const AboutSection = (props: AboutSectionProps) => {
    return (
        <section id={props.id} className="h-full rounded">
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

const OfficerCard = (props: OfficerCardProps) => {
    const {
        instagram,
        linkedin
    } = props.socials;

    return (
        <div className="bg-dark-surface-variant rounded-xl text-center p-8 hover:ring-dark-primary ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300">
            <div className="inline-block w-40 h-40">
                <img
                    className="relative object-cover w-full h-full rounded-full hover:object-top"
                    src={props.photo}
                    alt={props.name}
                    onMouseOver={e => (e.currentTarget.src = props.video ? props.video : props.photo)}
                    onMouseOut={e => (e.currentTarget.src = props.photo)}
                />
            </div>
            <span className="block font-bold pt-4">{props.name}</span>
            <span className="block text-sm opacity-50">{props.position}</span>
            <div className="table mx-auto pt-4">
                <div className="flex flex-row space-x-2">
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
        <div className="p-8 text-center">
            <div className="flex justify-center items-center space-x-4">
                { semester > 0 && <button className="text-3xl hover:text-dark-primary" onClick={handleDecrementSemester}>&#129190;</button> }
                <AboutSectionTitle>Officers[<span className="text-dark-primary">{ officers[semester].semester }</span>]</AboutSectionTitle>
                { semester < numOfficers - 1 && <button className="text-3xl hover:text-dark-primary" onClick={handleIncrementSemester}>&#129191;</button> }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4 p-8">
                { officers[semester].list.map((officer, index) => {
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
                        <Component />
                    </div>
                ))}
            </div>
        </div>
    );
}

const About = () => {
    return (
        <div className="text-white p-4">
            <AboutSection id="sponsors">
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
                                            width="100"
                                            height="100"
                                        />
                                    </a>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </AboutSection>
            <AboutSection id="partners">
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
                                            width="100"
                                            height="100"
                                        />
                                    </a>
                                </div>
                            );
                        })
                        }
                    </div>
                </div>
            </AboutSection>
            <CompanySection />
            <div className="rounded md:m-24">
                <AboutSection id="us">
                    <div className="p-6 text-center">
                        <AboutSectionTitle>About Us</AboutSectionTitle>
                        <p className="text-sm p-6">{aboutUsDesc}</p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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

            <AboutSection id="officers">
                <OfficerSection/>
            </AboutSection>
        </div>
    );
};

export default About;
