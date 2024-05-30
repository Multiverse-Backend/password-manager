from flask import Blueprint, request, jsonify
from server.connection.database import db
from cryptography.fernet import Fernet
import os

# Create Fernet Object
f = Fernet(os.getenv('ENCRYPTION_KEY', 'none'))

# Import Models
from server.models.Account import Account

# Define Blueprint
accounts = Blueprint('accounts', __name__)

# Define Routes

# Create Account (for User)
@accounts.route('/', methods=['POST'])
def create_account():
    try:
        # Get data from request
        data = request.json
       
        if 'account_name' not in data:
            return jsonify({'message': 'Account Name is required'}), 400
        if 'password' not in data:
            return jsonify({'message': 'Password is required'}), 400
        if 'email' not in data and 'username' not in data:
            return jsonify({'message': 'Email or Username is required'}), 400
        
        # Encrypt Password and Identifier
        encrypted_password = f.encrypt(data['password'].encode())
        data['password'] = encrypted_password.decode()

        if 'email' in data:
            encrypted_email = f.encrypt(data['email'].encode())
            data['email'] = encrypted_email.decode()
        if 'username' in data:
            encrypted_username = f.encrypt(data['username'].encode())
            data['username'] = encrypted_username.decode()
            
        # Create a new account object
        account = Account(
            account_name=data['account_name'],
            password=data['password'],
            email=data['email'] if 'email' in data else None,
            username=data['username'] if 'username' in data else None,
            # user_id=user_id
        )  
        # Add account to database
        db.session.add(account)
        db.session.commit()

        return jsonify(account.serialize()), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Get All Accounts (Returns Encrypted Data)
@accounts.route('/all', methods=['GET'])
def get_accounts():
    try:
        allAccounts = Account.query.all()
        return jsonify([account.serialize() for account in allAccounts]), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500