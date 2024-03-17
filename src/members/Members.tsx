import React, { useEffect } from "react";

import MembershipForm from "./MembershipForm";

import { 
    benefits, 
    discordLink,
} from "../data/members";

interface MemberBenefitCardProps {
    benefit: string;
    index: number;
}

const MemberBenefitCard = (props: MemberBenefitCardProps) => {
    const { benefit, index } = props;

    return (
        <li key={index}>
            <div className="bg-dark-surface-variant h-full rounded-lg text-center p-2 ring-1 ring-inset ring-white/[.3]">
                {`${benefit}`}
            </div>
        </li>
    );
};

const Members = () => {
    useEffect(() => {
        document.title = "Members";
    });

    return (
        <div className="bg-dark-surface text-white">
            <div className="bg-dark-surface rounded m-4 md:m-8">
                <div className="flex flex-col md:flex-row md:gap-4">
                    <div className="flex-1 basis-1/2">
                        <div>
                            <h1 className="font-bold text-lg text-center">Pricing</h1>
                            <ul className="align-middle pb-8">
                                <li><span className="text-dark-primary">1.</span> Stay up to date by joining our <a
                                    className="text-dark-primary" target="blank" href={discordLink}><u>discord</u></a>
                                </li>
                                <li><span className="text-dark-primary">2.</span> Membership is $25 per year or $15 per
                                    semester and can be paid with:
                                </li>
                                <li><span className="underline">Cash:</span> at any event</li>
                                <li><span className="underline">Venmo:</span> @Code-Coogs</li>
                                <li><span className="underline">Zelle:</span> 832-535-7320</li>
                                <li><span className="text-dark-primary">3.</span> When paying online, include full name
                                </li>
                            </ul>
                        </div>
                        <h2 className="mt-4 font-bold text-lg text-center">Benefits</h2>
                        <ul className="grid grid-cols-2 gap-4">
                            {benefits.map((benefit, index) => {
                                return <MemberBenefitCard benefit={benefit} index={index}/>;
                            })}
                        </ul>
                    </div>
                    <div className="flex-1 basis-1/2">
                        <MembershipForm/>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Members;
