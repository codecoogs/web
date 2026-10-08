import { useState } from "react";

import { appLink, benefits, faq } from "../data/members";
import { CheckIcon } from "./MembersIcons";
import { useTitle } from "../common/utils";

const JoinCard = () => (
	<div className="bg-dark-surface-variant h-full rounded-lg p-6 ring-1 ring-inset ring-white/[.3] flex flex-col items-center text-center">
		<img
			src="/assets/happy-coco.webp"
			alt="CoCo mascot"
			className="w-24 h-24 object-contain"
		/>
		<h2 className="mt-4 font-bold text-2xl">Sign up on the CoCo app</h2>
		<p className="mt-2 text-white/60 max-w-md">
			Membership registration and dues are handled on the Code[Coogs] app.
			Create your account there to become a member.
		</p>
		<a
			href={appLink}
			target="_blank"
			rel="noreferrer"
			className="mt-6 px-7 py-3 font-bold rounded-lg bg-dark-primary text-dark-surface hover:brightness-110 transition-all duration-200"
		>
			Join via CoCo ↗
		</a>

		<h2 className="mt-10 mb-4 font-bold text-lg">Benefits</h2>
		<ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm w-full">
			{benefits.map((benefit) => (
				<li
					key={benefit}
					className="flex items-center gap-3 bg-dark-surface rounded-lg p-2 text-left"
				>
					<CheckIcon />
					<span className="opacity-50">{benefit}</span>
				</li>
			))}
		</ul>
	</div>
);

const FAQCard = ({
	question,
	answer,
}: { question: string; answer: string }) => {
	const [open, setOpen] = useState<boolean>(false);

	return (
		<div className="bg-dark-surface p-2 border-b-2 border-b-white/[.3]">
			<button
				type="button"
				className="text-base text-left w-full text-white"
				onClick={() => setOpen(!open)}
			>
				{question}
			</button>
			{open && <div className="mt-4 text-sm text-white">{answer}</div>}
		</div>
	);
};

const Members = () => {
	useTitle("Join");

	return (
		<div className="text-white p-8">
			<h1 className="font-extrabold text-3xl md:text-5xl text-center md:mt-8 ">
				Join a <span className="text-dark-primary-variant">community</span> of
				hobbyist programmers
			</h1>
			<div className="mx-auto max-w-3xl my-8">
				<JoinCard />
			</div>
			<div className="mx-auto md:w-1/3">
				<h2 className="text-3xl text-center mb-4">FAQs</h2>
				<div className="border-t-2 border-t-white/[.3]">
					{faq.map((response) => (
						<FAQCard
							key={response.question}
							question={response.question}
							answer={response.answer}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Members;
