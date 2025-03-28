import { useEffect, useState } from "react";

const images = ["teams", "workshops", "competitions"];

interface ResourceCategoryProps {
	category: string;
	selected: boolean;

	onClick: (category: string) => void;
}

export function ResourceCategory({
	category,
	onClick,
	selected,
}: ResourceCategoryProps) {
	const [hovering, setHovering] = useState(false);
	const [text, setText] = useState(category);

	useEffect(() => {
		if (hovering) {
			setText(`[${category}]`);
		} else {
			setText(category);
		}
	}, [hovering, category]);

	return (
		<button
			type="button"
			className={`md:w-52 w-full border border-white p-2 rounded-lg hover:border-dark-primary hover:text-dark-primary ${selected ? "text-dark-primary border-dark-primary" : "text-white"}`}
			onClick={() => onClick(category)}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			<div className="flex flex-col items-center gap-2">
				<img
					className="max-h-24 relative object-cover rounded-md"
					src={`/assets/${images.find((image) => image.includes(category.toLowerCase())) ?? "socials"}-coco.webp`}
					alt={category}
				/>
				<span>{text}</span>
			</div>
		</button>
	);
}
