from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash
from werkzeug.security import check_password_hash
import requests

app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///users.db' #sqlalchemy uses local sqlite db named users.db
app.config['CORS_HEADERS'] = 'Content-type'
db = SQLAlchemy(app)

RAPIDAPI_KEY = 'e5d3ecf09dmsh7cde719fcdcdaa0p184b48jsnc0e6da6350e4'
RAPIDAPI_HOST = 'booking-com15.p.rapidapi.com'

from flask_cors import CORS
CORS(app)

class User(db.Model):
    id = db.Column(db.Integer, primary_key=True) #primary key
    email = db.Column(db.String(120), unique=True, nullable=False) #must be unique, can't be null
    password = db.Column(db.String(200), nullable=False) #stores hashed password, not plaintext

@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    if User.query.filter_by(email=email).first():
        return jsonify({"msg": "Email already registered"}), 409
    
    hashed_pw = generate_password_hash(password, method='pbkdf2:sha256')
    new_user = User(email=email, password=hashed_pw)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"msg": "User registered successfully"}), 201 #created

@app.route('/api/login', methods=['POST'])
def login():
    data = request.get_json()
    email = data.get('email')
    password = data.get('password')

    user = User.query.filter_by(email=email).first()
    if not user or not check_password_hash(user.password, password):
        return jsonify({"msg": "Invalid email or password"}), 401 #unauthorized
    
    return jsonify({"msg": "Login successful"}), 200



if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)