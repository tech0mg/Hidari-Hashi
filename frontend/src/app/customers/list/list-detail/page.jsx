"use client";
import { useSearchParams, useRouter } from "next/navigation";

const ListDetail = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const image = searchParams.get("image");

  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  const handleBookmark = () => {
    router.push("/customers/shiori/page1");
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
          {/* 親コンテナ */}
          <div className="mb-4 w-full max-w-xl">
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" , maxWidth: "500px", margin: "0 auto" }}>
              <img
                src={`${apiUrl}${image}`}
                alt="Selected Image"
                className="absolute inset-0 w-full h-full object-contain rounded-lg shadow-lg"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  margin: "auto",
                }}    
              />
            </div>
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