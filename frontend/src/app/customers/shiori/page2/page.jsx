"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン

const ShioriPage2 = () => {
  const router = useRouter();
  const { shioriColor } = useColor(); // Contextから色を取得

  const handleNavigation = (destination) => {
    if (destination === "next") {
      router.push("/customers/shiori/page3");
    } else if (destination === "prev") {
      router.push("/customers/shiori/page1");
    } else if (destination === "list-detail") {
      router.push("/customers/list/list-detail");
    } else if (destination === "list") {
      router.push("/customers/list");
    }
  };

  return (
    <div id="page2" className={`flex flex-col min-h-screen ${shioriColor}`}>
    {/* ヘッダー */}
    <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
    </header>

      {/* メインコンテンツ */}
      <main
        className="flex-grow bg-gradient-main flex justify-center items-center"
      >
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 border-[#da7997] rounded-md"
          style={{
            aspectRatio: "210 / 297", // A4の比率
            height: "calc(100vh - 96px)", // ヘッダーとフッターの高さを引いた高さ
            maxWidth: "calc((100vh - 96px) * 210 / 297)", // 幅を高さに合わせてA4比率を維持
          }}
        >
          <div className="p-8 w-full h-full flex flex-col justify-between">
            {/* スケジュールセクション */}
            <div className="mb-4">
              <h3 className="text-lg font-bold text-center mb-4 text-gray-600">スケジュール</h3>
              <div className="border-t-2 border-b-2 border-gray-300 py-4 px-6 text-left text-sm text-gray-600">
                <p className="text-xs">9:00 出発</p>
                <p className="text-xs">9:29 香椎駅</p>
                <p className="text-xs">9:45 海ノ中道駅</p>
                <p className="text-xs">9:52 マリンワールド海の中道</p>
                <p className="text-xs">...</p>
                <p className="text-xs">13:00 マリンワールド海の中道 出発</p>
                <p className="text-xs">13:15 海ノ中道駅</p>
                <p className="text-xs">13:35 香椎駅</p>
                <p className="text-xs">13:50 帰宅</p>
              </div>
            </div>

            {/* 目的地セクション */}
            <div>
              <h3 className="text-lg font-bold text-center mb-2 text-gray-600">目的地</h3>
              <div className="border-t-2 border-b-2 border-gray-300 py-4 px-6 text-left text-sm text-gray-600">
                <h3 className="font-bold mb-2 text-gray-600">マリンワールド海の中道</h3>
                <p className="text-xs">
                  マリンワールドは、福岡にある大きな水族館です。ここでは海の中を探検しているかのような気分になれるエキサイティングなスポットがたくさんあります！
                  サメやクラゲを見られる大水槽をはじめ、イルカやアシカのショーも大人気です。大自然が広がる中で、海のふしぎをいっぱい楽しめるよ！
                </p>
              </div>
            </div>
          </div>

          {/* 戻るボタン（左矢印） */}
          <div className="absolute top-1/2 -left-10 transform -translate-y-1/2">
            <button onClick={() => handleNavigation("prev")}>
              <LeftArrowIcon size={24} />
            </button>
          </div>

          {/* 次へボタン（右矢印） */}
          <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
            <button onClick={() => handleNavigation("next")}>
              <RightArrowIcon size={24} />
            </button>
          </div>
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner p-2 fixed bottom-0 w-full z-50">
        <ShioriFooterButtons handleNavigation={handleNavigation} />
      </footer>
    </div>
  );
};

export default ShioriPage2;
