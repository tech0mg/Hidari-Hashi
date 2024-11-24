"use client";
import React from "react";
import { useRouter } from "next/navigation";

const ShioriFooterButtons = ({ handleNavigation }) => {
  return (
    <div className="bg-white w-full shadow-lg p-4">
      <div className="grid grid-cols-3 gap-4 text-center">
        <button
          onClick={() => alert("いろをえらぶボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-green-200 rounded-full flex items-center justify-center">
            🖌️
          </div>
          <span className="text-sm mt-2">いろをえらぶ</span>
        </button>
        <button
          onClick={() => alert("イラストをえらぶボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-yellow-200 rounded-full flex items-center justify-center">
            👩
          </div>
          <span className="text-sm mt-2">イラストをえらぶ</span>
        </button>
        <button
          onClick={() => alert("ほぞんするボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-pink-200 rounded-full flex items-center justify-center">
            💾
          </div>
          <span className="text-sm mt-2">ほぞんする</span>
        </button>
        <button
          onClick={() => handleNavigation("list-detail")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
            ❌
          </div>
          <span className="text-sm mt-2">やめる</span>
        </button>
        <button
          onClick={() => handleNavigation("list")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-yellow-300 rounded-full flex items-center justify-center">
            ⭐
          </div>
          <span className="text-sm mt-2">リストにもどる</span>
        </button>
        <button
          onClick={() => alert("きろくをみるボタンが押されました")}
          className="flex flex-col items-center"
        >
          <div className="w-12 h-12 bg-purple-200 rounded-full flex items-center justify-center">
            📖
          </div>
          <span className="text-sm mt-2">きろくをみる</span>
        </button>
      </div>
    </div>
  );
};

export default ShioriFooterButtons;
