"use client";
import { useState, useRef, useEffect } from "react";
import { Document, Page, pdfjs } from "react-pdf";
import "react-pdf/dist/Page/TextLayer.css";
import "react-pdf/dist/Page/AnnotationLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url,
).toString();
const PDFViewerClient = () => {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [containerWidth, setContainerWidth] = useState(null);
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Measure container width on mount and resize
  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setContainerWidth(containerRef.current.clientWidth * 0.8); // 90% of container width
      }
    };

    updateWidth();
    window.addEventListener("resize", updateWidth);
    return () => window.removeEventListener("resize", updateWidth);
  }, []);

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div style={{ padding: "2rem" }}>
      <nav
        style={{
          position: "fixed",
          top: "50%",
          left: "0",
          right: "0",
          transform: "translateY(-50%)",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "0 2rem",
          zIndex: 1000,
        }}
      >
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: pageNumber <= 1 ? "#FFF" : "#FFF",
            color: "black",
            border: "none",
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          }}
        >
          &lt;
        </button>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: pageNumber >= numPages ? "#FFF" : "#FFF",
            color: "black",
            border: "none",
            cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
          }}
        >
          &gt;
        </button>
        {/* <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
          Page {pageNumber} of {numPages || "..."}
        </p> */}
      </nav>

      <div
        ref={containerRef}
        style={{
          borderRadius: "4px",
          overflow: "hidden",
          display: "flex",
          justifyContent: "center",
        }}
      >
        <Document
          file="/Portfolio 2026.pdf"
          onLoadSuccess={onDocumentLoadSuccess}
          loading={
            <div style={{ padding: "2rem", textAlign: "center" }}>
              Loading PDF...
            </div>
          }
          error={
            <div
              style={{
                padding: "2rem",
                textAlign: "center",
                color: "red",
              }}
            >
              Failed to load PDF. Please make sure the file exists in the public
              folder.
            </div>
          }
        >
          <Page
            pageNumber={pageNumber}
            renderTextLayer={true}
            renderAnnotationLayer={true}
            width={containerWidth || 500}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewerClient;