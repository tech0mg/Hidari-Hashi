"use client";
import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

const App = () => {
  const router = useRouter();
  const [images, setImages] = useState([]);

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

  const goToList = () => {
    router.push('/customers/list'); // リストページに遷移
  };

  return (
    <div className="flex flex-col h-screen bg-gray-100">
      {/* ヘッダー */}
      <header className="bg-white shadow-md p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold">Web & Mobile App</h1>
        <button
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          onClick={goToList}
        >
          Go to List
        </button>
      </header>

      {/* メインコンテンツ */}
      <main className="flex-grow p-4">
        {/* <div className="bg-blue-500 text-white p-4 rounded">
          Tailwindが正常に動いています！
        </div> */}
        <div className="hidden md:flex flex-wrap gap-4 justify-center">
          {images.map((src, index) => (
            <div key={index} className="w-1/4 p-2">
              <img
                src={`http://127.0.0.1:5000${src}`}
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
                src={`http://127.0.0.1:5000${src}`}
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
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* フッター */}
      <footer className="bg-white shadow-inner p-4 flex justify-around">
        <button className="text-center">
          <span className="block text-lg">📖</span>
          <span className="text-sm">Create Bookmark</span>
        </button>
        <button className="text-center">
          <span className="block text-lg">⭐</span>
          <span className="text-sm">リストをみる</span>
        </button>
        <button className="text-center">
          <span className="block text-lg">📂</span>
          <span className="text-sm">きろくをみる</span>
        </button>
      </footer>
    </div>
  );
};



export default App;
