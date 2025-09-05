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

    # Import and register routes
    from .routes import sop_routes
    app.register_blueprint(sop_routes)
    
    return app
