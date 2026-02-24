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
  const MOBILE_BREAKPOINT = 768; // px
  const [containerWidth, setContainerWidth] = useState(null);
  const [isMobile, setIsMobile] = useState(false);
  const containerRef = useRef(null);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages);
  };

  // Measure container width and detect mobile on mount and resize
  useEffect(() => {
    const update = () => {
      const measured = containerRef.current?.clientWidth || window.innerWidth;
      setContainerWidth(Math.max(measured * 0.8, 320));
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    update();
    window.addEventListener("resize", update);
    window.addEventListener("orientationchange", update);
    return () => {
      window.removeEventListener("resize", update);
      window.removeEventListener("orientationchange", update);
    };
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
          display: isMobile ? "none" : "flex",
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
          overflow: isMobile ? "visible" : "hidden",
          display: "flex",
          justifyContent: "center",
          flexDirection: isMobile ? "column" : "row",
          gap: isMobile ? "1rem" : undefined,
          alignItems: "center",
          width: "100%",
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
          {isMobile ? (
            // Render all pages vertically for mobile (scrollable)
            Array.from({ length: numPages || 0 }).map((_, idx) => (
              <Page
                key={idx}
                pageNumber={idx + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                width={containerWidth || 320}
                style={{ marginBottom: "1rem" }}
              />
            ))
          ) : (
            <Page
              pageNumber={pageNumber}
              renderTextLayer={true}
              renderAnnotationLayer={true}
              width={containerWidth || 500}
            />
          )}
        </Document>
      </div>
    </div>
  );
};

export default PDFViewerClient;