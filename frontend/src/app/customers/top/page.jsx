import React from 'react';

const App = () => {
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
          <div className="mx-4">
            <img
              src="https://via.placeholder.com/300x200" // 仮の画像URL
              alt="Main content"
              className="rounded-lg shadow-lg"
            />
            <p className="text-center mt-2">イースターエッグづくり体験</p>
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
          <button className="flex flex-col items-center">
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
