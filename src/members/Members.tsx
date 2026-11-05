import { useState } from "react";

import { appLink, benefits, faq } from "../data/members";
import { CheckIcon } from "./MembersIcons";
import { useTitle } from "../common/utils";

const cn = (...classes: Array<string | false | undefined>) =>
	classes.filter(Boolean).join(" ");

const DemoCard = () => (
	<div className="flex w-full flex-col gap-12 lg:flex-row lg:items-center lg:justify-center">
		<div className="shrink-0 rounded-lg bg-dark-surface-variant p-6 ring-1 ring-inset ring-white/[.1] lg:w-80">
			<h2 className="mb-4 text-center font-bold text-lg">Benefits</h2>
			<div className="flex flex-col gap-2 text-sm">
				{benefits.map((item, index) => (
					<div
						key={item}
						className={cn(
							"flex items-center gap-3 rounded-lg px-3 py-2.5 transition-colors",
							index % 2 === 0 && "bg-dark-surface",
						)}
					>
						<CheckIcon />
						<span className="text-sm text-white/[.5]">{item}</span>
					</div>
				))}
			</div>
		</div>
		<div className="relative isolate min-w-0 lg:w-[42rem]">
			{/* Soft glow spreading out from behind the video so it blends into the page. */}
			<div
				aria-hidden="true"
				className="absolute -inset-24 -z-10 bg-[radial-gradient(ellipse_closest-side,rgba(117,228,255,0.3)_55%,transparent)] blur-2xl"
			/>
			<video
				className="w-full rounded-lg shadow-lg shadow-black/40"
				autoPlay
				loop
				muted
				playsInline
			>
				<source src="/assets/membership-purchase-demo.mp4" type="video/mp4" />
			</video>
		</div>
	</div>
);

const JoinCard = () => (
	<div className="flex h-full flex-col items-center rounded-lg bg-dark-surface p-6 text-center">
		<h2 className="font-bold text-2xl">Get your membership via the CoCo app</h2>
		<a
			href={appLink}
			target="_blank"
			rel="noreferrer"
			className="mt-6 px-7 py-3 font-bold rounded-lg bg-dark-primary text-dark-surface hover:brightness-110 transition-all duration-200"
		>
			Join Today
		</a>
	</div>
);

const ChevronIcon = ({ className }: { className?: string }) => (
	<svg
		role="graphics-symbol"
		aria-label="chevronIcon"
		viewBox="0 0 24 24"
		fill="none"
		stroke="currentColor"
		strokeWidth="2"
		strokeLinecap="round"
		strokeLinejoin="round"
		className={className}
	>
		<path d="m6 9 6 6 6-6" />
	</svg>
);

const FAQCard = ({
	question,
	answer,
	open,
	onToggle,
}: {
	question: string;
	answer: string;
	open: boolean;
	onToggle: () => void;
}) => (
	<div className="border-b border-white/[.15]">
		<button
			type="button"
			aria-expanded={open}
			className="flex w-full items-center justify-between gap-4 py-4 text-left text-sm font-medium text-white hover:underline"
			onClick={onToggle}
		>
			{question}
			<ChevronIcon
				className={cn(
					"h-4 w-4 shrink-0 text-white transition-transform duration-200",
					open && "rotate-180",
				)}
			/>
		</button>
		<div
			className={cn(
				"grid transition-[grid-template-rows] duration-200 ease-in-out",
				open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
			)}
		>
			<div className="overflow-hidden">
				<p className="pb-4 text-sm text-white/[.5]">{answer}</p>
			</div>
		</div>
	</div>
);

const Members = () => {
	useTitle("Join");

	const [openFaq, setOpenFaq] = useState<string | null>(null);

	return (
		<div className="overflow-x-clip text-white p-8">
			<h1 className="font-extrabold text-3xl md:text-5xl text-center md:mt-8 ">
				Join a{" "}
				<span className="text-dark-primary-variant">
					<a
						href={appLink}
						target="_blank"
						rel="noreferrer"
						className="hover:underline"
					>
						community
					</a>
				</span>{" "}
				of hobbyist programmers
			</h1>
			<div className="mx-auto max-w-7xl my-8 flex flex-col gap-6">
				<DemoCard />
				<JoinCard />
			</div>
			<div className="mx-auto my-8 w-full max-w-lg">
				<h2 className="text-3xl text-center mb-4 mt-24">FAQs</h2>
				<div>
					{faq.map((response) => (
						<FAQCard
							key={response.question}
							question={response.question}
							answer={response.answer}
							open={openFaq === response.question}
							onToggle={() =>
								setOpenFaq((current) =>
									current === response.question ? null : response.question,
								)
							}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default Members;
