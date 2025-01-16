import type React from "react";
import { useEffect, useState } from "react";

import MembershipForm from "./MembershipForm";

import { benefits, faq } from "../data/members";
import { CheckIcon } from "./MembersIcons";
import type { StripeURL, SubmitProps } from "../common/interface";

interface MemberBenefitCardProps {
	benefit: string;
	index: number;
}

const MemberBenefitCard = (props: MemberBenefitCardProps) => {
	const { benefit, index } = props;

	return (
		<li key={`member-benefit-${index}`}>
			<div className="flex justify-between items-center bg-dark-surface-variant h-full rounded-lg text-center p-2 hover:ring-dark-primary transform transition-all hover:-translate-y-2 duration-300">
				<div className="flex-1 basis-1/4">
					<CheckIcon />
				</div>
				<div className="flex-1 basis-3/4 opacity-50 text-left">
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
				<div className="flex flex-col text-2xl">
					<div>
						<span className="text-3xl text-dark-primary">
							{isYearly ? "$25" : "$15"}
						</span>
						<span> per </span>
						<div
							className="inline-block relative cursor-pointer h-8"
							onClick={togglePricing}
						>
							<span
								className={`absolute transition-all duration-300 ${
									isYearly ? "top-2 opacity-100" : "-top-4 opacity-20"
								}`}
							>
								year
							</span>
							<span
								className={`absolute transition-all duration-300 ${
									isYearly ? "-top-4 opacity-20" : "top-2 opacity-100"
								}`}
							>
								semester
							</span>
						</div>
					</div>
					<span className="text-dark-error text-sm">
						{isYearly && "* Valid July - November"}
					</span>
				</div>

				<h2 className="my-4 font-bold text-lg text-center">Benefits</h2>
				<ul className="grid grid-cols-1 md:grid-cols-2 gap-2 text-sm">
					{benefits.map((benefit, index) => {
						return (
							<MemberBenefitCard key={benefit} benefit={benefit} index={index} />
						);
					})}
				</ul>

				<h2 className="my-4 mt-10 font-bold text-lg text-center">
					Already a member?
				</h2>
				<div className="flex justify-center">
					<button
						className="bg-dark-surface-variant hover:ring-dark-primary px-4 h-10 items-center text-center text-white rounded-lg ring-1 ring-inset ring-white"
						type="submit"
						onClick={() => {
							window.open("https://forms.gle/hrZYtDXbtdJotny17", "_blank");
						}}
					>
						Resubmit your missing resume
					</button>
				</div>
			</div>
		</div>
	);
};

interface FAQCardProps {
	key: React.Key;
	question: string;
	answer: string;
}

const FAQCard = ({ question, answer }: FAQCardProps) => {
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

const LoadingScreen = ({
	submitProps,
	stripeUrl,
}: { submitProps: SubmitProps; stripeUrl: string }) => {
	return (
		<div className="fixed flex justify-center items-center flex-col top-0 left-0 h-full w-full bg-opacity-60 bg-black z-20">
			<h1 className="my-4 mt-10 font-bold text-2xl text-center">
				Proccessing your payment
			</h1>

			<div className="h-14 w-24 flex justify-center items-center">
				<div className="loader" />
			</div>

			{stripeUrl !== "" && (
				<a
					href={stripeUrl}
					onClick={() => submitProps.setSubmitProcess(false)}
					target="_blank"
          rel="noreferrer"
					className="text-dark-primary"
				>
					Click here if you didn't get redirected
				</a>
			)}
		</div>
	);
};

const Members = () => {
	const [submitProcess, setSubmitProcess] = useState<boolean>(false);
	const [stripeUrl, setStripeUrl] = useState<string>("");

	const submitProps: SubmitProps = {
		submitProcess,
		setSubmitProcess,
	};

	const stripeUrlProp: StripeURL = {
		stripeUrl,
		setStripeUrl,
	};

	useEffect(() => {
		document.title = "Join";
	});

	return (
		<div className="text-white p-8">
			{submitProcess === true && (
				<LoadingScreen submitProps={submitProps} stripeUrl={stripeUrl} />
			)}

			<h1 className="font-extrabold text-3xl md:text-5xl text-center md:mt-8 ">
				Join a <span className="text-dark-primary-variant">community</span> of
				hobbyist programmers
			</h1>
			<div className="bg-dark-surface flex flex-col mt-8 md:flex-row md:gap-8 md:p-10">
				<div className="flex-1 basis-1/2 md:mt-0">
					<MembershipForm
						submitProps={submitProps}
						stripeProps={stripeUrlProp}
					/>
				</div>

				<div className="flex-1 basis-1/2">
					<PricingCard />
				</div>
			</div>
			<div className="mx-auto md:w-1/3">
				<h2 className="text-3xl text-center mb-4">FAQs</h2>
				<div className="border-t-2 border-t-white/[.3]">
					{faq.map((response, index) => {
						return (
							<FAQCard
								key={response.question}
								question={response.question}
								answer={response.answer}
							/>
						);
					})}
				</div>
			</div>
		</div>
	);
};

export default Members;
