from flask import Flask, jsonify, send_from_directory, render_template, current_app, Blueprint, request
import os
import pymysql
from icecream import ic
import ollama

app = Flask(__name__)

UPLOAD_FOLDER = 'D:/Projects/Digital Information/backend/static'
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Create a Blueprint for SOP routes
sop_routes = Blueprint('SOP', __name__)

def get_db_connection():
    return pymysql.connect(
        host=current_app.config['DB_HOST'],
        user=current_app.config['DB_USER'],
        password=current_app.config['DB_PASSWORD'],
        db=current_app.config['DB_NAME'],
        cursorclass=pymysql.cursors.DictCursor
    )


@sop_routes.route('/api/chat', methods=['POST', 'OPTIONS', 'GET'])
def chat():
    if request.method == 'OPTIONS':
        return jsonify({"status": "success"}), 200

    try:
        # Parse request data
        data = request.get_json(force=True, silent=True)
        print(f"Received data: {data}")

        if not data or 'messages' not in data:
            return jsonify({"error": "Invalid request format"}), 400

        # Extract user message
        messages = data.get("messages", [])
        if not messages or not isinstance(messages, list) or "content" not in messages[0]:
            return jsonify({"error": "Invalid messages format"}), 400

        user_message = messages[0]["content"]
        print(f"Extracted message: {user_message}")

        # Generate a response using Ollama
        try:
            print("Generating response from Ollama...")
            response = ollama.generate(
                model=data.get("model", "llama3.2-vision:latest"),  # Use model from request or default
                prompt=user_message
            )
            print(f"Ollama response: {response}")

            bot_response = response.get("response", "No response generated.")
        except Exception as e:
            print(f"Error generating response with Ollama: {e}")
            bot_response = "Sorry, I couldn't generate a response."

        return jsonify({"response": bot_response})

    except Exception as e:
        print(f"Unexpected error: {e}")
        return jsonify({"error": "Internal Server Error"}), 500
