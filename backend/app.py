from flask import Flask, request, jsonify, send_from_directory
import json
from flask_cors import CORS
import os
import requests

# データベース操作用モジュール
from database.users_db import insert_user, get_users
from database.events_db import get_events


from routes.events import events_bp
from routes.images import images_bp
from routes.users import users_bp
from routes.weather import weather_bp
from routes import register_blueprints

# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__, static_folder='static')
CORS(app)
 

@app.route("/")
def index():
    return "<p>Flask top page!</p>"

# リスト画像一覧を取得するエンドポイント
@app.route('/api/images', methods=['GET'])
def get_images():
    images_dir = os.path.join(app.static_folder, "images")
    image_files = os.listdir(images_dir)
    image_urls = [f"/static/images/{img}" for img in image_files]
    return jsonify({"images": image_urls})


# しおりのイラスト一覧を取得するエンドポイント
@app.route('/api/illustrations', methods=['GET'])
def get_illustrations():
    illustrations_dir = os.path.join(app.static_folder, "illustrations")  # イラスト用のディレクトリ
    if not os.path.exists(illustrations_dir):
        return jsonify({"illustrations": []})  # ディレクトリが存在しない場合は空リストを返す

    illustration_files = os.listdir(illustrations_dir)
    illustrations = [
        {"name": os.path.splitext(file)[0], "url": f"/static/illustrations/{file}"}
        for file in illustration_files
    ]
    return jsonify({"illustrations": illustrations})

# リスト画像ファイルを提供するエンドポイント
@app.route('/static/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.static_folder, "images"), filename)


# しおりのイラストファイルを提供するエンドポイント
@app.route('/static/illustrations/<path:filename>')
def serve_illustration(filename):
    return send_from_directory(os.path.join(app.static_folder, "illustrations"), filename)

# 会員情報の登録エンドポイント
@app.route('/api/register', methods=['POST'])
def register_user():
    data = request.json
    if not data:
        return jsonify({"error": "No data provided"}), 400

    username = data.get("username")
    password = data.get("password")
    address = data.get("address")

    if not username or not password or not address:
        return jsonify({"error": "Missing required fields"}), 400

    try:
        insert_user(username, password, address)
        return jsonify({"message": "User registered successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# イベント情報の取得エンドポイント
@app.route('/api/events', methods=['GET'])
def fetch_events():
    try:
        events = get_events()
        return jsonify({"events": [dict(event) for event in events]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# Blueprintを登録
register_blueprints(app)

if __name__ == "__main__":
    app.run(debug=True)