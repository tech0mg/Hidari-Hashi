"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン

const ShioriPage = () => {
  const router = useRouter();
  const [illustrations, setIllustrations] = useState([]);
  const [selectedIllustration, setSelectedIllustration] = useState("");

  useEffect(() => {
    // イラストのリストを取得
    fetch("http://127.0.0.1:5000/api/illustrations")
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

  return (
    <div className="flex flex-col items-center justify-between min-h-screen bg-gray-100">
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
          <div className="mt-4">
            <label
              htmlFor="illustration-select"
              className="block mb-2 text-sm font-medium text-gray-700"
            >
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
                src={`http://127.0.0.1:5000${selectedIllustration}`}
                alt="Selected Illustration"
                className="w-32 h-32 object-contain mx-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
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
