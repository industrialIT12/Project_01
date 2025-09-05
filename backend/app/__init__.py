from flask import Flask, send_from_directory
from .config import Config
import pymysql.cursors
from flask_cors import CORS
from flask_mail import Mail
import os

# Initialize MySQL connection
def get_db_connection():
    return pymysql.connect(
        host=Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        db=Config.DB_NAME,
        cursorclass=pymysql.cursors.DictCursor
    )

mail = Mail()

# Initialize Flask app
def create_app():
    app = Flask(__name__)

    app.config.from_object(Config)

    CORS(app)
    mail.init_app(app)

<<<<<<< HEAD
    # Serve the React build's index.html
    @app.route("/")
    def serve_react():
        return send_from_directory(app.static_folder, "index.html")

    # Serve any static files (e.g., CSS, JS) from React build
    @app.route("/static/<path:path>")
    def serve_static(path):
        return send_from_directory(os.path.join(app.static_folder, path))

    # Import and register routes
    from .routes import maintenance_routes
    app.register_blueprint(maintenance_routes)
=======
    # Import and register routes
    from .routes import sop_routes
    app.register_blueprint(sop_routes)
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
    
    return app
