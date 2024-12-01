// src/app/components/SaveToPDF.js
"use client";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

const SaveToPDF = ({ pages, fileName = "document.pdf" }) => {
  const handleSaveToPDF = async () => {
    const pdf = new jsPDF();
    let isFirstPage = true;

    for (const page of pages) {
      const element = document.getElementById(page);

      if (!element) {
        console.warn(`${page} のコンテンツが見つかりません`);
        continue;
      }

      const canvas = await html2canvas(element, { scale: 2 });
      const imgData = canvas.toDataURL("image/png");
      const imgWidth = 210; // A4横幅(mm)
      const imgHeight = (canvas.height * imgWidth) / canvas.width;

      if (isFirstPage) {
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
        isFirstPage = false;
      } else {
        pdf.addPage();
        pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      }
    }

    pdf.save(fileName);
  };

  return (
    <button
      onClick={handleSaveToPDF}
      className="p-2 bg-pink-500 text-white rounded-md shadow-md hover:bg-pink-600"
    >
      ほぞんする
    </button>
  );
};

export default SaveToPDF;
