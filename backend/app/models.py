from flask import current_app,request,jsonify
import pymysql.cursors
from datetime import datetime,timedelta
from decimal import Decimal
from icecream import ic


def get_db_connection():
    return pymysql.connect(
         host=current_app.config['DB_HOST'],  # Correct key for host
        user=current_app.config['DB_USER'],  # Correct key for user
        password=current_app.config['DB_PASSWORD'],  # Correct key for password
        db=current_app.config['DB_NAME'],  # Correct key for database
        cursorclass=pymysql.cursors.DictCursor
    )

class SOP:

    def show_sop():
        try:
            connection = get_db_connection()
            cursor = connection.cursor()
            
            query = "SELECT * FROM details"
            cursor.execute(query)

            rows = cursor.fetchall()
            connection.close()
            return rows
        except Exception as e:
            print("Error fetching data:", e)
            return {'error': str(e)}
