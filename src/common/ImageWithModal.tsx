import { useState } from "react";
import { ImageModal } from "./ImageModal";

interface ImageWithModalProps {
	src: string;
	alt: string;
	className?: string;
	/** Shown in place of `src` if it fails to load. */
	fallbackSrc?: string;
}

export const ImageWithModal = ({
	src,
	alt,
	className = "",
	fallbackSrc,
}: ImageWithModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [currentSrc, setCurrentSrc] = useState(src);

	// A tap already fires click, so there is no separate touch handler (that
	// opened the viewer twice). preventDefault keeps a wrapping <Link> from
	// navigating when the image itself is tapped.
	const openModal = (e: React.MouseEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<>
			<button
				type="button"
				onClick={openModal}
				aria-label={`View ${alt} full screen`}
				className="block w-full h-full cursor-pointer select-none rounded-[inherit] active:opacity-80 transition-opacity"
			>
				<img
					src={currentSrc}
					alt={alt}
					onError={() => {
						if (fallbackSrc && currentSrc !== fallbackSrc) {
							setCurrentSrc(fallbackSrc);
						}
					}}
					className={className}
				/>
			</button>
			<ImageModal
				isOpen={isModalOpen}
				imageUrl={currentSrc}
				imageAlt={alt}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
