import { useRef, useCallback } from "react";

export const useDoubleTap = (callback: () => void, delay = 300) => {
	const lastTapRef = useRef(0);

	return useCallback(() => {
		const now = Date.now();
		if (now - lastTapRef.current < delay) {
			callback();
		}
		lastTapRef.current = now;
	}, [callback, delay]);
};
