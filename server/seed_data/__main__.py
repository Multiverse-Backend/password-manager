# Seed Data Function

# Import Dependencies
from models import Account
import json
from connection import db


# Access Existing Fernet Object
from routes.accounts import f


def seedData():
    try:
        # Clear Table
        db.session.query(Account).delete()

        # Open JSON File
        with open('seed_data/seedAccounts.json') as file:
            data = json.load(file)

            for account in data:
                # Encrypt Data
                encrypted_password = f.encrypt(account['password'].encode())
                account['password'] = encrypted_password.decode()

                # Transform Email to Lowercase
                account['email'] = account['email'].lower()
                encrypted_email = f.encrypt(account['email'].encode())
                account['email'] = encrypted_email.decode()

                if 'username' in account:
                    encrypted_username = f.encrypt(account['username'].encode())
                    account['username'] = encrypted_username.decode()

                new_account = Account(
                    account_name=account['account_name'],
                    password=account['password'],
                    email=account['email'],
                    username=account['username'] if 'username' in account else None
                )
                db.session.add(new_account)
                db.session.commit()
            
            print('*** Accounts Seeded Successfully! ***')

    except Exception as e:
        print(f'Error occurred while seeding data: {str(e)}')