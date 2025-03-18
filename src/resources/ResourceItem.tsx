import { Link } from "react-router-dom";
import type { Resource } from "../data/resources";

interface ResourceItemProps extends Resource {
	visible: boolean;
}

function ResourceItem(props: ResourceItemProps) {
	return (
		<Link
			target="_blank"
			to={props.link}
			className={`${props.visible ? "visible" : "hidden"}`}
		>
			<div className="flex flex-col bg-dark-surface-variant rounded-xl text-center text-white p-4 hover:ring-dark-primary ring-1 ring-inset ring-white/[.3] transform transition-all hover:-translate-y-2 duration-300">
				<div className="w-[250px] h-[375px]">
					<div className="mx-auto">
						<img
							className="w-full h-full relative object-cover rounded-md"
							src={"/assets/happy-coco.webp"}
							alt={props.name}
						/>
					</div>
					<span className="inline-block text-sm font-bold pt-4 justify-center align-middle">
						{props.name}
					</span>

					<span className="block text-sm opacity-50">{props.extension}</span>
					<span className="block text-sm opacity-50">
						{props.date?.toLocaleDateString()}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ResourceItem;
