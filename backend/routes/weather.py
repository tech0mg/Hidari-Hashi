from flask import Blueprint, request, jsonify
import requests

# Blueprintの作成
weather_bp = Blueprint("weather", __name__, url_prefix="/api/weather")

# 天気情報取得のエンドポイント
@weather_bp.route("/", methods=["GET"])
def get_weather():
    """
    天気情報を取得するエンドポイント。
    必要なパラメータ：
        - city: 天気情報を取得する都市名 (例: Tokyo)
    """
    city = request.args.get("city")
    if not city:
        return jsonify({"error": "City parameter is required"}), 400

    # 例としてOpenWeatherMap APIを利用 (APIキーが必要)
    api_key = "your_openweathermap_api_key"  # OpenWeatherMapのAPIキーを設定（置き換え必要）環境変数や設定ファイルから読み込むように変更
    api_url = f"http://api.openweathermap.org/data/2.5/weather?q={city}&appid={api_key}&units=metric"

    try:
        response = requests.get(api_url)
        response.raise_for_status()  # ステータスコードがエラーの場合は例外をスロー

        # レスポンスをJSON形式で返す
        weather_data = response.json()
        return jsonify({
            "city": weather_data.get("name"),
            "temperature": weather_data["main"].get("temp"),
            "weather": weather_data["weather"][0].get("description"),
            "wind_speed": weather_data["wind"].get("speed"),
        }), 200
    except requests.exceptions.RequestException as e:
        return jsonify({"error": f"Failed to fetch weather data: {str(e)}"}), 500
