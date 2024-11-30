"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

const ShioriPage4 = () => {
  const router = useRouter();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [items, setItems] = useState(["", "", "", "", "", ""]); // 持ち物リスト初期値
  const [memory, setMemory] = useState(""); // 思い出の記録初期値

  const handleNavigation = (destination) => {
    if (destination === "prev") {
      router.push("/customers/shiori/page3"); // 前のページへのリンク
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
      {/* 上部コンテンツ */}
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">しおり Page 4</h1>

          {/* 持ち物リスト */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center mb-4">持ち物リスト</h2>
            <div className="grid grid-cols-2 gap-4">
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

          {/* 思い出の記録 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center mb-4">思い出の記録</h2>
            <textarea
              value={memory}
              onChange={(e) => setMemory(e.target.value)}
              placeholder="ここに思い出を書いてください..."
              rows={5}
              className="p-2 border border-gray-300 rounded shadow-sm w-full"
            ></textarea>
          </div>
        </div>
      </div>

      {/* 戻るボタン */}
      <div className="mt-4 flex space-x-4">
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleNavigation("prev")}
        >
          ←
        </button>
        {/* 次へボタン */}
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

export default ShioriPage4;
