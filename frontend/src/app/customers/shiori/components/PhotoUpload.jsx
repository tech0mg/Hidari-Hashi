import React, { useState } from "react";

const PhotoUpload = ({ apiUrl, onUploadSuccess, onError }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [previewUrl, setPreviewUrl] = useState(null);

  
    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      setPreviewUrl(URL.createObjectURL(file));
    };
  
    const handleFileUpload = async () => {
      if (!selectedFile) {
        onError(new Error("ファイルを選択してください"));
        return;
      }
  
      const formData = new FormData();
      formData.append("photo", selectedFile);
  
      try {
        const response = await fetch(`${apiUrl}/api/upload-photo`, {
          method: "POST",
          body: formData,
        });
  
        if (!response.ok) throw new Error("アップロードに失敗しました");
  
        const data = await response.json();
        onUploadSuccess(data.file_path); // 親コンポーネントに通知
        setSelectedFile(null);
        setPreviewUrl(null);
      } catch (error) {
        console.error("Error uploading photo:", error);
        onError(error);
      }
    };
  
    return (
      <div className="mb-6">
        <h2 className="text-xl font-bold text-center mb-4">思い出の写真をアップロード</h2>
        
        {/* ファイル選択 */}
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
        />

        {/* サムネイル表示 */}
        {previewUrl && (
          <div className="mt-4">
            <img
              src={previewUrl}
              alt="Preview"
              className="w-32 h-32 object-cover rounded-lg shadow-md mx-auto"
            />
          </div>
        )}

        {/* アップロードボタン */}
        <button
          onClick={handleFileUpload}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
        >
          アップロード
        </button>
      </div>
    );
  };
  
  export default PhotoUpload;
  