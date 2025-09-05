from flask import Blueprint,Flask, send_from_directory, jsonify,request, current_app
from .models import Details
from flask_mail import Message
from app import mail
from datetime import datetime
from icecream import ic
import pymysql.cursors
from werkzeug.security import check_password_hash, generate_password_hash
app = Flask(__name__)

maintenance_routes = Blueprint('maintenance', __name__)

def get_db_connection():
    return pymysql.connect(
         host=current_app.config['DB_HOST'],  # Correct key for host
        user=current_app.config['DB_USER'],  # Correct key for user
        password=current_app.config['DB_PASSWORD'],  # Correct key for password
        db=current_app.config['DB_NAME'],  # Correct key for database
        cursorclass=pymysql.cursors.DictCursor
    )

def password_hash2(username,password):
    try:
        conn = get_db_connection()
        cursor = conn.cursor()
 
        hashed_password = generate_password_hash(password, method='scrypt')
        ic(username,password)
        
        # Update the user's password in the database with the hashed password
        cursor.execute("UPDATE login SET password = %s WHERE username = %s", (hashed_password, username))
 
        conn.commit()
        cursor.close()
        conn.close()
 
        return jsonify({"message": "Passwords updated successfully"}), 200
 
    except Exception as e:
        # Return a JSON response with the error message
        return jsonify({"error": str(e)}), 500

@maintenance_routes.route('/api/login', methods=['POST'])
def login_new():
    data = request.json
    username = data.get('username')
    password = data.get('password')
 
    conn = get_db_connection()
    cursor = conn.cursor()
   
    cursor.execute("SELECT * FROM login WHERE username = %s", (username))
    user = cursor.fetchone()
 
    if user and check_password_hash(user['password'], password):
        # Password matches, return the user's access information
        return jsonify({'status': 'success', 'access_level': user['access'], 'segment_type': user['segment']})
    else:
        # Invalid credentials
        return jsonify({'status': 'error', 'message': 'Invalid username or password'}), 401

@maintenance_routes.route('/api/password_hash', methods=['GET'])
def password_hash():
    try:
        # Manually hashing and updating passwords
        users = [
            
            {"username": "Deepak Jangir", "password": "Deepak@321"}
        ]
 
        conn = get_db_connection()
        cursor = conn.cursor()
 
        for user in users:
            username = user["username"]
            plain_password = user["password"]
           
            # Generate hashed password
            hashed_password = generate_password_hash(plain_password, method='scrypt')
           
            # Update the user's password in the database with the hashed password
            cursor.execute("UPDATE login SET password = %s WHERE username = %s", (hashed_password, username))
 
        conn.commit()
        cursor.close()
        conn.close()
 
        return jsonify({"message": "Passwords updated successfully"}), 200
 
    except Exception as e:
        # Return a JSON response with the error message
        return jsonify({"error": str(e)}), 500

@maintenance_routes.route('/details', methods=['GET'])
def get_all_plans():
    try:
        selected_business = request.args.get("business", "")  # Get from query params
        plans = Details.get_all_plans(selected_business)
        return jsonify(plans)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@maintenance_routes.route('/team_details', methods=['GET'])
def team_details():
    try:
        project_id = request.args.get('project_id')
        plans = Details.team_details(project_id)
        return jsonify(plans)
    except Exception as e:
        return jsonify({'error': str(e)}), 500

    

@maintenance_routes.route('/details2', methods=['GET'])
def get_all_plans2():
    try:
        id=request.args.get("project_id")
        plans = Details.get_all_plans2(id)
        return jsonify(plans)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/project_count', methods=['GET'])
def get_project_count():
    try:
        data = Details.get_project_count()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/businesspie', methods=['GET'])
def get_business_piechart():
    try:
        data = Details.get_business_piechart()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/businesssegment', methods=['GET'])
def get_businesssegment():
    try:

        data = Details.get_businesssegment()
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/openconcernline', methods=['GET'])
def get_openconcern_line():
    try:
        project_id = request.args.get('project_id')
        data = Details.get_openconcern_line(project_id)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/openconcernbar', methods=['GET'])
def get_openconcern_bar():
    try:
        project_id = request.args.get('project_id')
        data = Details.get_openconcern_bar(project_id)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

# @maintenance_routes.route('/api/project_data', methods=['GET'])
# def get():
#     try:
#         plans = Details.get_all_plans()
#         return jsonify(plans)
#     except Exception as e:
#         return jsonify({'error': str(e)}), 500
    
# from flask import request, jsonify

@maintenance_routes.route('/api/add_project', methods=['POST'])
def add_project_route():
    try:
        data = request.get_json()
        if not data:
            return jsonify({'error': 'No input data provided'}), 400

        result = Details.add_project(data)
        return jsonify({'message': 'Project added successfully', 'status': result}), 201

    except ValueError as ve:
        return jsonify({'error': str(ve)}), 400
    except RuntimeError as re:
        return jsonify({'error': str(re)}), 500
    except Exception as e:
        # Log unexpected errors
        return jsonify({'error': f"Unexpected error: {str(e)}"}), 550
    
@maintenance_routes.route('/api/MOM', methods=['POST'])
def add_mom():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.add_mom(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@maintenance_routes.route('/api/dev_details', methods=['POST'])
def dev_details():
    try:
        project_id = request.args.get('project_id')
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        dev_details = Details.dev_details(data,project_id)

        return jsonify({'message': 'Project added successfully', 'dev_details': dev_details}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_dev', methods=['GET'])
def get_dev():
    try:
        project_id = request.args.get('project_id')
        data = Details.get_dev(project_id)
        return jsonify(data)
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_mom', methods=['GET'])
def get_mom():
    try:
        project_id = request.args.get('project_id')
        mom_data = Details.get_mom(project_id)
        return jsonify(mom_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_allmom', methods=['GET'])
def get_allmom():
    try:
        mom_data = Details.get_allmom()
        return jsonify(mom_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_mom_table', methods=['GET'])
def get_mom_table():
    try:
        project_id = request.args.get('project_id')
        mom_data = Details.get_mom_table(project_id)
        return jsonify(mom_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    
@maintenance_routes.route('/api/updatephase', methods=['POST'])
def update_phase():
    try:
        data = request.get_json()
        print(data)
        phase=data['Changephase']
        id=data['project_id']

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_phase(phase,id)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/updatemom', methods=['POST'])
def update_mom():
    try:
        data = request.get_json()
        print(data)

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_mom(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/updatedev', methods=['POST'])
def update_dev():
    try:
        data = request.get_json()
        print(data)

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_dev(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500

@maintenance_routes.route('/api/timep_data', methods=['POST'])
def timep_data():
    try:
        project_id = request.args.get('project_id')
        if not project_id:
            print("Error: 'project_id' is missing in query parameters.")
            return jsonify({'error': "'project_id' is required"}), 400

        data = request.get_json()
        if not data:
            print("Error: No JSON body provided.")
            return jsonify({'error': 'No input data provided'}), 400

        timing_plan = Details.timep_data(data, project_id)

        # Check if the response contains an error
        if 'error' in timing_plan:
            return jsonify(timing_plan), 500

        return jsonify({'message': 'TimeP added successfully', 'timing_plan': timing_plan}), 201

    except Exception as e:
        import traceback
        print("Unhandled error encountered:", traceback.format_exc())
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/event_data', methods=['GET'])
def get_event():
    try:
        project_id = request.args.get('project_id')
        plans = Details.get_event(project_id)
        return jsonify(plans)
    except Exception as e:
        return jsonify({'error': str(e)}), 500


@maintenance_routes.route('/sendemail', methods=['POST'])
def send_email():
    try:
        # Get the email details from the request
        data = request.get_json()
        if not all(k in data for k in ('subject', 'text', 'recipient')):
            return jsonify({"message": "Missing required fields"}), 400
        ic(data)
        subject = data['subject']
        text = data['text']
        recipient = data['recipient']
        part_name = data.get('part_name', 'N/A')
        date = data.get('date', 'N/A')
        concern_point_discussed = data.get('concern_point_discussed', 'N/A')
        raised_by = data.get('raised_by', 'N/A')

        # Convert the date to a readable format
        try:
            formatted_date = datetime.strptime(date, '%Y-%m-%d').strftime('%B %d, %Y')
        except ValueError:
            formatted_date = "Invalid date format"

        # Create the HTML email body
        html_body = f"""
        <html>
            <head>
                <style>
                    body {{
                        font-family: Arial, sans-serif;
                        background-color: #f4f4f9;
                        padding: 20px;
                    }}
                    .container {{
                        background-color: white;
                        border-radius: 8px;
                        padding: 20px;
                        box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
                    }}
                    h2 {{
                        color: #4CAF50;
                    }}
                    p {{
                        font-size: 16px;
                        line-height: 1.6;
                    }}
                    .label {{
                        font-weight: bold;
                        color: #333;
                    }}
                </style>
            </head>
            <body>
                <div class="container">
                    <h2>{subject}</h2>
                    <p><span class="label">Part Name:</span> {part_name}</p>
                    <p><span class="label">Date:</span> {formatted_date}</p>
                    <p><span class="label">Concern Point Discussed:</span> {concern_point_discussed}</p>
                    <p><span class="label">Raised By:</span> {raised_by}</p>
                    <p><span class="label">Details:</span></p>
                    <p>{text}</p>
                    <footer style="margin-top: 20px;">
                        <p><strong>Warm Regards,</strong></p>
                        <p>Corporate Digitalization Team</p>
                        <p>PPAP Automotive Limited</p>
                        <p>B-206A Sector 81, Phase II, Noida 201305, Uttar Pradesh, India</p>
                        <p>Tel: +91-120-2462552/53 ; Fax: +91-120-2461371</p>
                        <p>Website: <a href="http://www.ppapco.in" target="_blank">www.ppapco.in</a></p>
                    </footer>
                </div>
            </body>
        </html>
        """

        # Create the email message
        msg = Message(
            subject,
            recipients=[recipient],
            cc=['ankit@ppapco.com'],
            # cc=['manojk@ppapco.com', 'deepakjangir@ppapco.com'],  # Add CC recipients if needed
            # bcc=['ankit@ppapco.com','industrialit@ppapco.com'],  # Add BCC recipients if needed
            html=html_body
        )

        # Send the email
        mail.send(msg)

        return jsonify({"message": "Email sent successfully"}), 200

    except Exception as e:
        app.logger.error(f"Error occurred while sending email: {e}")
        return jsonify({"message": f"Error occurred: {str(e)}"}), 500

    
@maintenance_routes.route('/api/updatedetails', methods=['POST'])
def update_details():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_details(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_allevent', methods=['GET'])
def get_allevent():
    try:
        mom_data = Details.get_allevent()
        return jsonify(mom_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@maintenance_routes.route("/api/customer-projects", methods=["GET"])
def get_customer_projects():
    selected_business = request.args.get("business", "")  # Get from query params
    return Details.get_customer_projects(selected_business)

@maintenance_routes.route('/api/get_user', methods=['GET'])
def get_userdata():
    try:
        user_data = Details.get_userdata()
        return jsonify(user_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/delete_user', methods=['DELETE'])
def delete_userdata():
        id=request.args.get("id")
        
        user_data = Details.delete_userdata(id)
        
    
@maintenance_routes.route('/api/updateprojteam', methods=['POST'])
def update_projectteam():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_projectteam(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    

@maintenance_routes.route('/api/adduser', methods=['POST'])
def add_user():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        data = Details.add_user(data)

        return jsonify({'message': 'Project added successfully', 'mom': data}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/updateuser', methods=['POST'])
def update_user():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_user(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/create_booking', methods=['POST'])
def createbooking():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.createbooking(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_bookings', methods=['GET'])
def get_bookings():
    try:
        mom_data = Details.get_bookings()
        return jsonify(mom_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/updatetable', methods=['POST'])
def update_table():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_table(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/updateevent', methods=['POST'])
def update_event():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_event(data)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/deletedev/<int:id>', methods=['DELETE'])
def delete_dev(id):
    try:
        ic(id)
        connection = get_db_connection()
        cursor = connection.cursor()
        cursor.execute("DELETE FROM dev_details WHERE id = %s", (id,))
        connection.commit()
        return jsonify({"message": "Deleted"}), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500


@maintenance_routes.route('/api/addusermould', methods=['POST'])
def add_usermould():
    try:
        data = request.get_json()
        password=data['passw']
        username=data['name']

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        data = Details.add_usermould(data)
        password_hash2(username,password)


        return jsonify({'message': 'Project added successfully', 'mom': data}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/updateusermould', methods=['POST'])
def update_usermould():
    try:
        data = request.get_json()
        password=data['passw']
        username=data['name']

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        mom = Details.update_usermould(data)
        password_hash2(username,password)

        return jsonify({'message': 'Project added successfully', 'mom': mom}), 201
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Logs the error
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/get_moulduser', methods=['GET'])
def get_moulduser():
    try:
        user_data = Details.get_moulduser()
        return jsonify(user_data)
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/delete_usermould', methods=['DELETE'])
def delete_moulddata():
        id=request.args.get("id")
        
        user_data = Details.delete_moulddata(id)

@maintenance_routes.route('/api/get_master', methods=['GET'])
def get_master():
    try:
        mom_data = Details.get_master()
        return jsonify(mom_data)
   
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
@maintenance_routes.route('/api/addmaster', methods=['POST'])
def add_master():
    try:
        data = request.get_json()

        if not data:
            return jsonify({'error': 'No input data provided'}), 400
        
        data = Details.add_master(data)

        return jsonify({'message': 'Project added successfully', 'mom': data}), 201
    
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
    



