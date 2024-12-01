"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
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
    router.push("/customers/list"); // リストページに遷移
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}


      <header className="bg-[#ECE9E6] shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-[#9A877A]">Kid's Compass</h1>
        {/* <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={goToList}
        >
          Go to List
        </button> */}
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow p-4 bg-gradient-main">
        <div className="hidden md:flex flex-wrap gap-4 justify-center">
          {images.map((src, index) => (
            <div key={index} className="w-1/4 p-2">
              <img
                src={`${apiUrl}${src}`}
                alt={`Image ${index + 1}`}
                className="w-full h-full object-cover rounded-lg shadow-md"
              />
            </div>
          ))}
        </div>
        <div className="block md:hidden">
          {images.map((src, index) => (
            <div key={index} className="mb-4">
              <img
                src={`${apiUrl}${src}`}
                alt={`Image ${index + 1}`}
                className="w-full h-64 object-cover rounded-lg shadow-md"
              />
              <div className="flex justify-around mt-2">
                <button className="px-4 py-2 bg-red-500 text-white rounded-full shadow-md hover:bg-red-600">
                  Dislike
                </button>
                <button className="px-4 py-2 bg-green-500 text-white rounded-full shadow-md hover:bg-green-600">
                  Like
                </button>
                {/* StarIconをここに追加 */}
                <StarIcon size={30} fill="gold" className="mx-2" />
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-[#EDEAE7] shadow-inner p-4 flex justify-center items-center space-x-8">
        <button className="flex flex-col items-center justify-center">
          <ShioriIcon size={24} className="mx-2" />
          <span className="text-sm">しおりをつくる</span>
        </button>

        <button className="flex flex-col items-center justify-center">
          <StarIcon size={24} className="mx-2" />
          <span className="text-sm">リストをみる</span>
        </button>

        <button className="flex flex-col items-center justify-center">
          <KirokuIcon size={24} className="mx-2" />
          <span className="text-sm">きろくをみる</span>
        </button>
      </footer>
    </div>
  );
};

export default App;
