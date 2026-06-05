import PDFViewer from "../common/PDFViewer";
import { useTitle } from "../common/utils";

const Sponsors = () => {
	useTitle("Sponsors");

	return (
		<div className=" flex justify-center">
			<PDFViewer pdfUrl="/26-27_Code_Coogs_Sponsorship.pdf" />
		</div>
	);
};

export default Sponsors;
