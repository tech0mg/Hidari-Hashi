"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

const ShioriPage3 = () => {
  const router = useRouter();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [address, setAddress] = useState(""); // ユーザーが入力した住所
  const [weatherData, setWeatherData] = useState(null); // 天気データの状態管理
  const [loading, setLoading] = useState(false); // ローディング状態
  const apiUrl = process.env.NEXT_PUBLIC_API_URL; // APIのベースURL

  // ページ移動処理
  const handleNavigation = (destination) => {
    if (destination === "next") {
      router.push("/customers/shiori/page4");
    } else if (destination === "prev") {
      router.push("/customers/shiori/page2");
    } else if (destination === "list-detail") {
      router.push("/customers/list/list-detail");
    } else if (destination === "list") {
      router.push("/customers/list");
    }
  };

  // 郵便番号と天気情報を取得
  const fetchPostalCodeAndWeather = async () => {
    if (!address) {
      alert("住所を入力してください");
      return;
    }

    setLoading(true);

    try {
      // 郵便番号を取得
      const postalResponse = await fetch(`${apiUrl}/api/postal-code?address=${encodeURIComponent(address)}`);
      if (!postalResponse.ok) {
        throw new Error("郵便番号取得に失敗しました");
      }
      const postalData = await postalResponse.json();
      const postalCode = postalData.postalCode;

      // 郵便番号フォーマット修正
      const formattedPostalCode = postalCode.length === 7 ? `${postalCode.slice(0, 3)}-${postalCode.slice(3)}` : postalCode;

      // 天気情報を取得
      const weatherResponse = await fetch(`${apiUrl}/api/weather?postalCode=${postalCode}&countryCode=JP`);
      if (!weatherResponse.ok) {
        throw new Error("天気情報取得に失敗しました");
      }
      const weather = await weatherResponse.json();
      setWeatherData(weather);
    } catch (error) {
      console.error("エラー:", error);
      alert("天気情報の取得に失敗しました");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div id="page3" className={`flex flex-col items-center justify-between min-h-screen ${shioriColor}`}>
      {/* 上部コンテンツ */}
      <div className="flex flex-col items-center mt-8 w-full max-w-2xl">
        <div className="border-4 border-pink-500 rounded-md p-6 bg-white shadow-lg w-full">
          <h1 className="text-3xl font-bold mb-4 text-center">しおりpage3</h1>

          {/* 住所入力 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">住所入力</h2>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="例: 東京都新宿区"
              className="border-2 border-gray-300 p-2 w-full rounded-md mb-4"
            />
            <button
              onClick={fetchPostalCodeAndWeather}
              className="p-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "取得中..." : "天気予報を確認する"}
            </button>
          </div>

          {/* 天気予報 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">天気予報</h2>
            <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
              {loading ? (
                <p className="text-sm">天気情報を読み込んでいます...</p>
              ) : weatherData ? (
                <div>
                  <h2 className="text-lg font-bold mt-4">天気情報</h2>
                  <p className="text-sm">
                    <span className="font-bold">地域:</span> {weatherData.name || "データなし"}
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">気温:</span> {weatherData.main?.temp || "N/A"}°C
                  </p>
                  <p className="text-sm">
                    <span className="font-bold">天気:</span> {weatherData.weather[0]?.description || "N/A"}
                  </p>
                </div>
              ) : (
                <p className="text-sm">天気情報を取得できませんでした。</p>
              )}
            </div>
          </div>

          {/* 地図経路 */}
          <div>
            <h2 className="text-xl font-bold mb-4 text-center">地図経路</h2>
            <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3240.774308328819!2d139.69170601524733!3d35.68948738019181!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x60188c0b0a1a8e8d%3A0x60188c0b0a1a8e8d!2z44CSMTMxLTAwNDMg5p2x5Lqs6YO95paw5a6_5Yy65pyo6L6G5qOu44GV44KT44Go44GE44G-44Gn44GZ44Gf44O85YyX5rOJ5aSa5Yy65p2k55u05paw5biC!5e0!3m2!1sen!2sjp!4v1635784553877!5m2!1sen!2sjp"
                width="100%"
                height="250"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                className="rounded-lg shadow-md"
              ></iframe>
            </div>
          </div>
        </div>
      </div>

      {/* 戻るボタンと次へボタン */}
      <div className="mt-4 flex space-x-4">
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleNavigation("prev")}
        >
          ←
        </button>
        <button
          className="p-2 bg-gray-200 rounded-full shadow-md"
          onClick={() => handleNavigation("next")}
        >
          →
        </button>
      </div>

      {/* 下部ボタン */}
      <ShioriFooterButtons handleNavigation={handleNavigation} />
    </div>
  );
};

export default ShioriPage3;
