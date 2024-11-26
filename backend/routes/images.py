from flask import Blueprint, request, jsonify
from database.images_db import get_images, create_image, delete_image

# Blueprintの作成
images_bp = Blueprint("images", __name__, url_prefix="/api/images")

# 画像一覧を取得するエンドポイント
@images_bp.route("/", methods=["GET"])
def fetch_images():
    try:
        images = get_images()
        return jsonify({"images": [dict(image) for image in images]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 画像を追加するエンドポイント
@images_bp.route("/", methods=["POST"])
def add_image():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        name = data.get("name")
        type_ = data.get("type")
        content = data.get("content")
        size = data.get("size")
        uploaded_by = data.get("uploaded_by")

        if not name or not type_ or not content or not size or not uploaded_by:
            return jsonify({"error": "Missing required fields"}), 400

        create_image(name, type_, content, size, uploaded_by)
        return jsonify({"message": "Image added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 画像を削除するエンドポイント
@images_bp.route("/<int:image_id>", methods=["DELETE"])
def remove_image(image_id):
    try:
        delete_image(image_id)
        return jsonify({"message": "Image deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
