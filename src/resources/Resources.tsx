import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { getDateFromResourceName, useTitle } from "../common/utils";
import { resources } from "../data/resources";
import { ResourceCategory } from "./ResourceCategory";
import ResourceItem from "./ResourceItem";

function Resources() {
	useTitle("Resources");

	// Set up
	const searchElement = useRef<HTMLInputElement>(null);
	const images = ["teams", "workshops", "competitions"];
	const categories = useMemo(() => {
		const arr = new Array<string>();

		resources.sort((a, b) => {
			const dateA = getDateFromResourceName(a);
			const dateB = getDateFromResourceName(b);

			if (dateA && !dateB) {
				return -1;
			}

			if (!dateA && dateB) {
				return 1;
			}

			if (dateA && dateB) {
				return dateA < dateB ? 1 : -1;
			}

			return 1;
		});

		for (const resource of resources) {
			if (!arr.includes(resource.category)) {
				arr.push(resource.category);
			}
		}

		return arr;
	}, []);
	const queries = useMemo(
		() => new URLSearchParams(window.location.search),
		[],
	);

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

			<div className="mt-10 space-y-5">
				<ul className="flex flex-col gap-10 justify-center md:flex-row">
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
					className="bg-white p-3 outline-none rounded focus:bg-light-primary focus:text-black focus:placeholder-black transition-colors"
				/>
			</div>

			<ul className="my-10 flex flex-row flex-wrap gap-10 justify-center">
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
