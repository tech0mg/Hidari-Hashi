"use client";
import React from "react";
import { useColor } from "../../../context/ColorContext";

const ColorModal = ({ onClose }) => {
  const { setColor } = useColor();
  const colors = [
    { color: "#F28B82", label: "赤" },
    { color: "#F06292", label: "ピンク" },
    { color: "#CE93D8", label: "紫" },
    { color: "#64B5F6", label: "青" },
    { color: "#81C784", label: "緑" },
    { color: "#E0E0E0", label: "グレー" },
    { color: "#4DD0E1", label: "シアン" },
    { color: "#FFD54F", label: "オレンジ" },
    { color: "#FFF176", label: "黄色" },
    { color: "#A1887F", label: "ブラウン" },
  ];

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
              className="w-12 h-12 rounded-full"
              style={{ backgroundColor: colorOption.color }}
              onClick={() => handleColorChange(colorOption.color)}
            >
            </button>
          ))}
        </div>
        <button 
        className="mt-4 p-2 bg-gray-500 text-white rounded-md" 
        onClick={onClose}
        >
          閉じる
        </button>
      </div>
    </div>
  );
};

export default ColorModal;
