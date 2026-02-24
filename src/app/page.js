"use client";
import PDFViewer from "../components/PDFViewer";

export default function Home() {
  return (
    <div style={{ minHeight: "100vh", backgroundColor: "#f5f5f5" }}>
      <div
        style={{
          margin: "0 auto",
          backgroundColor: "white",
          minHeight: "100vh",
        }}
      >
        <PDFViewer />
      </div>
    </div>
  );
}