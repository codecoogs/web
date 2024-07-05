import React, { useEffect } from "react";
import HTMLFlipBook from "react-pageflip";

import { Document, Page as ReactPDFPage, pdfjs } from "react-pdf";
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.js`;

// import sponsorship from "./sponsorship.pdf";

const width = 720;
const height = 1280;

const Page = (props: { pageNumber: number }) => {
  return (
    <div>
      <ReactPDFPage pageNumber={props.pageNumber} width={width} />
    </div>
  );
};

const Sponsors = () => {
  useEffect(() => {
    document.title = "Sponsors";
  }, []);

  console.log("TEST")

  return (
    <div>
      <h1>TEST</h1>
      {/* <Document file={sponsorship}>
        <HTMLFlipBook
          style={{}}
          // children={{}}
          startPage={0}
          width={width}
          height={height}
          drawShadow={true}
          flippingTime={10}
          usePortrait={false}
          startZIndex={0}
          autoSize={false}
          clickEventForward={false}
          useMouseEvents={false}
          swipeDistance={0}
          showPageCorners={false}
          disableFlipByClick={false}
          size="stretch"
          minWidth={315}
          maxWidth={width}
          minHeight={400}
          maxHeight={height}
          maxShadowOpacity={0.5}
          showCover={true}
          mobileScrollSupport={true}
          onFlip={() => { }}
          onChangeOrientation={() => { }}
          onChangeState={() => { }}
          className="demo-book"
        >
          <Page pageNumber={1} />
        </HTMLFlipBook>
      </Document> */}
    </div>
  );
};

export default Sponsors;
