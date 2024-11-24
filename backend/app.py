from flask import Flask, request, send_from_directory
from flask import jsonify
import json
from flask_cors import CORS
import os
import requests

# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__, static_folder='static')
CORS(app)
 

@app.route("/")
def index():
    return "<p>Flask top page!</p>"

@app.route('/api/images', methods=['GET'])
def get_images():
    images_dir = os.path.join(app.static_folder, "images")
    image_files = os.listdir(images_dir)
    image_urls = [f"/static/images/{img}" for img in image_files]
    return jsonify({"images": image_urls})

@app.route('/static/images/<path:filename>')
def serve_image(filename):
    return send_from_directory(os.path.join(app.static_folder, "images"), filename)


if __name__ == "__main__":
    app.run(debug=True)