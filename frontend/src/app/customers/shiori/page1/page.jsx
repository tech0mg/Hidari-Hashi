"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

// アイコンのインポート修正
import RightArrowIcon from "../../../components/icon/icon_arrow_right";

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
    <div id="page1" className={`flex flex-col min-h-screen ${shioriColor}`}>
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow bg-gradient-main flex justify-center items-center">
        {/* コンテンツ全体のラッパー */}
        <div
          className="relative bg-white shadow-lg border-8 border-[#da7997] rounded-md"
          style={{
            aspectRatio: "210 / 297", // A4の比率
            height: "70%", // 高さを親要素に合わせる
            maxWidth: "calc(100vh * 210 / 297)", // 幅を高さに合わせてA4比率を維持
          }}
        >
          <div className="p-12 w-full h-full flex flex-col justify-between">
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

          {/* 次へボタン（右矢印） */}
          <div className="absolute top-1/2 -right-10 transform -translate-y-1/2">
            <button onClick={() => handleNavigation("next")}>
              <RightArrowIcon size={24} />
            </button>
          </div>
        </div>
      </main>

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

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner">
        <ShioriFooterButtons handleNavigation={handleNavigation} toggleColorModal={toggleColorModal} />
      </footer>
    </div>
  );
};

export default ShioriPage;
