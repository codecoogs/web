// PDFViewer.tsx
import type React from "react";
import { useEffect, useRef, useState } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";
import pdfWorker from "pdfjs-dist/build/pdf.worker.min.mjs?url";

pdfjs.GlobalWorkerOptions.workerSrc = pdfWorker;

interface PDFViewerProps {
	pdfUrl: string;
}

const PDFViewer: React.FC<PDFViewerProps> = ({ pdfUrl }) => {
	const [numPages, setNumPages] = useState<number | null>(null);
	const [error, setError] = useState<string | null>(null);
	const [pageWidth, setPageWidth] = useState<number>(0);
	const containerRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		const updateWidth = (containerWidth?: number) => {
			const width = containerWidth ?? window.innerWidth;
			const padding = 32;
			setPageWidth(Math.min(900, Math.max(300, Math.floor(width - padding))));
		};

		const node = containerRef.current;
		if (!node) {
			updateWidth();
			return;
		}

		const observer = new ResizeObserver((entries) => {
			if (entries[0]) {
				updateWidth(entries[0].contentRect.width);
			}
		});

		observer.observe(node);
		updateWidth(node.clientWidth);

		return () => observer.disconnect();
	}, []);

	const onDocumentLoadSuccess = ({ numPages }: { numPages: number }) => {
		setNumPages(numPages);
	};

	const onDocumentLoadError = (loadError: Error) => {
		console.error("PDF load failed:", loadError);
		setError(loadError.message);
	};

	return (
		<div
			ref={containerRef}
			className="w-full max-w-full h-[85vh] overflow-x-hidden overflow-y-auto bg-gray-900"
		>
			{/* Sticky toolbar — stays visible while scrolling through the PDF */}
			<div className="sticky top-0 z-10 flex flex-col gap-3 border-b border-white/10 bg-gray-900/90 px-4 py-4 backdrop-blur md:flex-row md:items-center md:justify-between">
				<div>
					<p className="text-lg font-semibold text-white">Sponsorship PDF</p>
					<p className="text-sm text-white/60">
						Download or view the document below.
					</p>
				</div>
				<a
					href={pdfUrl}
					download
					className="inline-flex items-center justify-center rounded-md bg-dark-primary px-4 py-2 text-sm font-medium text-dark-surface transition hover:brightness-110"
				>
					Download PDF
				</a>
			</div>

			<div className="px-4 py-4">
				{error ? (
					<div className="p-4 text-red-300">
						<p>Unable to load PDF.</p>
						<p>{error}</p>
						<p className="mt-2 text-sm text-gray-400">
							Check the browser console and Network tab for more details.
						</p>
					</div>
				) : (
					<Document
						file={pdfUrl}
						onLoadSuccess={onDocumentLoadSuccess}
						onLoadError={onDocumentLoadError}
					>
						{numPages &&
							Array.from(new Array(numPages), (_, index) => (
								<div
									key={`page_${index + 1}`}
									className="mb-6 flex justify-center"
								>
									<Page pageNumber={index + 1} width={pageWidth || 300} />
								</div>
							))}
					</Document>
				)}
			</div>
		</div>
	);
};

export default PDFViewer;
