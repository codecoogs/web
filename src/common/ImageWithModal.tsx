import { useState } from "react";
import { ImageModal } from "./ImageModal";
import { useDoubleTap } from "./useDoubleTap";

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

	const handleDoubleTap = useDoubleTap(() => {
		setIsModalOpen(true);
	});

	const handleImageClick = (e: React.MouseEvent | React.TouchEvent) => {
		e.stopPropagation();
		e.preventDefault();
		setIsModalOpen(true);
	};

	return (
		<>
			<img
				src={currentSrc}
				alt={alt}
				onError={() => {
					if (fallbackSrc && currentSrc !== fallbackSrc)
						setCurrentSrc(fallbackSrc);
				}}
				className={`${className} cursor-pointer select-none active:opacity-80 transition-opacity`}
				onClick={handleImageClick}
				onTouchEnd={handleImageClick}
			/>
			<ImageModal
				isOpen={isModalOpen}
				imageUrl={currentSrc}
				imageAlt={alt}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
