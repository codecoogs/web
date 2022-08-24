import React from "react";

import { projects } from "../data/projects";

interface LinksObj {
    source: string;
    demo: string;
}

interface ProjectCardProps {
    key: number;
    name: string;
    creator: string;
    links: LinksObj;
};

const ProjectCard = (props: ProjectCardProps) => {
    const {
        source,
        demo
    } = props.links;

    return (
        <li className="flex flex-col bg-dark-surface-variant rounded text-white p-8 m-8">
            <span>{props.name}</span>
            <span className="pt-8">{props.creator}</span>
            {source !== "" && <a className="text-dark-primary underline pt-8" href={source}>Source</a>}
            {demo !== "" && <a className="text-dark-primary underline" href={demo}>Demo</a>}
        </li>
    );
};

const Projects = () => {
    return (
        <div className="bg-dark-surface">
            <div className="text-center">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-8 bg-dark-surface pb-4">
                    { projects.map((project, index) => {
                            return <ProjectCard
                                    key={index}
                                    name={project.name}
                                    creator={project.creator}
                                    links={project.links}
                                   />
                      })
                    }
                </ul>
            </div>
        </div>
    );
};

export default Projects;
