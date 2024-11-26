from flask import Blueprint, request, jsonify
from database.events_db import get_events, create_event, update_event, delete_event

# Blueprintの作成
events_bp = Blueprint("events", __name__, url_prefix="/api/events")

# イベント一覧の取得エンドポイント
@events_bp.route("/", methods=["GET"])
def fetch_events():
    try:
        events = get_events()
        return jsonify({"events": [dict(event) for event in events]}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# イベントの作成エンドポイント
@events_bp.route("/", methods=["POST"])
def add_event():
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        event_name = data.get("event_name")
        event_place = data.get("event_place")
        event_date = data.get("event_date")
        event_detail = data.get("event_detail")

        if not all([event_name, event_place, event_date, event_detail]):
            return jsonify({"error": "Missing required fields"}), 400

        create_event(event_name, event_place, event_date, event_detail)
        return jsonify({"message": "Event created successfully"}), 201
    except Exception as e:
        return jsonify({"error": str(e)}), 500


# イベントの更新エンドポイント
@events_bp.route("/<int:event_id>", methods=["PUT"])
def modify_event(event_id):
    try:
        data = request.json
        if not data:
            return jsonify({"error": "No data provided"}), 400

        event_name = data.get("event_name")
        event_place = data.get("event_place")
        event_date = data.get("event_date")
        event_detail = data.get("event_detail")

        if not all([event_name, event_place, event_date, event_detail]):
            return jsonify({"error": "Missing required fields"}), 400

        update_event(event_id, event_name, event_place, event_date, event_detail)
        return jsonify({"message": "Event updated successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500

# イベントの削除エンドポイント
@events_bp.route("/<int:event_id>", methods=["DELETE"])
def remove_event(event_id):
    try:
        delete_event(event_id)
        return jsonify({"message": "Event deleted successfully"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500
