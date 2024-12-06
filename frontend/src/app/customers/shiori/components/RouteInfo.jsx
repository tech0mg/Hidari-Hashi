import React from "react";
import MapComponent from "./MapComponent";

const RouteInfo = ({ isLoading, data, error }) => (
  <div className="mb-6">
    <h2 className="text-xl font-bold mb-4 text-center">経路情報</h2>
    <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
      {isLoading ? (
        <p className="text-sm">経路情報を読み込んでいます...</p>
      ) : error ? (
        <p className="text-sm text-red-500">エラーが発生しました: {error.message || "詳細不明なエラー"}</p>
      ) :  data && data.length > 0 ? (
        <MapComponent path={data} />
      ) : (
        <p className="text-sm">経路情報を取得できませんでした。</p>
      )}
    </div>
  </div>
);

export default RouteInfo;
