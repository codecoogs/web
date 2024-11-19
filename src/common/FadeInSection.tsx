import type React from "react";
import { useRef, useState, useEffect, type ReactNode } from "react"

interface FadeInSectionProps {
	children: ReactNode;
	className?: string;
}

const FadeInSection: React.FC<FadeInSectionProps> = ({
	children,
	className,
}) => {
	const domRef = useRef<HTMLElement | null>(null); // Type is HTMLElement | null
	const [isVisible, setVisible] = useState(false);

	useEffect(() => {
		const observer = new IntersectionObserver((entries) => {
			if (entries[0].isIntersecting) {
				setVisible(true);
				// Stop observing the element once it is visible
				if (domRef.current) {
					observer.unobserve(domRef.current);
				}
			}
		});

		if (domRef.current) {
			observer.observe(domRef.current);
		}

		// Cleanup the observer on component unmount
		return () => observer.disconnect();
	}, []);

	return (
		<section ref={domRef} className={isVisible ? className : ""}>
			{children}
		</section>
	);
};

export default FadeInSection;
