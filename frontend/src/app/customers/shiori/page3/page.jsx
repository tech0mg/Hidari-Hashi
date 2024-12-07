"use client";
import React from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン

const ShioriPage3 = () => {
  const router = useRouter();
  const { shioriColor } = useColor(); // Contextから色を取得

  // ページ遷移ハンドラー
  const handleNavigation = (destination) => {
    if (destination === "next") {
      router.push("/customers/shiori/page4");
    } else if (destination === "prev") {
      router.push("/customers/shiori/page2");
    } else if (destination === "list-detail") {
      router.push("/customers/list/list-detail");
    } else if (destination === "list") {
      router.push("/customers/list");
    }
  };

  return (
    <div id="page3" className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>      
      {/* 上部コンテンツ（ラッパー + 矢印アイコンの配置） */}
      <div className="relative flex justify-center items-center w-full h-[calc(100vh-100px)]">
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 border-[#da7997] rounded-md"
          style={{
            aspectRatio: "210 / 297", // A4の比率
            height: "70%", // 高さを親要素に合わせる
            maxWidth: "calc(100vh * 210 / 297)", // 幅を高さに合わせてA4比率を維持
          }}
        >
          <div className="p-6 w-full h-full flex flex-col justify-between">
            {/* 天気予報セクション */}
            <div className="mb-4"> {/* 余白を減らしました */}
              <h2 className="text-xl font-bold mb-3 text-center text-gray-600">天気予報</h2>
              <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50 w-full">
                <p className="text-sm text-gray-600">
                  <span className="font-bold">現在の天気：</span> 晴れ
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">気温：</span> 25°C
                </p>
                <p className="text-sm text-gray-600">
                  <span className="font-bold">降水確率：</span> 10%
                </p>
              </div>
            </div>

            {/* 地図セクション */}
            <div>
              <h2 className="text-xl font-bold mb-3 text-center text-gray-600">地図経路</h2>
              <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50 w-full">
                <iframe
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.774308328819!2d139.69170601524733!3d35.68948738019181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0b0a1a8e8d%3A0x60188c0b0a1a8e8d!2z44CSMTMxLTAwNDMg5p2x5Lqs6YO95paw5a6_5Yy65pyo6L6G5qOu44GV44KT44Go44GE44G-44Gn44GZ44Gf44O85YyX5rOJ5aSa5Yy65p2k55u05paw5biC!5e0!3m2!1sen!2sjp!4v1635784553877!5m2!1sen!2sjp"
                  width="100%"
                  height="200"
                  style={{ border: 0 }}
                  allowFullScreen=""
                  loading="lazy"
                  className="rounded-lg shadow-md"
                ></iframe>
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
      </div>

      {/* 下部ボタンセクション */}
      <ShioriFooterButtons handleNavigation={handleNavigation} />
    </div>
  );
};

export default ShioriPage3;
