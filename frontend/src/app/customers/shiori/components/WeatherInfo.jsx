const WeatherInfo = ({ isLoading, data }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-center">天気予報</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
        {isLoading ? (
          <p className="text-sm">天気情報を読み込んでいます...</p>
        ) : data ? (
          <div>
            <p className="text-sm"><strong>地域:</strong> {data.name || "データなし"}</p>
            <p className="text-sm"><strong>気温:</strong> {data.main?.temp || "N/A"}°C</p>
            <p className="text-sm"><strong>天気:</strong> {data.weather[0]?.description || "N/A"}</p>
          </div>
        ) : (
          <p className="text-sm">天気情報を取得できませんでした。</p>
        )}
      </div>
    </div>
  );
  
export default WeatherInfo;