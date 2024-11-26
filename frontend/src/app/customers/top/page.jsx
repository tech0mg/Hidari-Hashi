"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);

  const goToList = () => {
    router.push('/customers/list'); // リストページに遷移
  };

  useEffect(() => {
    fetch("http://127.0.0.1:5000/api/images")
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setImages(data.images))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-white">
      {/* ヘッダー */}
      <header className="w-full flex justify-between items-center p-4">
        <div className="flex items-center">
          <span className="text-xl font-bold">Sample★Sample★Sample★</span>
        </div>
        <div>
          <button className="text-gray-500">MENU</button>
        </div>
      </header>

      {/* コンテンツ */}
      <main className="flex flex-col items-center justify-center flex-grow">
        {/* ナビゲーションとメインイメージ */}
        <div className="flex items-center">
          {/* 戻るボタン */}
          <button className="p-2 bg-gray-100 rounded-full shadow-md">
            <span className="text-purple-500">←</span>
          </button>
          
          {/* メインイメージ */}
          <div className="image-grid grid grid-cols-3 gap-4">
        {images.map((src, index) => (
          <div 
            key={index} 
            className="image-card relative group overflow-hidden rounded-lg shadow-lg"
            onClick={() => handleClick(src)} // 画面遷移を実行
          >
            <img
              src={`http://127.0.0.1:5000${src}`}
              alt={`Image ${index + 1}`}
              className="w-full h-full object-cover transition-transform transform hover:scale-105"
            />
            <div className="like-button absolute top-2 right-2 bg-white p-2 rounded-full shadow-md">
              <button className="text-pink-500 hover:text-pink-700">♥</button>
            </div>
          </div>
        ))}
      </div>

          {/* 進むボタン */}
          <button className="p-2 bg-gray-100 rounded-full shadow-md">
            <span className="text-purple-500">→</span>
          </button>
        </div>

        {/* ボトムボタン */}
        <div className="mt-8 grid grid-cols-4 gap-4">
          <button className="flex flex-col items-center">
            <div className="w-10 h-10 bg-green-200 rounded-full flex items-center justify-center">
              📖
            </div>
            <span className="text-sm mt-2">しおりを作る</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-10 h-10 bg-red-200 rounded-full flex items-center justify-center">
              ❌
            </div>
            <span className="text-sm mt-2">いかない</span>
          </button>
          <button className="flex flex-col items-center">
            <div className="w-10 h-10 bg-pink-200 rounded-full flex items-center justify-center">
              ❤️
            </div>
            <span className="text-sm mt-2">いきたい</span>
          </button>
          <button className="flex flex-col items-center"onClick={goToList}>
            <div className="w-10 h-10 bg-yellow-200 rounded-full flex items-center justify-center">
              ⭐
            </div>
            <span className="text-sm mt-2">リストを見る</span>
          </button>
        </div>
      </main>
    </div>
  );
};

export default App;