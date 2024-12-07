// src/app/components/SaveToPDF.js
"use client";
import React from "react";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import SaveIcon from "../../../components/icon/icon_save";


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
      className="flex flex-col items-center"
      onClick={handleSaveToPDF}
    >
      <div className="w-12 h-12 rounded-full flex items-center justify-center">
        <SaveIcon size={24} />
      </div>
      <span className="text-sm mt-2">ほぞんする</span>
    </button>
  );
};

export default SaveToPDF;
