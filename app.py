# Import Dependencies
from flask import Flask
from flask_cors import CORS

# Import Configurations
from server.connection.database import db

# Import Seed Data Function





# Create an instance of Flask
def create_app():
    app = Flask(__name__)
    CORS(app)

    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite3'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    db.init_app(app)

    # Import Routes

    # Register Blueprints


    with app.app_context():
        db.create_all()
        # Seed Data Function

    return app


# Database Setup
app = create_app()


# Run the application
if __name__ == "__main__":
    app.run(debug=True)

















# Run the application
if __name__ == "__main__":
    app.run(debug=True)