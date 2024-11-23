"use client";
import { useSearchParams } from "next/navigation";

const ListDetail = () => {
  const searchParams = useSearchParams();
  const image = searchParams.get("image");

  const handleBookmark = () => {
    alert("しおりをみるボタンが押されました");
  };

  const handleMore = () => {
    alert("もっとみるボタンが押されました");
  };

  const handleRemove = () => {
    alert("リストから外すボタンが押されました");
  };



  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4 text-center">Image Detail</h1>
      {image ? (
        <div className="flex flex-col items-center">
          <div className="mb-4">
            <img
              src={`http://127.0.0.1:5000${image}`}
              alt="Selected Image"
              className="rounded-lg shadow-lg max-w-full"
            />
          </div>
          <div className="flex space-x-4 mt-4">
            <button
              onClick={handleBookmark}
              className="bg-green-500 text-white px-4 py-2 rounded shadow hover:bg-green-600"
            >
              しおりをみる
            </button>
            <button
              onClick={handleMore}
              className="bg-gray-500 text-white px-4 py-2 rounded shadow hover:bg-gray-600"
            >
              もっとみる
            </button>
            <button
              onClick={handleRemove}
              className="bg-blue-500 text-white px-4 py-2 rounded shadow hover:bg-blue-600"
            >
              リストから外す
            </button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500 text-center">画像が選択されていません。</p>
      )}
    </div>
  );
};

export default ListDetail;