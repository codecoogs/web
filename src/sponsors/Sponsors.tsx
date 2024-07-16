import React from 'react';
import PDFViewer from '../common/PDFViewer';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

const Sponsors = () => {
  return (
    <div className=" flex justify-center">

      <PDFViewer pdfUrl="/sponsorship.pdf" />
    </div>
  );
};

export default Sponsors;
