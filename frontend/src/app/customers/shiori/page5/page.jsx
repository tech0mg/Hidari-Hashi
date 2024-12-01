"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons";
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

const ShioriPage5 = () => {
  const router = useRouter();
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;
  const { shioriColor } = useColor(); // Contextから色を取得
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [uploadedPhotos, setUploadedPhotos] = useState([]);
  const [modalPhoto, setModalPhoto] = useState(null); // モーダルで表示する画像
  const [isModalOpen, setIsModalOpen] = useState(false); // モーダルの表示状態
  const [errorMessage, setErrorMessage] = useState(null); // エラー表示用


  // 既存のアップロードされた写真を取得
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
      }
    };

    fetchPhotos();
  }, []);

  const handleNavigation = (destination) => {
    if (destination === "prev") {
      router.push("/customers/shiori/page4");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    setPreviewUrl(URL.createObjectURL(file)); // サムネイルのためのURLを生成
    setErrorMessage(null); // エラーメッセージをリセット
};

  const handleFileUpload = async () => {
    if (!selectedFile) {
      alert("ファイルを選択してください");
      return;
    }

    const formData = new FormData();
    formData.append("photo", selectedFile);

    try {
        const response = await fetch(`${apiUrl}/api/upload-photo`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) {
          throw new Error("アップロードに失敗しました");
        }
  
        const data = await response.json();

        // アップロードした写真をステートに即時追加
        setUploadedPhotos((prevPhotos) => [...prevPhotos, data.file_path]);
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error uploading photo:", error);
        setErrorMessage("アップロードに失敗しました。もう一度お試しください。");
    }
    };
  

  // モーダルを開く
  const openModal = (photo) => {
    setModalPhoto(photo);
    setIsModalOpen(true);
  };

  // モーダルを閉じる
  const closeModal = () => {
    setIsModalOpen(false);
    setModalPhoto(null);
  };    

  return (
    <div id="page5" className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
      <div className="flex flex-col items-center mt-8">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg w-full max-w-2xl">
          <h1 className="text-3xl font-bold mb-6 text-center">しおり Page 5</h1>

          {/* エラーメッセージ */}
          {errorMessage && (
            <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
              {errorMessage}
            </div>
          )}

          {/* ファイルアップロード */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center mb-4">思い出の写真をアップロード</h2>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
            />
            {/* サムネイル表示 */}
            {previewUrl && (
              <div className="mb-4">
                <img
                  src={previewUrl}
                  alt="Preview"
                  className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
                />
              </div>
            )}            
            <button
              onClick={handleFileUpload}
              className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              アップロード
            </button>
          </div>

          {/* アップロード済みの写真表示 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold text-center mb-4">アップロード済みの写真</h2>
            <div className="grid grid-cols-3 gap-4">
              {uploadedPhotos.map((photo, index) => (
                <img
                  key={index}
                  src={`${apiUrl}${photo}`}
                  alt={`Uploaded ${index + 1}`}
                  className="w-32 h-32 object-cover rounded-lg shadow-md cursor-pointer"
                  onClick={() => openModal(`${apiUrl}${photo}`)} // クリック時にモーダルを開く
                />
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* モーダル */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 shadow-lg max-w-3xl">
            <img src={modalPhoto} alt="Modal" className="w-full h-auto max-h-[80vh] object-contain rounded-lg" />
            <button
              onClick={closeModal}
              className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 mx-auto block"
            >
              閉じる
            </button>
          </div>
        </div>
      )}

      {/* 戻るボタン */}
      <div className="mt-4 flex space-x-4">
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleNavigation("prev")}
        >
          ←
        </button>
      </div>

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={handleNavigation} />
    </div>
  );
};

export default ShioriPage5;
