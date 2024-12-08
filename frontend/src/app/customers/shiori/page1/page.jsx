"use client";
import React, { useState, useEffect } from "react";
import ShioriFooterButtons from "../components/ShioriFooterButtons";//下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import IllustrationSelector from "../components/IllustrationSelector";
import { useNavigation } from "../components/useNavigation";

const ShioriPage1 = () => {
  const { navigateTo } = useNavigation();
  const { shioriColor } = useColor();
  const [selectedIllustration, setSelectedIllustration] = useState("");

  useEffect(() => {
    const savedIllustration = localStorage.getItem("selectedIllustration");
    if (savedIllustration) {
      setSelectedIllustration(savedIllustration);
    }
  }, []);

  const handleIllustrationChange = (newIllustration) => {
    setSelectedIllustration(newIllustration);
    localStorage.setItem("selectedIllustration", newIllustration);
  };

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
          {/*  選択したイラストを表示 */}
          {selectedIllustration && (
            <img
              src={selectedIllustration}
              alt="Selected Illustration"
              className="mt-4 w-32 h-32 object-contain mx-auto border border-gray-300 rounded-lg"
            />
          )}
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
      <ShioriFooterButtons 
        handleNavigation={navigateTo} 
        onIllustrationChange={handleIllustrationChange}
      />
    </div>
  );
};

export default ShioriPage1;
