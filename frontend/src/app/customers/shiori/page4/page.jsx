"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import LeftArrowIcon from "../../../components/icon/icon_arrow_left"; // 左矢印アイコン
import RightArrowIcon from "../../../components/icon/icon_arrow_right"; // 右矢印アイコン

const ShioriPage4 = () => {
  const router = useRouter();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [items, setItems] = useState(["", "", "", "", "", ""]); // 持ち物リスト初期値
  const [memory, setMemory] = useState(""); // 思い出の記録初期値

  // ページ遷移ハンドラー
  const handleNavigation = (destination) => {
    if (destination === "prev") {
      router.push("/customers/shiori/page3");
    } else if (destination === "next") {
      router.push("/customers/shiori/page5");
    } else if (destination === "list-detail") {
      router.push("/customers/list/list-detail");
    } else if (destination === "list") {
      router.push("/customers/list");
    }
  };

  const updateItem = (index, value) => {
    const updatedItems = [...items];
    updatedItems[index] = value;
    setItems(updatedItems);
  };

  return (
    <div id="page4" className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
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
            {/* 持ち物リストセクション */}
            <div className="mb-4">
              <h2 className="text-xl font-bold text-center mb-4 text-gray-600">持ち物リスト</h2>
              <div className="grid grid-cols-2 gap-4 text-gray-600">
                {items.map((item, index) => (
                  <input
                    key={index}
                    type="text"
                    value={item}
                    onChange={(e) => updateItem(index, e.target.value)}
                    placeholder={`持ち物 ${index + 1}`}
                    className="p-2 border border-gray-300 rounded shadow-sm w-full"
                  />
                ))}
              </div>
            </div>

            {/* 思い出の記録セクション */}
            <div>
              <h2 className="text-xl font-bold text-center mb-4 text-gray-600">思い出の記録</h2>
              <textarea
                value={memory}
                onChange={(e) => setMemory(e.target.value)}
                rows={5}
                className="p-2 border border-gray-300 rounded shadow-sm w-full"
              ></textarea>
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

export default ShioriPage4;
