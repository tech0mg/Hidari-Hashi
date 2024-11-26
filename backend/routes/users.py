from flask import Blueprint, request, jsonify
from database.users_db import create_user, get_users, delete_user, get_user_by_id, update_user

# Blueprintの作成
users_bp = Blueprint("users", __name__, url_prefix="/api/users")

# ユーザー一覧を取得するエンドポイント
@users_bp.route("/", methods=["GET"])
def fetch_users():
    try:
        users = get_users()
        return jsonify({"users": [dict(user) for user in users]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ユーザーを追加するエンドポイント
@users_bp.route("/", methods=["POST"])
def add_user():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        password = data.get("password")
        address = data.get("address")

        if not username or not password or not address:
            return jsonify({"error": "Missing required fields"}), 400

        create_user(username, password, address)
        return jsonify({"message": "User added successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# 特定のユーザーを取得するエンドポイント
@users_bp.route("/<int:user_id>", methods=["GET"])
def fetch_user_by_id(user_id):
    try:
        user = get_user_by_id(user_id)
        if user:
            return jsonify({"user": dict(user)}), 200
        else:
            return jsonify({"error": "User not found"}), 404
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ユーザー情報を更新するエンドポイント
@users_bp.route("/<int:user_id>", methods=["PUT"])
def update_user_info(user_id):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        username = data.get("username")
        password = data.get("password")
        address = data.get("address")

        if not username and not password and not address:
            return jsonify({"error": "No fields to update"}), 400

        update_user(user_id, username, password, address)
        return jsonify({"message": "User updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# ユーザーを削除するエンドポイント
@users_bp.route("/<int:user_id>", methods=["DELETE"])
def remove_user(user_id):
    try:
        delete_user(user_id)
        return jsonify({"message": "User deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

