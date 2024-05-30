# Seed Data Function

# Import Dependencies
from server.models.Account import Account
import json
from server.connection.database import db


# Access Existing Fernet Object
from server.routes.accounts import f


def seedData():
    try:
        # Clear Table
        db.session.query(Account).delete()

        # Open JSON File
        with open('server/seed_data/seedAccounts.json') as file:
            data = json.load(file)

            for account in data:
                # Encrypt Data
                encrypted_password = f.encrypt(account['password'].encode())
                account['password'] = encrypted_password.decode()

                if 'email' in account:
                    encrypted_email = f.encrypt(account['email'].encode())
                    account['email'] = encrypted_email.decode()

                if 'username' in account:
                    encrypted_username = f.encrypt(account['username'].encode())
                    account['username'] = encrypted_username.decode()

                new_account = Account(
                    account_name=account['account_name'],
                    password=account['password'],
                    email=account['email'] if 'email' in account else None,
                    username=account['username'] if 'username' in account else None
                )
                db.session.add(new_account)
                db.session.commit()
            
            print('*** Accounts Seeded Successfully! ***')

    except Exception as e:
        print(f'Error occurred while seeding data: {str(e)}')