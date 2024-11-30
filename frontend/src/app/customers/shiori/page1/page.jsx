"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons";//下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

const ShioriPage = () => {
  const router = useRouter();
  const [illustrations, setIllustrations] = useState([]);
  const [selectedIllustration, setSelectedIllustration] = useState("");
  const [isColorModalOpen, setIsColorModalOpen] = useState(false); // モーダル状態
  const { shioriColor, setColor } = useColor(); // Contextから色を取得

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    // イラストのリストを取得
    fetch(`${apiUrl}/api/illustrations`)
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to fetch illustrations.");
        }
        return response.json();
      })
      .then((data) => setIllustrations(data.illustrations))
      .catch((error) => console.error(error));
  }, []);


  const handleNavigation = (destination) => {
    if (destination === "next") {
      router.push("/customers/shiori/page2");
    } else if (destination === "list-detail") {
      router.push("/customers/list/list-detail");
    } else if (destination === "list") {
        router.push("/customers/list");
    }
  };

  const handleSelectChange = (event) => {
    setSelectedIllustration(event.target.value);
  };

   // 色変更モーダルの開閉
   const toggleColorModal = () => {
    setIsColorModalOpen(!isColorModalOpen);
  };

  // 色を選択してContextを更新
  const changeColor = (selectedColor) => {
    setColor(selectedColor); // Contextに色を設定
    setIsColorModalOpen(false); // モーダルを閉じる
  }; 

  return (
    <div className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
      {/* 上部コンテンツ */}
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg">
          <h1 className="text-3xl font-bold mb-4 text-center">しおりpage1</h1>
          <p className="text-lg text-center mb-2">Produced by</p>
          <p className="text-xl text-center font-semibold">りな</p>

          {/* イラスト選択プルダウン */}
          <div className="mt-4">
            <label htmlFor="illustration-select" className="block mb-2 text-sm font-medium text-gray-700">
              イラストを選択してください
            </label>
            <select
              id="illustration-select"
              value={selectedIllustration}
              onChange={handleSelectChange}
              className="block w-full p-2 border border-gray-300 rounded-lg shadow-sm"
            >
              <option value="">-- イラストを選択 --</option>
              {illustrations.map((item, index) => (
                <option key={index} value={item.url}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* 選択されたイラストのプレビュー */}
          {selectedIllustration && (
            <div className="mt-4">
              <img
                src={`${apiUrl}${selectedIllustration}`}
                alt="Selected Illustration"
                className="w-32 h-32 object-contain mx-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>
      </div>

      {/* モーダルの開閉ボタン */}
      <div className="mt-4">
        <button
          className="p-2 bg-blue-200 rounded-full shadow-md"
          onClick={toggleColorModal}
        >
          色を選ぶ
        </button>
      </div>

      {/* モーダル */}
      {isColorModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl font-bold mb-4 text-center">色を選択</h2>
            <div className="grid grid-cols-3 gap-4">
              {["bg-red-200", "bg-blue-200", "bg-green-200", "bg-yellow-200"].map(
                (colorOption, index) => (
                  <button
                    key={index}
                    className={`p-4 rounded-full ${colorOption}`}
                    onClick={() => changeColor(colorOption)}
                  >
                    {colorOption.replace("bg-", "").replace("-200", "")}
                  </button>
                )
              )}
            </div>
            <button
              className="mt-4 p-2 bg-gray-500 text-white rounded-md"
              onClick={toggleColorModal}
            >
              閉じる
            </button>
          </div>
        </div>
      )}

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
