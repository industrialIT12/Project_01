from app import create_app
<<<<<<< HEAD
from concurrent.futures import thread
=======
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
from waitress import serve

# Create Flask app
app = create_app()
<<<<<<< HEAD
mode = "prod"
if __name__ == '__main__':
    if mode =="prod":
        app.run(host='0.0.0.0', port=6500, debug = False)
    else:
        serve(app, host='0.0.0.0', port=6500,threads=2 ,url_prefix="/Project Management App")
=======

if __name__ == '__main__':
    # Run the app on port 5500
    app.run(host='0.0.0.0', port=8600, debug=False)
>>>>>>> 8ee8bed0380761af891f3d488303329303c22107
