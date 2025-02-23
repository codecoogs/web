import PDFViewer from "../common/PDFViewer";
import "@react-pdf-viewer/default-layout/lib/styles/index.css";
import { useTitle } from "../common/utils";

const Sponsors = () => {
	useTitle("Sponsors");

	return (
		<div className=" flex justify-center">
			<PDFViewer pdfUrl="/sponsorship.pdf" />
		</div>
	);
};

export default Sponsors;
