import React, { type MutableRefObject } from "react";

const FadeInSection = ({
	children,
	className,
}: { children: React.ReactNode; className: string }) => {
	const domRef: MutableRefObject<HTMLElement | undefined> = React.useRef();

	const [isVisible, setVisible] = React.useState(false);

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

	return (
		<section ref={domRef as React.RefObject<HTMLElement>} className={isVisible ? className : "invisible"}>
			{children}
		</section>
	);
};

export default FadeInSection;