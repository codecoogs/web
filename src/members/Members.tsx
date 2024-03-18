import React, {useEffect, useState} from "react";

import MembershipForm from "./MembershipForm";

import { 
    benefits, 
    faq
} from "../data/members";
import {CheckIcon} from "./MembersIcons";

interface MemberBenefitCardProps {
    benefit: string;
    index: number;
}

const MemberBenefitCard = (props: MemberBenefitCardProps) => {
    const { benefit, index } = props;

    return (
        <li key={`member-benefit-${index}`}>
            <div
                className="flex justify-between items-center bg-dark-surface-variant h-full rounded-lg text-center p-2 hover:ring-dark-primary transform transition-all hover:-translate-y-2 duration-300">
                <div className="flex-1 basis-1/4 pt-3">
                    <CheckIcon/>
                </div>
                <div className="flex-1 basis-3/4 opacity-50 text-right">
                    {`${benefit}`}
                </div>
            </div>
        </li>
    );
};

const PricingCard = () => {
    const [isYearly, setIsYearly] = useState<boolean>(true);

    const togglePricing = () => setIsYearly(!isYearly);

    return (
        <div className="bg-dark-surface-variant h-full rounded-lg p-2 ring-1 ring-inset ring-white/[.3]">
            <div className="bg-dark-surface-variant p-4 rounded">
                <div className="text-2xl">
                    <span className="text-3xl text-dark-primary">{isYearly ? "$25" : "$15"}</span>
                    <span> per </span>
                    <div className="inline-block relative cursor-pointer h-8" onClick={togglePricing}>
                        <span
                            className={`absolute transition-all duration-300 ${isYearly ? 'top-2 opacity-100' : '-top-4 opacity-20'}`}
                        >
                            year
                        </span>
                        <span
                            className={`absolute transition-all duration-300 ${isYearly ? '-top-4 opacity-20' : 'top-2 opacity-100'}`}
                        >
                            semester
                        </span>
                    </div>
                </div>

                <h2 className="my-4 font-bold text-lg text-center">Benefits</h2>
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-2 text-sm">
                    {benefits.map((benefit, index) => {
                        return <MemberBenefitCard benefit={benefit} index={index}/>;
                    })}
                </ul>

                <h2 className="my-4 font-bold text-lg text-center">Payment Methods</h2>
                <ul className="grid grid-cols-1 lg:grid-cols-3 gap-4">
                    <li>
                        <div
                            className="flex items-center justify-between bg-[#084F09] h-full rounded-lg text-center p-2 ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300"
                        >
                            <span>Cash</span>
                            <span className="text-sm">Pay in person</span>
                        </div>
                    </li>
                    <li>
                        <div
                            className="flex items-center justify-between bg-[#3D95CE] h-full rounded-lg text-center p-2 ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300"
                        >
                            <span>Venmo</span>
                            <span className="text-sm">@Code-Coogs</span>
                        </div>
                    </li>
                    <li>
                        <div
                            className="flex items-center justify-between bg-[#6c1cd3] h-full rounded-lg text-center p-2 ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300"
                        >
                            <span className="">Zelle</span>
                            <span className="text-sm">832-535-7320</span>
                        </div>
                    </li>
                </ul>
                <div className="mt-4 text-sm">Include <span className="text-dark-primary-variant">full name</span> when paying with Venmo or Zelle</div>
            </div>
        </div>
    );
}

interface FAQCardProps {
    key: number;
    question: string;
    answer: string;
}

const FAQCard = ({ question, answer }: FAQCardProps) => {
    const [open, setOpen] = useState<boolean>(false);

    return (
        <div className="bg-dark-surface p-2 border-b-2 border-b-white/[.3]">
            <button
                className="text-base text-left w-full text-white"
                onClick={() => setOpen(!open)}
            >
                {question}
            </button>
            {open && (
                <div className="mt-4 text-sm text-white">
                    {answer}
                </div>
            )}
        </div>
    );
};

const Members = () => {
    useEffect(() => {
        document.title = "Join";
    });

    return (
        <div className="bg-dark-surface text-white p-8">
            <h1 className="font-extrabold text-3xl md:text-5xl text-center md:mt-8 ">
                Join a <span className="text-dark-primary-variant">community</span> of hobbyist programmers
            </h1>
            <div className="bg-dark-surface flex flex-col mt-8 md:flex-row md:gap-4 md:p-10">
                <div className="flex-1 basis-1/2">
                    <PricingCard/>
                </div>
                <div className="flex-1 basis-1/2 my-4 md:mt-0">
                    <MembershipForm/>
                </div>
            </div>
            <div className="mx-auto md:w-1/3">
                <h2 className="text-3xl text-center mb-4">FAQs</h2>
                <div className="border-t-2 border-t-white/[.3]">
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
        </div>
    );
};

export default Members;
