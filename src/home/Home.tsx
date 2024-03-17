import React, { useEffect } from "react";
import { Link } from "react-router-dom";

import banner from "../assets/banner.webp";

interface HomeButtonProps {
    link: string;
    external?: boolean;
    children: string;
};

const HomeButton = (props: HomeButtonProps) => {
    const style = "w-40 h-10 mx-auto text-center rounded-xl leading-10 bg-dark text-white ring-1 ring-inset ring-white/[.3]";

    return props.external ? (
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
    );
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
                        <HomeButton link="/about">About Us</HomeButton>
                    </li>
                    <li>
                        <HomeButton link="/members">Membership</HomeButton>
                    </li>
                    <li>
                        <HomeButton link="https://linktr.ee/codecoogs" external>LinkTree</HomeButton>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default Home;
