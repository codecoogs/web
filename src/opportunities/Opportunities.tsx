import { useEffect, useState } from "react";
import { useTitle } from "../common/utils";
import OpportunitiesInfo from "./OpportunitiesInfo";

const ApplyButton = () => {
	const style =
		"flex items-center p-8 h-10 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary";

    return (
        <div className="animate-fade-down animate-delay-200 relative group">
            <div
                className="absolute -inset-0.5 bg-dark-primary blur-lg rounded-full opacity-50 transform scale-75 group-hover:scale-100 transition-all duration-300"
            />
            <a href="#opportunitiesInfo" className={style}>
                <span className="flex items-center">
                    <span>Apply now</span>
                </span>
            </a>
        </div>
    );
};

const BackgroundRoles = () => {
	return (
		<>
			<span className="animate-jump-in animate-delay-[350ms] absolute top-[18%] left-[20%] opacity-40 text-lg md:text-2xl lg:text-4xl text-[#5DEF97]">
				marketing
			</span>
			<span className="animate-jump-in animate-delay-[550ms] absolute top-[22%] left-[35%] opacity-40 text-lg md:text-2xl lg:text-4xl text-[#EE9BE6]">
				software dev
			</span>
			<span className="animate-jump-in animate-delay-[650ms] absolute top-[17%] left-[55%] opacity-40 text-lg md:text-2xl lg:text-4xl text-[#887FF2]">
				corporate relations
			</span>
			<span className="animate-jump-in animate-delay-[750ms] absolute top-[60%] left-[24%] opacity-40 text-lg md:text-2xl lg:text-4xl text-[#9BDAEE]">
				workshops
			</span>
			<span className="animate-jump-in animate-delay-[950ms] absolute top-[55%] left-[42%] opacity-40 text-lg md:text-2xl lg:text-4xl text-[#ECEE9B]">
				competitions
			</span>
			<span className="animate-jump-in animate-delay-[850ms] absolute top-[57%] left-[62%] opacity-40 text-lg md:text-2xl lg:text-4xl text-[#EE9B9B]">
				teams
			</span>
		</>
	);
};

const BackgroundCircles = () => {
	return (
		<>
			<div
				className="absolute transform -translate-x-0 w-full h-full rounded filter blur-xl opacity-70 blob 7s infinite"
				style={{
					background:
						"linear-gradient(0deg, rgba(191, 64, 191, 0) 0%, rgba(0, 198, 247, 0.05) 50%)",
				}}
			/>
		</>
	);
};

const OpportunitiesTitle = () => {
	const actions = ["Intern", "Lead", "Collaborate"];

	const [index, setIndex] = useState<number>(0);
	const [fade, setFade] = useState<boolean>(true);

	useEffect(() => {
		const interval = setInterval(() => {
			setFade(false);
			setTimeout(() => {
				setIndex((currentIndex) => (currentIndex + 1) % actions.length);
				setFade(true);
			}, 500);
		}, 3000);

		return () => clearInterval(interval);
	}, []);

	return (
		<div className="flex flex-col items-center text-2xl md:text-4xl lg:text-6xl text-white font-normal text-center">
			<div className="flex animate-fade animate-once animate-duration-[1500ms]">
				<span
					className={`flex-1 text-left text-dark-primary transition-opacity duration-700 inline-block ${fade ? "opacity-100" : "opacity-0"}`}
				>
					{actions[index]}&nbsp;
				</span>
				<span>for experience</span>
			</div>
		</div>
	);
};

const Opportunities = () => {
	useTitle("Opportunities");

	return (
		<div>
			<div className="relative flex flex-col justify-center min-h-[80vh]">
				<BackgroundCircles />
				<BackgroundCircles />
				<BackgroundRoles />

				<div className="my-36">
					<OpportunitiesTitle />
				</div>

				<div className="table mt-8 mx-auto">
					<ul className="flex flex-col items-center space-x-0 space-y-4 md:space-x-6 md:space-y-0 md:flex-row">
						<li>
							<ApplyButton />
						</li>
					</ul>
				</div>
			</div>

			<OpportunitiesInfo />
		</div>
	);
};

export default Opportunities;
