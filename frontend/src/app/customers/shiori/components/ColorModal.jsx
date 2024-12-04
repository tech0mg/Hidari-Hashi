"use client";
import React from "react";
import { useColor } from "../../../context/ColorContext";

const ColorModal = ({ onClose }) => {
  const { setColor } = useColor();
  const colors = ["bg-red-200", "bg-blue-200", "bg-green-200", "bg-yellow-200"];

  const handleColorChange = (color) => {
    setColor(color);
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-xl font-bold mb-4 text-center">色を選択</h2>
        <div className="grid grid-cols-3 gap-4">
          {colors.map((colorOption, index) => (
            <button
              key={index}
              className={`p-4 rounded-full ${colorOption}`}
              onClick={() => handleColorChange(colorOption)}
            >
              {colorOption.replace("bg-", "").replace("-200", "")}
            </button>
          ))}
        </div>
        <button className="mt-4 p-2 bg-gray-500 text-white rounded-md" onClick={onClose}>
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ColorModal;
