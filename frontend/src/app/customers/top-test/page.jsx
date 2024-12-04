"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
// pages/index.jsx
import ImageSwiper from '../../components/ImageSwiper.jsx';
import StarIcon from "../../components/icon/icon_star"; // StarIconをインポート
import ShioriIcon from "../../components/icon/icon_shiori"; // ShioriIconをインポート
import KirokuIcon from "../../components/icon/icon_kiroku"; // KirokuIconをインポート


const App = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetch(`${apiUrl}/api/images`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        return response.json();
      })
      .then((data) => setImages(data.images))
      .catch((error) => console.error("Error fetching images:", error));
  }, []);

  const goToList = () => {
    router.push('/customers/list'); // リストページに遷移
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={goToList}
        >
          Go to List
        </button>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-1 p-4">
        {/* スワイプ機能 */}
        <div className="flex items-center justify-center bg-gray-100">
            <ImageSwiper />
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner p-4 flex justify-center items-center space-x-8">
        <button className="flex flex-col items-center justify-center">
          <ShioriIcon size={24} className="mx-2" />
          <span className="text-sm">しおりをつくる</span>
        </button>

        <button 
          className="flex flex-col items-center justify-center hover:bg-[#ADEAE8]"
          onClick={goToList}
        >
          <StarIcon size={24} className="mx-2" />
          <span className="text-sm">リストをみる</span>
        </button>

        <button 
          className="flex flex-col items-center justify-center"
        >
          <KirokuIcon size={24} className="mx-2" />
          <span className="text-sm">きろくをみる</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
