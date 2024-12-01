from flask import Flask, request, send_from_directory
from flask import jsonify
import json
from flask_cors import CORS
import os
import requests
import mysql.connector
from mysql.connector import Error


# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__, static_folder='static')
CORS(app)

# MySQL接続設定
app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = 'Password123'
app.config['MYSQL_DATABASE'] = 'sample_app'


def get_db_connection():
    try:
        connection = mysql.connector.connect(
            host=app.config['MYSQL_HOST'],
            user=app.config['MYSQL_USER'],
            password=app.config['MYSQL_PASSWORD'],
            database=app.config['MYSQL_DATABASE']
        )
        return connection
    except Error as e:
        print(f"Error connecting to MySQL: {e}")
        return None
    
@app.route('/test_db', methods=['GET'])
def test_db():
    connection = get_db_connection()
    if connection:
        connection.close()
        return {"status": "success", "message": "Database connection successful"}, 200
    else:
        return {"status": "error", "message": "Database connection failed"}, 500
    

@app.route('/users', methods=['GET'])
def get_users():
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500
    try:
        cursor = connection.cursor(dictionary=True)
        cursor.execute("SELECT * FROM users")
        users = cursor.fetchall()
        return jsonify(users)
    except mysql.connector.Error as e:
        print(f"Error executing query: {e}")
        return jsonify({"error": "Failed to fetch data"}), 500
    finally:
        cursor.close()
        connection.close()


@app.route('/add_user', methods=['POST'])
def add_user():
    data = request.json
    name = data.get('name')
    email = data.get('email')
    connection = get_db_connection()
    if connection is None:
        return jsonify({"error": "Database connection failed"}), 500
    cursor = connection.cursor()
    cursor.execute("INSERT INTO users (name, email) VALUES (%s, %s)", (name, email))
    connection.commit()
    cursor.close()
    connection.close()
    return jsonify({"message": "User added successfully!"})


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


# 写真アップロードのエンドポイントを追加
@app.route('/api/upload-photo', methods=['POST'])
def upload_photo():
    if 'photo' not in request.files:
        return jsonify({"error": "No file part"}), 400

    file = request.files['photo']
    if file.filename == '':
        return jsonify({"error": "No selected file"}), 400

    # 保存先ディレクトリの作成
    photos_dir = os.path.join(app.static_folder, "photos")
    if not os.path.exists(photos_dir):
        os.makedirs(photos_dir)

    # ファイルを保存
    file_path = os.path.join(photos_dir, file.filename)
    file.save(file_path)

    return jsonify({"message": "File uploaded successfully", "file_path": file_path}), 201


# アップロードされた写真一覧を取得するエンドポイント
@app.route('/api/photos', methods=['GET'])
def get_photos():
    photos_dir = os.path.join(app.static_folder, "photos")
    if not os.path.exists(photos_dir):
        return jsonify({"photos": []})  # ディレクトリが存在しない場合は空リストを返す

    photo_files = os.listdir(photos_dir)
    photo_urls = [f"/static/photos/{file}" for file in photo_files]
    return jsonify({"photos": photo_urls})



if __name__ == "__main__":
        # ポートを 8080 に設定
    app.run(host='127.0.0.1', port=8080)