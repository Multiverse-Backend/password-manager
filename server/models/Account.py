# Account Model

# Import Dependencies
from connection import db


# Define Model
class Account(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    account_name = db.Column(db.String(255), nullable=False)
    password = db.Column(db.String(255), nullable=False)
    email = db.Column(db.String(255), nullable=False)
    username = db.Column(db.String(255), nullable=True)

    # Define Methods
    # Init Method: Initializes Account Object
    def __init__(self, account_name, password, email, username):
        self.account_name = account_name
        self.password = password
        self.email = email
        self.username = username

    # Serialize Method: Returns Account Object as Dictionary for JSON
    def serialize(self):
        return {
            'id': self.id,
            'account_name': self.account_name,
            'password': self.password,
            'email': self.email,
            'username': self.username,
        }