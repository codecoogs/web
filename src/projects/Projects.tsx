import React from "react";

interface ProjectCardProps {
    children: React.ReactNode;
};

const ProjectCard = (props: ProjectCardProps) => {
    return (
        <li className="flex flex-col bg-dark-surface-variant rounded text-white p-8 m-8">
            {props.children}
        </li>
    );
};

const Projects = () => {
    return (
        <div className="bg-dark-surface">
            <div className="text-center">
                <ul className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 m-8 bg-dark-surface pb-4">
                    <ProjectCard>
                        <span>Robotic Arm</span>
                        <span className="pt-8">Git Gud</span>
                    </ProjectCard>
                    <ProjectCard>
                        <span>2D Platformer</span>
                        <span className="pt-8">Team O(n)</span>
                    </ProjectCard>
                    <ProjectCard>
                        <span>Number Handwriting ML Program</span>
                        <span className="pt-8">Team O(n)</span>
                    </ProjectCard>
                    <ProjectCard>
                        <span>Spotify Bot</span>
                        <span className="pt-8">Dream Team</span>
                    </ProjectCard>
                    <ProjectCard>
                        <span>Twitter Bot</span>
                        <span className="pt-8">Dream Team</span>
                    </ProjectCard>
                </ul>
            </div>
        </div>
    );
};

export default Projects;
