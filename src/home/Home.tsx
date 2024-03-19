import React, {useEffect, useState} from "react";

import About from "./About";
import Teams from "./Teams";

interface HomeButtonProps {
    link: string;
    children: React.ReactNode;
}

const HomeButton = (props: HomeButtonProps) => {
    const style = "flex items-center p-6 h-10 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary";

    return (
        <div className="relative group">
            <div
                className="absolute -inset-0.5 bg-dark-primary blur-lg rounded-full opacity-50 transform scale-75 group-hover:scale-100 transition-all duration-300"
            ></div>
            <a href={props.link} className={style}>
                {props.children}
            </a>
        </div>);
};

const BackgroundCircles = () => {
    return (
        <>
            <div
                className="absolute transform -translate-x-0 w-full h-full rounded filter blur-xl opacity-70 blob 7s infinite"
                style={{
                    background: 'radial-gradient(circle, rgba(191, 64, 191, 0) 0%, rgba(0, 198, 247, 0.1) 100%)'
                }}>
            </div>
        </>
    );
}

const HomeTitle = () => {
    const phrases = ['Capability', 'Creativity', 'Cooperation'];
    const [index, setIndex] = useState<number>(0);
    const [fade, setFade] = useState<boolean>(true);

    useEffect(() => {
        const interval = setInterval(() => {
            setFade(false);
            setTimeout(() => {
                setIndex((currentIndex) => (currentIndex + 1) % phrases.length);
                setFade(true);
            }, 500);
        }, 3000);

        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex flex-col text-2xl md:text-4xl lg:text-6xl text-white font-normal text-center">
            <div className="flex">
                <span className="flex-1 text-right">We Foster&nbsp;</span>
                <span className={`flex-1 text-left text-dark-primary transition-opacity duration-500 inline-block ${fade ? 'opacity-100' : 'opacity-0'}`}>
                    {phrases[index]}
                </span>
            </div>
            <div>
                <span> at Code[<span className="text-dark-error">Coogs</span>]</span>
            </div>
        </div>
    );
};

const Home = () => {

    useEffect(() => {
        document.title = "Home";
    }, []);

    return (
        <div>
            <div className="relative flex flex-col justify-center min-h-screen">
                <BackgroundCircles />
                <BackgroundCircles />
                <div className="my-4">
                    <HomeTitle/>
                </div>
                <div className="my-4 mx-auto md:w-1/2 text-center">
                    <span className="text-base text-white">Build projects and compete with teams; we enhance your coding skills in a collaborative environment, unlocking the potential for community and technical growth.</span>
                </div>
                <div className="table mt-8 mx-auto">
                    <ul className="flex flex-col items-center space-x-0 space-y-4 md:space-x-24 md:space-y-0 md:flex-row">
                        <li>
                            <HomeButton link="#us">
                                <span className="flex items-center">
                                    <span>About Us</span>
                                </span>
                            </HomeButton>
                        </li>
                    </ul>
                </div>
            </div>
            <About/>
            <Teams/>
        </div>
    );
};

export default Home;
