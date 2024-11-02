from flask import Flask, request
from flask import jsonify
import json
from flask_cors import CORS

import requests

# Azure Database for MySQL
# REST APIでありCRUDを持っている
app = Flask(__name__)
CORS(app)
 

@app.route("/")
def index():
    return "<p>Flask top page!</p>"

if __name__ == "__main__":
    app.run(debug=True)