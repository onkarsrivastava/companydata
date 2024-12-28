from flask import Flask, jsonify
from flask_cors import CORS
import pandas as pd
import random

# Initialize the Flask app
app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

# Function to generate random company data
def generate_company_data():
    companies = ["Apple", "Microsoft", "Google", "Amazon", "Facebook"]
    scores = [random.randint(90, 100) for _ in companies]
    df = pd.DataFrame({"Company": companies, "Score": scores})
    return df

# API endpoint to get company data
@app.route('/api/companies', methods=['GET'])
def get_companies():
    df = generate_company_data()
    data = df.to_dict(orient='records')
    return jsonify(data)

# Run the Flask server
if __name__ == '__main__':
    app.run(debug=True)
