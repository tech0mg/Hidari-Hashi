const RouteInfo = ({ isLoading, data }) => (
    <div className="mb-6">
      <h2 className="text-xl font-bold mb-4 text-center">経路情報</h2>
      <div className="border-2 border-gray-300 p-4 rounded-lg bg-gray-50">
        {isLoading ? (
          <p className="text-sm">経路情報を読み込んでいます...</p>
        ) : data ? (
          <pre className="text-sm">{JSON.stringify(data, null, 2)}</pre>
        ) : (
          <p className="text-sm">経路情報を取得できませんでした。</p>
        )}
      </div>
    </div>
  );
  
export default RouteInfo;