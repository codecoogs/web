import { useEffect } from "react";

export function useTitle(title: string) {
	useEffect(() => {
		document.title = title;
	}, [title]);
}

// Locks page scroll without letting the scrollbar disappear — hiding it via
// `overflow: hidden` alone shrinks the page width by the scrollbar's size,
// which shifts all the content and reads as a layout glitch. Padding the
// body by that same width keeps it in place.
export function useScrollLock(locked: boolean) {
	useEffect(() => {
		if (!locked) return;

		const scrollbarWidth =
			window.innerWidth - document.documentElement.clientWidth;
		const { overflow, paddingRight } = document.body.style;

		document.body.style.overflow = "hidden";
		if (scrollbarWidth > 0) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}

		return () => {
			document.body.style.overflow = overflow;
			document.body.style.paddingRight = paddingRight;
		};
	}, [locked]);
}
