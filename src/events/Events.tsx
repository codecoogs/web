import React from "react";
import { eventGoogleCalendarLink } from "../data/events";

interface EventCardProps {
    children: React.ReactNode;
};

const EventCard = (props: EventCardProps) => {
    return (
        <li className="flex flex-col bg-dark-surface-variant rounded text-white p-8 m-8">
            {props.children}
        </li>
    );
};

const Events = () => {
    return (
        <div className="bg-dark-surface">
            <div className="bg-dark-surface-variant p-4 m-4 rounded">
                <iframe 
                    src={eventGoogleCalendarLink}
                    className="border-0 w-full overflow-hidden" 
                    height="500" 
                />
            </div>
            <div className="text-center">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-8 bg-dark-surface pb-4">
                    <EventCard>
                        <span>General Meetings</span>
                    </EventCard>
                    <EventCard>
                        <span>Socials</span>
                    </EventCard>
                    <EventCard>
                        <span>Competitions</span>
                    </EventCard>
                    <EventCard>
                        <span>Workshops</span>
                    </EventCard>
                    <EventCard>
                        <span>Banquets</span>
                    </EventCard>
                </ul>
            </div>
        </div>
    );
};

export default Events;
