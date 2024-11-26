from flask import Blueprint, jsonify, request
import requests

# Blueprintの設定。Blueprint を使って weather のエンドポイントをモジュール化
weather_bp = Blueprint("weather", __name__)

# 天気情報を取得するエンドポイント
@weather_bp.route("/api/weather", methods=["GET"])
def get_weather():
    """
    指定された位置情報または都市名から天気情報を取得する。
    クエリパラメータ:
        - city (例: ?city=Tokyo)
        - lat (緯度) および lon (経度) (例: ?lat=35.6895&lon=139.6917)
    """
    api_key = "your_openweather_api_key"  # OpenWeatherMap APIキー
    base_url = "https://api.openweathermap.org/data/2.5/weather"

    # クエリパラメータの取得
    city = request.args.get("city")
    lat = request.args.get("lat")
    lon = request.args.get("lon")

    # パラメータを確認
    if city:
        params = {"q": city, "appid": api_key, "units": "metric", "lang": "ja"}
    elif lat and lon:
        params = {"lat": lat, "lon": lon, "appid": api_key, "units": "metric", "lang": "ja"}
    else:
        return jsonify({"error": "City name or coordinates (lat, lon) are required."}), 400

    # 天気情報を取得
    try:
        response = requests.get(base_url, params=params)
        response.raise_for_status()
        weather_data = response.json()
    except requests.exceptions.RequestException as e:
        return jsonify({"error": str(e)}), 500

    # 必要な情報を整理して返却
    result = {
        "city": weather_data.get("name"),
        "temperature": weather_data["main"].get("temp"),
        "weather": weather_data["weather"][0].get("description"),
        "icon": f"http://openweathermap.org/img/wn/{weather_data['weather'][0]['icon']}@2x.png",
        "humidity": weather_data["main"].get("humidity"),
        "wind_speed": weather_data["wind"].get("speed"),
    }
    return jsonify(result)
