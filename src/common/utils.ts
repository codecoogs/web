import { useEffect } from "react";

export function useTitle(title: string) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}

// Locks page scroll without shifting the layout. `html` has
// `scrollbar-gutter: stable` (see index.css), so the scrollbar's space stays
// reserved while overflow is hidden — for fixed elements like the navbar too,
// which padding the body could never cover.
export function useScrollLock(locked: boolean) {
	useEffect(() => {
		if (!locked) return;

		const root = document.documentElement;
		const { overflow } = root.style;

		root.style.overflow = "hidden";

		return () => {
			root.style.overflow = overflow;
		};
	}, [locked]);
}
