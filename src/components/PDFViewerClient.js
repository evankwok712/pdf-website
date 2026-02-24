"use client";
import { useState } from "react";
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

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  const goToPrevPage = () =>
    setPageNumber(pageNumber - 1 <= 1 ? 1 : pageNumber - 1);

  const goToNextPage = () =>
    setPageNumber(pageNumber + 1 >= numPages ? numPages : pageNumber + 1);

  return (
    <div style={{ padding: "2rem" }}>
      <nav
        style={{
          marginBottom: "1rem",
          display: "flex",
          gap: "1rem",
          alignItems: "center",
        }}
      >
        <button
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: pageNumber <= 1 ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: pageNumber <= 1 ? "not-allowed" : "pointer",
          }}
        >
          Prev
        </button>
        <button
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
          style={{
            padding: "0.5rem 1rem",
            backgroundColor: pageNumber >= numPages ? "#ccc" : "#007bff",
            color: "white",
            border: "none",
            borderRadius: "4px",
            cursor: pageNumber >= numPages ? "not-allowed" : "pointer",
          }}
        >
          Next
        </button>
        <p style={{ margin: 0, fontWeight: "bold", color: "#333" }}>
          Page {pageNumber} of {numPages || "..."}
        </p>
      </nav>

      <div
        style={{
          border: "1px solid #ccc",
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
            width={800}
          />
        </Document>
      </div>
    </div>
  );
};

export default PDFViewerClient;