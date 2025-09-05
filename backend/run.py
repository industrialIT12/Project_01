from app import create_app
from waitress import serve

# Create Flask app
app = create_app()

if __name__ == '__main__':
    # Run the app on port 5500
    app.run(host='0.0.0.0', port=8600, debug=False)
