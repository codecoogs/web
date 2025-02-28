import { Link } from "react-router-dom";
import type { Resource } from "../data/resources";

function ResourceItem(props: Resource) {
	return (
		// <div className="w-[250px] h-[250px] mb-5 hover:underline text-white">
		// 	<Link to={props.fileLocation} className="">
		// 		<p>{props.title}</p>

		// 		<p className="text-white text-sm opacity-30">
		// 			{new Date(props.date).toLocaleDateString()}
		// 		</p>

		// 		<img
		// 			className="mt-4"
		// 			src={"https://placehold.co/250x250?text=?"}
		// 			alt={props.title}
		// 		/>
		// 	</Link>
		// </div>

		<Link to={props.link} target="_blank">
			<div className="flex flex-col bg-dark-surface-variant rounded-xl text-center text-white p-4 hover:ring-dark-primary ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300">
				<div className="flex-grow">
					<div className="mx-auto">
						<img
							className="w-[250px] h-[250px] relative object-contain rounded-md"
							src={props.thumbnailUrl} //={"https://placehold.co/250x250?text=?"}
							alt={props.name}
						/>
					</div>
					<span className="block text-sm font-bold pt-4 text-wrap">
						{props.name}
					</span>
					<span className="block text-sm opacity-50 text-wrap">
						{new Date(props.category).toLocaleDateString()}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ResourceItem;
