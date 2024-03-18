import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import banner from "../assets/banner.webp";

interface HomeButtonProps {
    link: string;
    external?: boolean;
    children: React.ReactNode;
};

const HomeButton = (props: HomeButtonProps) => {
    const style = "flex items-center p-6 h-10 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary";

    return (
        <div className="relative group">
            <div
                className="absolute -inset-0.5 bg-dark-primary blur-lg rounded-full opacity-50 transform scale-75 group-hover:scale-100 transition-all duration-300"
            ></div>
            {props.external ? (
                <a href={props.link} target="_blank">
                    <div className={style}>
                        {props.children}
                    </div>
                </a>
            ) : (
                <Link to={props.link}>
                    <div className={style}>
                        {props.children}
                    </div>
                </Link>
            )}
        </div>);
};

const Home = () => {

    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <div className="bg-dark-surface h-full pb-8">
        <div className="pt-16">
                <img className="my-0 mx-auto" src={banner} alt="Banner" width="800" height="240"/>
            </div>
            <div className="my-16 text-center">
                <span className="text-2xl text-white">Socials | Teams | Competitions | Workshops</span>
            </div>
            <div className="table my-0 mx-auto">
                <ul className="flex flex-col items-center space-x-0 space-y-4 md:space-x-24 md:space-y-0 md:flex-row">
                    <li>
                        <HomeButton link="/about">
                            <span className="flex items-center">
                                <span>About Us</span>
                            </span>
                        </HomeButton>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
