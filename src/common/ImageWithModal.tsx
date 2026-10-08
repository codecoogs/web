import { useState } from "react";
import { ImageModal } from "./ImageModal";
import { useDoubleTap } from "./useDoubleTap";

interface ImageWithModalProps {
	src: string;
	alt: string;
	className?: string;
}

export const ImageWithModal = ({
	src,
	alt,
	className = "",
}: ImageWithModalProps) => {
	const [isModalOpen, setIsModalOpen] = useState(false);

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
				src={src}
				alt={alt}
				className={`${className} cursor-pointer select-none active:opacity-80 transition-opacity`}
				onClick={handleImageClick}
				onTouchEnd={handleImageClick}
			/>
			<ImageModal
				isOpen={isModalOpen}
				imageUrl={src}
				imageAlt={alt}
				onClose={() => setIsModalOpen(false)}
			/>
		</>
	);
};
