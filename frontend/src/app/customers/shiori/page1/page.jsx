"use client";
import React, { useState } from "react";
import ShioriFooterButtons from "../components/ShioriFooterButtons";//下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import ColorModal from "../components/ColorModal";
import IllustrationSelector from "../components/IllustrationSelector";
import { useNavigation } from "../components/useNavigation";

const ShioriPage1 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor();


  return (
    <div 
    id="page1" 
    className="flex flex-col items-center justify-between min-h-screen"
    style={{ backgroundColor: shioriColor }}
    >
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* 上部コンテンツ */}
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">しおりpage1</h1>
          <p className="text-lg text-center mb-2">Produced by</p>
          <p className="text-xl text-center font-semibold">りな</p>
          {/* イラスト選択プルダウン */}
          <IllustrationSelector />
        </div>
      </div>

      
        {/* 次へボタン */}
        <div className="mt-4">
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => navigateTo("next")}
        >
          →
        </button>
      </div>

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={navigateTo} />
    </div>
  );
};

export default ShioriPage1;
