import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint

from flask_jwt_extended import JWTManager, create_access_token
import psycopg2
from flask_jwt_extended import get_jwt_identity
from flask_jwt_extended import jwt_required

auth = Blueprint('auth', __name__)

def get_db_connection():
    conn = psycopg2.connect(host='127.0.0.1', database='hms', user="postgres", password="jarhasy", port=5432)
    return conn

@auth.route('/profile', methods=['GET'])
def my_profile():
    response_body = {
        "name": "Nagato",
        "about" : "Hello! I'm a full stack developer that loves python and javascript"
    }

    return response_body

# routes for login page
# in auth

@auth.route('/login', methods=['POST'])
def login():
    req = request.get_json()        # request should contain "user_id" and "password"

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT count(*) FROM users WHERE user_id = %s AND password = %s", (req['user_id'], req['password']))
    val = cur.fetchone()[0]
    conn.close()

    if val != 1:
        return jsonify({"message": "Login failed"}), 401
    
    # create the access token
    access_token = create_access_token(identity=req['user_id'])

    return jsonify(message="Login Success",access_token=access_token), 200
        
    
# routes for Database Administrators

@auth.route('/dba/register', methods=['PUT'])
def dbaRegister():
    req = request.get_json()        # request should contain "name" , "ph_number" , "type" and "address"

    
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (user_id, password, role) VALUES (%s, %s, 'dba')", (req['user_id'], req['password']))
    conn.commit()
    conn.close()

    return jsonify({"message": "Registration successful"}), 200
