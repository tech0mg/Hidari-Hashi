"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import ShioriFooterButtons from "../components/ShioriFooterButtons"; // 下部の共通ボタン
import { useColor } from "../../../context/ColorContext"; // ColorContextのインポート

const ShioriPage3 = () => {
  const router = useRouter();
  const { shioriColor } = useColor(); // Contextから色を取得
  const [startAddress, setStartAddress] = useState(""); // 出発地
  const [address, setAddress] = useState(""); // 目的地
  const [weatherData, setWeatherData] = useState(null); // 天気データの状態管理
  const [routeData, setRouteData] = useState(null); // 経路データの状態管理
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

  // 経路を取得する関数
  const fetchRoute = async () => {
    if (!startAddress || !address) {
      alert("出発地と目的地を入力してください");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        `${apiUrl}/api/route?start=${encodeURIComponent(startAddress)}&destination=${encodeURIComponent(address)}`
      );
      if (!response.ok) {
        throw new Error("経路の取得に失敗しました");
      }
      const data = await response.json();
      setRouteData(data);
    } catch (error) {
      console.error("エラー:", error);
      alert("経路情報の取得に失敗しました");
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

          {/* 出発地入力 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">出発地</h2>
            <input
              type="text"
              value={startAddress}
              onChange={(e) => setStartAddress(e.target.value)}
              placeholder="例: 東京都新宿区 (出発地)"
              className="border-2 border-gray-300 p-2 w-full rounded-md mb-4"
            />
          </div>

          {/* 目的地入力 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">目的地入力</h2>
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
              {loading ? "取得中..." : "目的地の天気予報と経路を確認する"}
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

          {/* 経路情報 */}
          <div className="mb-6">
            <h2 className="text-xl font-bold mb-4 text-center">経路情報</h2>
            <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
              {loading ? (
                <p className="text-sm">経路情報を読み込んでいます...</p>
              ) : routeData ? (
                <div>
                  <h2 className="text-lg font-bold mt-4">経路詳細</h2>
                  <pre className="text-sm">{JSON.stringify(routeData, null, 2)}</pre>
                </div>
              ) : (
                <p className="text-sm">経路情報を取得できませんでした。</p>
              )}
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
