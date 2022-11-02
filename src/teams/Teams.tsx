import React from "react";

import { yearlyTeams } from "../data/teams";

interface TeamCardProps {
    key: number;
    children: React.ReactNode;
};

const TeamCard = (props: TeamCardProps) => {
    return (
        <li className="bg-dark-surface-variant rounded-lg text-white p-8 m-8 md:hover:scale-110">
            {props.children}
        </li>
    );
};

const Teams = () => {
    return (
        <div className="bg-dark-surface text-white">
            <div className="text-center">
                <div>
                    {
                        yearlyTeams.map((year, yearIndex) => {
                            return(
                                <div>
                                    <h2 className="p-8 font-bold text-4xl text-center underline underline-offset-8">{year.year}</h2>  
                                    <ul className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {
                                            year.info.map((team, index ) => {
                                                return (
                                                    <TeamCard key={index}>  
                                                        <img src={team.photo} alt={`${team.name} photo`}/>
                                                        <h1>{team.name}</h1>
                                                    </TeamCard>
                                                    );
                                            })
                                        }
                                    </ul>
                                </div>
                            );
                        })
                    }
                </div>
            </div>
        </div>  
    );
};

export default Teams;
