# Import Dependencies
from flask import Flask
from flask_cors import CORS
from dotenv import load_dotenv, find_dotenv

# Load Environment Variables
ENV_FILE = find_dotenv()
if ENV_FILE:
    load_dotenv(ENV_FILE)

# Import Database
from connection import db

# Import Seed Data Function
from seed_data.__main__ import seedData




# Create an instance of Flask
def create_app():
    app = Flask(__name__, static_folder='client')
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Import Routes
    from routes import accounts, generate

    # Register Blueprints
    app.register_blueprint(accounts, url_prefix='/accounts')
    app.register_blueprint(generate, url_prefix='/generate')


    with app.app_context():
        db.create_all()
        # Seed Data Function
        # seedData()

    return app


# Database Setup
app = create_app()


# Run the application
if __name__ == "__main__":
    app.run(debug=True)