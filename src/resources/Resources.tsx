import { useTitle } from "../common/utils";
import ResourceItem from "./ResourceItem";
import { resources } from "../data/resources";

function Resources() {
	useTitle("Resources");

	return (
		<div className="relative min-h-screen min-w-full text-center">
			<h1 className="font-extrabold text-3xl md:text-5xl text-center md:mt-8 text-white">
				Resources
			</h1>

			<ul className="flex flex-row flex-wrap justify-center gap-8 px-10">
				{resources.map((item) => (
					<ResourceItem key={item.id} {...item} />
				))}
			</ul>
		</div>
	);
}

export default Resources;
