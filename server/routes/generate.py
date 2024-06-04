from flask import Blueprint, request, jsonify
from .accounts import f
import random 


# Define Blueprint
generate = Blueprint('generate', __name__)


# List of Acceptable Characters
acceptable_characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ1234567890!~`@#$%^&*()_+-={[}]|\:;<>?,./'

# Generate Password
@generate.route('/', methods=['POST'])
def generate_password():
    try:
        global acceptable_characters

        # Get data from request
        data = request.json
        # Return an error message if length is not provided
        if 'length' not in data:
            return jsonify({'message': 'Length is required'}), 400
        
        # Check if length is greater than 8
        if data['length'] < 8:
            return jsonify({'message': 'Length must be greater than 8'}), 400
        
        # Loop through acceptable characters to generate a password
        password = ''
        for i in range(data['length']):
            password += random.choice(acceptable_characters)

        # Check if any character is uppercase
        if not any(char.isupper() for char in password):
            # The any() function returns True if any item in an iterable are true, otherwise it returns False.
            # char.isupper()// checks if the current character in the password string is an uppercase letter

            # If no uppercase letter, replace last character with a random uppercase letter
            password = password[:len(password) - 1] + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')
                # password[:len(password) - 1]// removes the last character from the password string
                # + random.choice('ABCDEFGHIJKLMNOPQRSTUVWXYZ')// selects a random uppercase letter and concatenates it to the password string


        # Check if any character is a digit
        if not any(char.isdigit() for char in password):
            # char.isdigit()// checks if the current character in the password string is a digit

            # If no digit, replace last character with a random digit
            password = password[:len(password) - 1] + random.choice('1234567890')
                # + random.choice('1234567890')// selects a random digit and concatenates it to the password string


        # Check if password has at least one special character
        if not any(char in '!@#$%^&*()' for char in password):
            # char in '!@#$%^&*()'// checks if the current character in the password string is a special character

            # If no special character, replace last character with a random special character
            password = password[:len(password) - 1] + random.choice('!~`@#$%^&*()_+-={[}]|\:;<>?,./')
                # + random.choice('!~`@#$%^&*()_+-={[}]|\:;<>?,./')// selects a random special character and concatenates it to the password string

        return jsonify({'password': password}), 200
    except Exception as e:
        return jsonify({'message': str(e)}), 500
    

