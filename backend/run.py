from app import create_app
from concurrent.futures import thread
from waitress import serve

# Create Flask app
app = create_app()
mode = "prod"
if __name__ == '__main__':
    if mode =="prod":
        app.run(host='0.0.0.0', port=6500, debug = False)
    else:
        serve(app, host='0.0.0.0', port=6500,threads=2 ,url_prefix="/Project Management App")