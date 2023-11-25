import allOfficers from "./officers";

import tailerPhoto from "./../assets/alumni/Tailer.webp";
import toriPhoto from "./../assets/alumni/Tori.webp";
import rodolfoPhoto from "./../assets/alumni/Rodolfo.webp";
import jenniferPhoto from "./../assets/alumni/Jennifer.webp";
import eithanPhoto from "./../assets/alumni/Eithan.webp";
import nghiaPhoto from "./../assets/alumni/Nghia.webp";
import abdullahPhoto from "./../assets/alumni/Abdullah.webp";
import omarPhoto from "./../assets/alumni/Omar.webp";
import christianPhoto from "./../assets/alumni/Christian.webp";
import gabriellePhoto from "./../assets/alumni/Gabrielle.webp";
import fernandoPhoto from "./../assets/alumni/Fernando.webp";
import sanaPhoto from "./../assets/alumni/Sana.webp";

import hcssLogo from "./../assets/logos/hcss.webp";
import tomNTomsLogo from "./../assets/logos/tom-n-toms.webp";

import csGirlsLogo from "./../assets/logos/csgirls.webp";

export const email = "main@codecoogs.com";

export const aboutUsDesc = "Founded in September 2021, we are student-led computer science organization at the University of Houston. We focus on socials, teams, competitions, and workshops. We hope to foster an environment to develop exciting projects, refine technical skills, and gain new friends.";
export const socialsDesc = "The socials are a time for members to kick back and relax. Whether it is a sports day at a park or a virtual movie night, our socials are sure to enable our members to get closer to one another to promote the community aspect within our members. Show up to our in-person socials for a good time!";
export const teamsDesc = "Being part of a team in Code Coogs gives members the opportunity to hone their coding skills while making worthwhile friends. Members will work with a diverse group of fellow programmers, and people from all coding and cultural backgrounds. Members will get to experience a collective effort from their own team in producing a hefty end of year project showcased at our banquet";
export const competitionsDesc = "Every two weeks we will hold a competition that will put your skills to the test. Each competition will push you to become a better programmer. The skills you gain from solving these problems will show when you do technical interviews!";
export const workshopsDesc = "Workshops are where our members will develop their programming skills and gain a sense of collaboration with their peers, and gain confidence in their problem-solving skills. Workshops will go over challenging problems that utilize a variety of programming concepts, and students will learn the patterns and techniques used to tackle these problems. It is encouraged to collaborate and bounce ideas off of one another to understand different angles of solving these problems!";

export const officers = allOfficers[1];

export const alumni = [
    {
        name: "Tailer Nguyen",
        position: "President",
        photo: tailerPhoto,
        company: "Microsoft (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/tailer-nguyen/",
        }
    },
    {
        name: "Tori Nguyen",
        position: "VP of External Affairs",
        photo: toriPhoto,
        company: "Oracle (Technical Consultant)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/tori-nguyen23/",
        }
    },
    {
        name: "Rodolfo Chavez",
        position: "VP of Internal Affairs",
        photo: rodolfoPhoto,
        company: "JP Morgan (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/rodolfo-chavez-478287183/",
        }
    },
    {
        name: "Jennifer Figueroa",
        position: "Treasurer",
        photo: jenniferPhoto,
        company: "JP Morgan (SWE Intern)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/jennifer-figueroa-maria/",
        }
    },
    {
        name: "Eithan Austria",
        position: "Workshop Facilitator",
        photo: eithanPhoto,
        company: "JP Morgan (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/eithanaustria/",
        }
    },
    {
        name: "Nghia Luu",
        position: "Competitions Director",
        photo: nghiaPhoto,
        company: "JP Morgan (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/nghiep-nghia-luu/",
        }
    },
    {
        name: "Abdullah S.",
        position: "Workshops Director",
        photo: abdullahPhoto,
        company: "Meta (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/abdullah-samma/",
        }
    },
    {
        name: "Omar Romero",
        position: "Activities Director",
        photo: omarPhoto,
        company: "P&G (R&D Intern)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/omar-f-romero/",
        }
    },
    {
        name: "Christian Montemayor",
        position: "Team lead",
        photo: christianPhoto,
        company: "Google (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/christianmontemayor/",
        }
    },
    {
        name: "Gabrielle Co",
        position: "Team lead",
        photo: gabriellePhoto,
        company: "Sprout Social (SWE)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/gabrielleco/",
        }
    },
    {
        name: "Fernando Ramirez",
        position: "Teams Director",
        photo: fernandoPhoto,
        company: "Amazon (SWE Intern)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/fndo/",
        }
    },
    {
        name: "Sana A.",
        position: "VP of Internal Affairs Intern",
        photo: sanaPhoto,
        company: "Google (SWE Intern)",
        socials: {
            instagram: "",
            linkedin: "https://www.linkedin.com/in/sana-akbani/",
        }
    },
]

export const sponsors = [
    {
        name: "HCSS",
        link: "https://careers.hcss.com/",
        logo: hcssLogo
    },
    {
        name: "Tom N Toms",
        link: "https://www.tomntomsbellaire.com/",
        logo: tomNTomsLogo
    }
];

export const partners =[
    {
        name: "CSGirls",
        link: "https://csgirls.org/",
        logo: csGirlsLogo
    },
];

export const faq = [
    {
        question: "How much is membership?",
        answer: "$25 dollars for the whole year or $15 dollars per semester"
    },
    {
        question: "What makes Code[Coogs] special?",
        answer: "Code Coogs is the only student organization at UH that offers coordinated computer science group projects. We also focus on building a strong community with our team system, host many fun socials throughout the semester, and have several teams that prepare for ICPC by competing in Leetcode style competitions."
    },
    {
        question: "Why should I become a member?",
        answer: "Members get access to all of the following: being placed on one of our teams, reimbursement for project supplies, free food at our meetings, member exclusive events, scholarships, and more!"
    },
    {
        question: "How can I be updated on upcoming events?",
        answer: "We will be making announcements on our discord server and on instagram regarding all upcoming events. All of our social medias are on our LinkTree."
    },
    {
        question: "Is programming experience required?",
        answer: "Code Coogs is open to all levels of programming experience. Hopefully after guidance from our team leads, workshops facilitators, and other experienced members, those who entered the club as beginners will become experienced."
    }
];
