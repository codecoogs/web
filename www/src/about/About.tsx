import React, { useState, useEffect } from "react";

import AboutSideNav from "./AboutSideNav";

import {
    InstagramIcon,
    LinkedInIcon
} from "./AboutIcons";

import { 
    email,
    aboutUsDesc,
    socialsDesc,
    teamsDesc,
    competitionsDesc,
    workshopsDesc,
    officers,
    alumni,
    sponsors,
    partners,
    faq
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

interface AboutSectionTitleProps {
    children: React.ReactNode;
}

const AboutSectionTitle = (props: AboutSectionTitleProps) => {
    return (
        <h1 className="text-xl font-bold">
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
    company?: string;
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
        <div className="bg-dark-surface-variant rounded text-center p-8 hover:text-dark-primary">
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
            <span className="block text-sm">{props.position}</span>
            { props.company && 
                <span className="block text-sm">{props.company}</span>
            }
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
                { semester > 0 && <button onClick={handleDecrementSemester}>&lt;</button> }
                <AboutSectionTitle>Officers[<span className="text-dark-primary">{ officers[semester].semester }</span>]</AboutSectionTitle>
                { semester < numOfficers - 1 && <button onClick={handleIncrementSemester}>&gt;</button> }
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
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

interface FAQCardProps {
    key: number;
    question: string;
    answer: string;
}

const FAQCard = (props: FAQCardProps) => {
    return (
        <div className="flex flex-col bg-dark-surface-variant rounded p-8 mb-8">
            <span className="text-dark-primary">{props.question}</span>
            <span>{props.answer}</span>
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
                    <AboutSectionTitle>About Us</AboutSectionTitle>
                    <p className="text-sm p-8">{aboutUsDesc}</p>
                    <span>Contact: <span className="text-dark-primary">{email}</span></span>
                </div>
                <div className="p-8">
                    <h2 className="text-lg text-dark-primary">Socials</h2>
                    <p className="text-sm">{socialsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg text-dark-primary">Teams</h2>
                    <p className="text-sm">{teamsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg text-dark-primary">Competitions</h2>
                    <p className="text-sm">{competitionsDesc}</p>
                </div>
                <div className="p-8">
                    <h2 className="text-lg text-dark-primary">Workshops</h2>
                    <p className="text-sm">{workshopsDesc}</p>
                </div>
            </AboutSection>

            <AboutSection id="officers">
                <OfficerSection />
            </AboutSection>

            <AboutSection id="alumni">
                <div className="p-8 text-center">
                    <AboutSectionTitle>Alumni</AboutSectionTitle>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-8">
                        { alumni.map((officer, index) => {
                                return <OfficerCard 
                                    key={index} 
                                    name={officer.name} 
                                    position={officer.position} 
                                    company={officer.company}
                                    photo={officer.photo}
                                    socials={officer.socials}
                                />;
                          })
                        }
                    </div>
                </div>
            </AboutSection>

            <AboutSection id="sponsors">
                <div className="p-8 text-center">
                    <AboutSectionTitle>Sponsors</AboutSectionTitle>
                    <div className="grid grid-cols-2 pt-8">
                        { sponsors.map((sponsor, index) => {
                                return (
                                    <div key={index} className="mx-auto">
                                        <a href={sponsor.link} target="_blank">
                                        <img    
                                            className={sponsor.name == "HCSS" ? "" : "rounded-full"} 
                                            src={sponsor.logo} 
                                            alt={sponsor.name}
                                            width="200" 
                                            height="200" 
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
                    <AboutSectionTitle>Partners</AboutSectionTitle>
                    <div className="grid grid-cols-1 pt-8">
                        { partners.map((partner, index) => {
                                return (
                                    <div key={index} className="mx-auto">
                                        <a href={partner.link} target="_blank">
                                            <img    
                                                className="rounded-full"
                                                src={partner.logo} 
                                                alt={partner.name}
                                                width="200" 
                                                height="200" 
                                            />
                                        </a>
                                    </div>
                                );
                          })
                        }
                    </div>
                </div>
            </AboutSection>
            <AboutSection id="faq">
                <div className="p-8 text-center">
                    <AboutSectionTitle>FAQ</AboutSectionTitle>
                </div>
                <div className="px-8 pb-4">
                    <div className="pl-4">
                        { faq.map((response, index) => {
                                return <FAQCard
                                    key={index}
                                    question={response.question}
                                    answer={response.answer}
                                />;
                          })
                        }
                    </div>
                </div>
            </AboutSection>
        </div>
    );
};

export default About;
