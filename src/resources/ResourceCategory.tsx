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
	return (
		<button
			type="button"
			className={`px-5 py-2 rounded-full text-sm font-semibold tracking-wide transition-all duration-200 ${
				selected
					? "bg-dark-primary text-dark-surface"
					: "text-white/60 ring-1 ring-inset ring-white/10 hover:text-dark-primary hover:ring-dark-primary/60"
			}`}
			onClick={() => onClick(category)}
		>
			{category}
		</button>
	);
}
