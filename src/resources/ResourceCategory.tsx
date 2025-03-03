import { useEffect, useState } from "react";

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
			className={`w-[175px] hover:text-dark-primary ${selected ? "text-dark-primary" : "text-white"}`}
			onClick={() => onClick(category)}
			onMouseEnter={() => setHovering(true)}
			onMouseLeave={() => setHovering(false)}
		>
			{text}
		</button>
	);
}
