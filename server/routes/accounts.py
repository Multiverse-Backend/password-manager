from flask import Blueprint, request, jsonify
from server.connection import db
from cryptography.fernet import Fernet
import os

# Create Fernet Object
f = Fernet(os.getenv('ENCRYPTION_KEY', 'none'))

# Import Models
from server.models import Account

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
        if 'email' not in data:
            return jsonify({'message': 'Email is required'}), 400
        if 'email' not in data and 'username' not in data:
            return jsonify({'message': 'Email or Username is required'}), 400
        
        # Encrypt Password and Identifier
        encrypted_password = f.encrypt(data['password'].encode())
        data['password'] = encrypted_password.decode()

        # Transform Email to Lowercase
        data['email'] = data['email'].lower()
        encrypted_email = f.encrypt(data['email'].encode())
        data['email'] = encrypted_email.decode()

        if 'username' in data:
            encrypted_username = f.encrypt(data['username'].encode())
            data['username'] = encrypted_username.decode()
            
        # Create a new account object
        account = Account(
            account_name=data['account_name'],
            password=data['password'],
            email=data['email'],
            username=data['username'] if 'username' in data else None,
        )  
        # Add account to database
        db.session.add(account)
        db.session.commit()

        return jsonify(account.serialize()), 201
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Get All Accounts (for User)
@accounts.route('/user', methods=['POST'])
def get_user_accounts():
    try:
        # Get accounts associated with email
        data = request.json

        if 'email' not in data:
            return jsonify({'message': 'Email is required'}), 400
        
        # Get All Accounts
        allAccounts = Account.query.all()

        # Loop through accounts and create copy to decrypt
        for account in allAccounts:
            account_copy = account

            # Decrypt Email Only
            decrypted_email = f.decrypt(account_copy.email.encode())
            account_copy.email = decrypted_email.decode()

            # If Account Email does NOT match User Email, skip
            if account_copy.email != data['email']:
                continue

            # If Account Email DOES match User Email, Decrypt Password and Username
            decrypted_password = f.decrypt(account_copy.password.encode())
            account_copy.password = decrypted_password.decode()

            if account_copy.username:
                decrypted_username = f.decrypt(account_copy.username.encode())
                account_copy.username = decrypted_username.decode()

        # Return List of Accounts with Matching Emails
        return jsonify([account_copy.serialize() for account_copy in allAccounts if account_copy.email == data['email']]), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500


# Update an Account by ID
@accounts.route('/<int:id>/update', methods=['PUT'])
def update_account(id):
    try:
        account = Account.query.get(id)

        if 'account_name' in request.json:
            account.account_name = request.json['account_name']

        if 'password' in request.json:
            encrypted_password = f.encrypt(request.json['password'].encode())
            account.password = encrypted_password.decode()

        if 'email' in request.json:
            encrypted_email = f.encrypt(request.json['email'].encode())
            account.email = encrypted_email.decode()

        if 'username' in request.json:
            encrypted_username = f.encrypt(request.json['username'].encode())
            account.username = encrypted_username.decode()

        db.session.commit()

        return jsonify({'message': 'Account updated successfully'}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
        

# Delete an Account (by ID)
@accounts.route('/<int:id>', methods=['DELETE'])
def delete_account(id):
    try:
        account = Account.query.get(id)

        if not account:
            return jsonify({'message': 'Account not found'}), 404
        
        db.session.delete(account)
        db.session.commit()

        return jsonify({'message': 'Account deleted successfully'}), 200
    
    except Exception as e:
        return jsonify({'message': str(e)}), 500