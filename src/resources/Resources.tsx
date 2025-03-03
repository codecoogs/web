import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { useTitle } from "../common/utils";
import { resources } from "../data/resources";
import { ResourceCategory } from "./ResourceCategory";
import ResourceItem from "./ResourceItem";

function Resources() {
	useTitle("Resources");

	// Set up
	const searchElement = useRef<HTMLInputElement>(null);
	const images = ["teams", "workshops", "competitions"];
	const categories = useMemo(() => new Array<string>(), []);
	const queries = useMemo(
		() => new URLSearchParams(window.location.search),
		[],
	);

	for (const resource of resources) {
		if (!categories.includes(resource.category)) {
			categories.push(resource.category);
		}
	}

	// State
	const [selected, setSelected] = useState<string>(() => {
		const categoryQuery = queries.get("category");

		if (
			categoryQuery &&
			categoryQuery !== "" &&
			categories.includes(categoryQuery)
		) {
			return categoryQuery;
		}

		return categories[0];
	});
	const [search, setSearch] = useState<string>(() => {
		const searchQuery = queries.get("search");

		if (searchQuery && searchQuery !== "") {
			return searchQuery;
		}

		return "";
	});

	useEffect(() => {
		if (searchElement.current) {
			searchElement.current.value = search;
		}
	});

	useEffect(() => {
		window.history.replaceState(
			"",
			"",
			`${window.location.pathname}?category=${selected}&search=${search}`,
		);
	}, [selected, search]);

	return (
		<div className="relative min-h-screen min-w-full text-center">
			<h1 className="font-extrabold text-3xl md:text-5xl text-center md:mt-8 text-white">
				Resources
			</h1>

			<div className="my-10">
				<ul className="flex flex-row gap-10 justify-center my-3">
					{categories.map((category) => (
						<ResourceCategory
							key={category}
							category={category}
							selected={selected === category}
							onClick={() => setSelected(category)}
						/>
					))}
				</ul>

				<input
					ref={searchElement}
					type="text"
					placeholder="Search"
					onChange={(e) => setSearch(e.target.value)}
					className="bg-white p-3 outline-none rounded focus:bg-light-primary transition-colors"
				/>

				<div className="flex justify-center mx-auto m-2">
					<img
						className="w-fit h-20 relative object-cover rounded-md"
						src={`/assets/${images.find((image) => image.includes(selected.toLowerCase())) ?? "socials"}-coco.webp`}
						alt={selected}
					/>
				</div>
			</div>

			<ul className="flex flex-row flex-wrap gap-10 justify-center">
				{resources.map((resource) => (
					<ResourceItem
						key={resource.id}
						visible={
							selected === resource.category &&
							(search === "" ||
								resource.name.toLowerCase().includes(search.toLowerCase()))
						}
						{...resource}
					/>
				))}
			</ul>
		</div>
	);
}

export default Resources;
