"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons";//下部の共通ボタン

const ShioriPage = () => {
  const router = useRouter();

  const handleNavigation = (destination) => {
    if (destination === "next") {
      router.push("/customers/shiori/page2");
    } else if (destination === "list-detail") {
      router.push("/customers/list/list-detail");
    } else if (destination === "list") {
        router.push("/customers/list");
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
      {/* 上部コンテンツ */}
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">しおりpage1</h1>
          <p className="text-lg text-center mb-2">Produced by</p>
          <p className="text-xl text-center font-semibold">りな</p>
        </div>
      </div>

        {/* 次へボタン */}
        <div className="mt-4">
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleNavigation("next")}
        >
          →
        </button>
      </div>

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={handleNavigation} />
    </div>
  );
};

export default ShioriPage;
