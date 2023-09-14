import React, { useEffect } from "react";

import MembershipForm from "./MembershipForm";
import MemberBanner from "../assets/banner2.png";
import computerCoCo from "../assets/computer-coco.png";

import { 
    benefits, 
    discordLink,
    signupLink
} from "../data/members";

interface MembersButtonProps {
    link: string;
    children: string;
};

const MembersButton = (props: MembersButtonProps) => {
    return (
        <a
            className="font-semibold"
            target="_blank"
            href={props.link}
        >
            <div className="bg-dark-primary w-40 h-10 text-center rounded leading-10">
                {props.children}
            </div>
        </a>
    );
};

const Members = () => {
    useEffect(() => {
        document.title = "Members";
    });

    return (
        <div className="bg-dark-surface text-white">
            <div className="bg-dark-surface-variant rounded md:m-8">
                <h1 className="p-8 font-bold text-xl text-center">Membership</h1>
                <div className="flex flex-col md:flex-row">
                    <div className="mx-auto">
                        <h2 className="font-bold text-lg text-center">Benefits</h2>
                        <ul className="align-middle pb-8 text-center">
                            { benefits.map((benefit, index) => {
                                    return (
                                        <li key={index}> 
                                            <span>
                                                <span className="text-dark-primary">
                                                    {`${index+1}.`}  
                                                </span>
                                                {` ${benefit}`}
                                            </span>
                                        </li>
                                    );
                              }) 
                            }
                        </ul>
                        <div>
                            <h1 className="font-bold text-lg text-center" style={{color:'red'}}>Read before signing up:</h1>
                            <ul className="align-middle pb-8 text-center">
                                <li><span className="text-dark-primary">1.</span> All announcements are posted here: <a target="blank" href={discordLink}><u>discord server</u></a></li>
                                <li><span className="text-dark-primary">2.</span> Membership is $25 per year or $15 per semester and can be paid with:</li>
                                <li>Cash: at any event</li>
                                <li>Venmo: @Code-Coogs</li>
                                <li>Zelle: 8186579832</li>
                                <li><span className="text-dark-primary">3.</span> When paying online, include full name</li>
                            </ul>
                        </div>
                    </div>
                    <div className="mx-auto">
                        <img
                            src={computerCoCo}
                            alt="Computer CoCo"
                            width="300"
                            height="300"
                        />
                    </div>
                </div>
                <MembershipForm />
                {/*<div className="table text-black my-0 mx-auto">
                    <MembersButton link={signupLink}>Sign Up</MembersButton>
                </div>*/}
                <div className="table my-0 mx-auto">
                    <img    
                        src={MemberBanner}
                        alt="Member Banner"
                        width="800"
                        height="240"
                    />
                </div>
            </div>
        </div>
    );
};

export default Members;
