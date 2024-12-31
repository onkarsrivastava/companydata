from flask import Flask, jsonify, request
from flask_cors import CORS
import pandas as pd
import random
import requests

# Initialize the Flask app
app = Flask(__name__)

# Allow CORS with Authorization header
CORS(app, resources={r"/api/*": {"origins": "http://localhost:3000", "allow_headers": ["Authorization"]}})

# Function to generate random company data
def generate_company_data():
    companies = ["Apple", "Microsoft", "Google", "Amazon", "Facebook"]
    scores = [random.randint(90, 100) for _ in companies]
    df = pd.DataFrame({"Company": companies, "Score": scores})
    return df

# Helper function to verify Google OAuth token
def verify_google_token(token):
    try:
        response = requests.get(
            f"https://oauth2.googleapis.com/tokeninfo?id_token={token}"
        )
        if response.status_code == 200:
            return response.json()  # Return the token's decoded payload
        else:
            return None
    except Exception as e:
        print(f"Error verifying token: {e}")
        return None

# API endpoint to get company data
@app.route('/api/companies', methods=['GET'])
def get_companies():
    # Log the request headers for debugging
    print("Request Headers:", request.headers)

    # Check for the Authorization header
    auth_header = request.headers.get("Authorization")
    if not auth_header:
        return jsonify({"error": "Authorization header missing"}), 403

    # Extract the token
    token = auth_header.split(" ")[1]

    # Verify the token
    user_info = verify_google_token(token)
    if not user_info:
        return jsonify({"error": "Invalid or expired token"}), 403

    # If token is valid, return company data
    df = generate_company_data()
    data = df.to_dict(orient='records')
    return jsonify(data)

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)
