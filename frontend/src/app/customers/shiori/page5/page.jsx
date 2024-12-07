"use client";
import React, { useState, useEffect } from "react";
import { useNavigation } from "../components/useNavigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons";
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート
import PhotoUpload from "../components/PhotoUpload";
import PhotoGallery from "../components/PhotoGallery";

const ShioriPage5 = () => {
  const { navigateTo } = useNavigation();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { shioriColor } = useColor(); // Contextから色を取得
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [errorMessage, setErrorMessage] = useState(null); // エラー表示用


  // 写真を取得
  useEffect(() => {
    const fetchPhotos = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/photos`);
        if (!response.ok) {
          throw new Error("Failed to fetch photos");
        }
        const data = await response.json();
        setUploadedPhotos(data.photos);
      } catch (error) {
        console.error("Error fetching photos:", error);
        setErrorMessage("写真の取得に失敗しました。");
      }
    };

    fetchPhotos();
  }, [apiUrl]);

  // 写真アップロード時の処理
  const handleUploadSuccess = (newPhoto) => {
    setUploadedPhotos((prevPhotos) => [...prevPhotos, newPhoto]);
  };


  return (
    <div 
    id="page5" 
    className="flex flex-col items-center justify-between min-h-screen"
    style={{ backgroundColor: shioriColor }}
    >
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">しおり Page 5</h1>

          {/* エラーメッセージ */}
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
              {errorMessage}
            </div>
          )}

          {/* 写真アップロード */}
          <PhotoUpload
            apiUrl={apiUrl}
            onUploadSuccess={handleUploadSuccess}
            onError={(error) => setErrorMessage(error.message)}
          />
 
          {/* アップロード済みの写真 */}
          <PhotoGallery photos={uploadedPhotos} apiUrl={apiUrl} />
        </div>
      </div>

      {/* 戻るボタン */}
      <div className="mt-4 flex space-x-4">
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => navigateTo("prev")}
        >
          ←
        </button>
      </div>

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={navigateTo} />
    </div>
  );
};

export default ShioriPage5;
