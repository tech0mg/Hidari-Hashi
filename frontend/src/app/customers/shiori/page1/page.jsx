"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

// アイコンのインポート修正
import RightArrowIcon from "../../../components/icon/icon_arrow_right";
import LeftArrowIcon from "../../../components/icon/icon_arrow_left";

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
    } else if (destination === "prev") {
      router.push("/customers/shiori/page1");
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
    <div id="page1" className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center w-full">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* 上部コンテンツラッパー */}
      <div className="relative flex items-center justify-center mt-8 w-full max-w-3xl mx-auto">


        {/* 上部コンテンツ */}
        <div className="border-8 border-[#da7997] rounded-sm p-6 bg-white shadow-lg w-full max-w-xl">
          <h1 className="text-3xl font-bold mb-4 text-center text-gray-600">しおり</h1>
          <p className="text-lg text-center mb-2 text-gray-600">Produced by</p>
          <p className="text-xl text-center font-semibold text-gray-600">りな</p>

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
                src={`${apiUrl}${selectedIllustration}`}
                alt="Selected Illustration"
                className="w-32 h-32 object-contain mx-auto border border-gray-300 rounded-lg"
              />
            </div>
          )}
        </div>

        {/* 右矢印ボタン */}
        <button
          className="absolute right-0 top-1/2 transform -translate-y-1/2 p-2"
          onClick={() => handleNavigation("next")}
        >
          <RightArrowIcon size={24} />
        </button>
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
            <h2 className="text-xl font-bold mb-5 text-center">色をえらぶ</h2>
            <div className="grid grid-cols-3 gap-4">
              {[
                "#da7997",
                "#E37E88",
                "#C2AAC5",
                "#5F72D1",
                "#389D63",
                "#63C0C3",
                "#EFB97B",
                "#E4E872",
                "#9A877A",
              ].map((colorOption, index) => (
                <button
                  key={index}
                  className={`p-4 rounded-full`}
                  style={{ backgroundColor: colorOption }}
                  onClick={() => changeColor(colorOption)}
                >
                  {/* 色の名前は表示しません */}
                </button>
              ))}
            </div>
            <button
              className="mt-7 p-2 bg-gray-400 text-white rounded-md"
              onClick={toggleColorModal}
            >
              とじる
            </button>
          </div>
        </div>
      )}

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={handleNavigation} />
    </div>
  );
};

export default ShioriPage;
