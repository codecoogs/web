import { useState } from "react";

import { appLink, benefits, faq } from "../data/members";
import { CheckIcon } from "./MembersIcons";
import { useTitle } from "../common/utils";

interface MemberBenefitCardProps {
	benefit: string;
	index: number;
}

const MemberBenefitCard = (props: MemberBenefitCardProps) => {
	const { benefit, index } = props;

	return (
		<li key={`member-benefit-${index}`}>
			<div className="flex justify-between items-center bg-dark-surface-variant h-full rounded-lg text-center p-2 hover:ring-dark-primary transition-all duration-300 card-hover-lift">
				<div className="flex-1 basis-1/4">
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
