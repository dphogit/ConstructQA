from flask import Flask
from flask_cors import CORS

app = Flask(__name__)
CORS(app, origins=["http://localhost:5173"])


@app.route("/health-check")
def health_check():
    return {"status": "OK"}
