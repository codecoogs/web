import { Link } from "react-router-dom";
import type { Resource } from "../data/api";
import { ImageWithModal } from "../common/ImageWithModal";

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
			<div className="flex flex-col bg-dark-surface-variant rounded-xl text-center text-white p-4 hover:ring-dark-primary/50 ring-1 ring-inset ring-white/10 transition-all duration-300 card-hover-lift">
				<div className="w-[250px] h-[375px]">
					<div className="mx-auto">
						<ImageWithModal
							src={"/assets/happy-coco.webp"}
							alt={props.name}
							className="w-full h-full relative object-cover rounded-md"
						/>
					</div>
					<span className="inline-block text-sm font-bold pt-4 justify-center align-middle user-select-none">
						{props.name}
					</span>

					<span className="block text-sm opacity-50 user-select-none">
						{props.extension}
					</span>
					<span className="block text-sm opacity-50 user-select-none">
						{props.date?.toLocaleDateString()}
					</span>
				</div>
			</div>
		</Link>
	);
}

export default ResourceItem;
