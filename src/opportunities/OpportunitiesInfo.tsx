import { Flashcard } from "react-quizlet-flashcard";

const OpportunitiesRoles = [
	{
		name: "Intern",
		icon: "/assets/opportunities/intern.svg",
		year: "Fall 2024",
		description:
			"Gain hands-on experience by working under a director, with the opportunity to grow into an officer role.",
		applicationLink: "https://forms.gle/9PZiZkXpjcGVRVzUA",
	},

	{
		name: "Team Lead",
		icon: "/assets/opportunities/teamLead.svg",
		year: "Fall 2024 - Spring 2025",
		description:
			"Lead a team to create innovative projects and present them to company representatives.",
		applicationLink:
			"https://docs.google.com/forms/d/e/1FAIpQLSdtJq9k76CMKvqo_MhmHVVGM0ZncKllp5vZ67BRs2IuGBOvsA/viewform",
	},

	{
		name: "CUES - Advanced Team",
		icon: "/assets/opportunities/cues.svg",
		year: "Fall 2024 - Spring 2025",
		description:
			"Partner with UH research faculty to develop a Nigerian employment database.",
		applicationLink:
			"https://docs.google.com/forms/d/e/1FAIpQLScwDkeMms9bg7D_SZ8mqVCBJWdYoHpaKomR38A0IXZcuJw3og/viewform",
	},

	{
		name: "Committee Position",
		icon: "/assets/opportunities/committee.svg",
		year: "Fall 2024 - Spring 2025",
		description:
			"Contribute to workshops, events, web development, and marketing initiatives.",
		applicationLink:
			"https://docs.google.com/forms/d/e/1FAIpQLSe2ek4WWAqtz3If-p55_HuN1DNjL9xHhegTxytHtZDXOb79Bw/viewform",
	},
];

const style =
	"flex items-start p-7 h-[200px] relative font-bold  rounded-lg bg-[#151515] text-white ring-1 ring-dark-primary ring-inset";

const OpportunitiesItems = OpportunitiesRoles.map((role) => (
	<Flashcard
		key={role.name}
		style={{
			flex: "1 1 auto",
			width: "45%",
			height: "200px",
			marginBottom: "1rem",
			marginRight: "1rem",
		}}
		frontHTML={
			<div className="relative group">
				<div className="absolute -inset-0.5 bg-dark-primary blur-lg opacity-30 transform scale-90 group-hover:scale-100 transition-all duration-300" />
				<div className={style}>
					<span className="flex h-full flex-col">
						<img src={role.icon} className="w-12 mb-3" alt="" />
						<h1 className="text-lg">{role.name}</h1>
						<h1 className="text-lg font-normal">{role.year}</h1>
					</span>
				</div>
			</div>
		}
		backHTML={
			<div className="relative group">
				<div className="absolute -inset-0.5 bg-dark-primary blur-lg opacity-30 transform scale-90 group-hover:scale-100 transition-all duration-300" />
				<div className={`${style} justify-around items-start h-full flex-col`}>
					<span className="flex h-full flex-col items-center justify-between font-normal">
						<span className="md:text-sm lg:text-base text-sm">
							{role.description}
						</span>

						{role.applicationLink && (
							<div className="relative group">
								<a
									href={role.applicationLink}
									target="_blank"
									className="flex h-8 w-32 md:h-10 md:w-36 justify-center items-center p-2 relative font-bold text-center rounded-lg bg-black text-white ring-1 ring-dark-primary ring-inset hover:text-black hover:bg-dark-primary"
									rel="noreferrer"
								>
									<span className="flex">
										<span className="text-xs md:text-base">Apply</span>
									</span>
								</a>
							</div>
						)}
					</span>
				</div>
			</div>
		}
	/>
));

const OpportunitiesInfo = () => {
	return (
		<div className="text-white p-4" id="opportunitiesInfo">
			<div className="flex flex-wrap flex-col justify-center">
				<div className="rounded md:mx-20 my-4">
					<section className="md:w-3/4 mx-auto">
						<p className="text-lg p-6 opacity-90">
							Join a vibrant team of college students eager to make a difference
							through workshops, projects, competitions, and other coding
							activities. We believe in learning by doing and creating real
							impact along the way.
						</p>
					</section>
				</div>

				<div className="rounded md:mx-20 max-h-[100%] md:max-h-[30rem]">
					<section className="md:w-8/12 mx-auto">
						<div className="flex flex-wrap p-6">{OpportunitiesItems}</div>
					</section>
				</div>
			</div>
		</div>
	);
};

export default OpportunitiesInfo;
