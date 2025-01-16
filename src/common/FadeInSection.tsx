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

	React.useEffect(() => {
        if (domRef.current) {
            const observer = new IntersectionObserver((entries) => {
                // In your case there's only one element to observe:
                if (entries[0].isIntersecting) {
                    // Not possible to set it back to false like this:
                    setVisible(true);
    
                    // No need to keep observing:
                    observer.unobserve(domRef.current as Element);
                }
            });
    
            observer.observe(domRef.current);
    
            return () => observer.disconnect();
        }		
	}, []);
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
		<section ref={domRef as React.RefObject<HTMLElement>} className={isVisible ? className : ""}>
			{children}
		</section>
	);
	return (
		<section ref={domRef} className={isVisible ? className : ""}>
			{children}
		</section>
	);
};

export default FadeInSection;

export default FadeInSection;
