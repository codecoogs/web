import { useEffect } from "react";

interface ImageModalProps {
	isOpen: boolean;
	imageUrl: string;
	imageAlt: string;
	onClose: () => void;
}

export const ImageModal = ({
	isOpen,
	imageUrl,
	imageAlt,
	onClose,
}: ImageModalProps) => {
	useEffect(() => {
		const handleEscape = (e: KeyboardEvent) => {
			if (e.key === "Escape") {
				onClose();
			}
		};

		if (isOpen) {
			document.addEventListener("keydown", handleEscape);
			document.body.style.overflow = "hidden";
			return () => {
				document.removeEventListener("keydown", handleEscape);
				document.body.style.overflow = "unset";
			};
		}
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<div
			className="modal-backdrop fixed inset-0 z-50 bg-black flex items-center justify-center"
			onClick={onClose}
		>
			<div
				className="modal-content relative w-full h-full flex items-center justify-center"
				onClick={(e) => e.stopPropagation()}
			>
				<img
					src={imageUrl}
					alt={imageAlt}
					className="w-full h-full object-contain"
				/>
				<button
					onClick={onClose}
					className="absolute top-6 right-6 w-12 h-12 flex items-center justify-center bg-white/20 hover:bg-white/30 rounded-full text-white transition-all duration-200 z-10"
					aria-label="Close modal"
				>
					<svg
						width="28"
						height="28"
						viewBox="0 0 24 24"
						fill="none"
						stroke="currentColor"
						strokeWidth="2"
					>
						<path d="M18 6L6 18M6 6l12 12" />
					</svg>
				</button>
			</div>
		</div>
	);
};
