from os import getenv
from jinja2 import Undefined
import psycopg2
from flask import Flask, request, jsonify, Blueprint

from flask_jwt_extended import JWTManager, create_access_token
import psycopg2
from datetime import datetime, timedelta
auth = Blueprint('auth', __name__)

def get_db_connection():
    conn = psycopg2.connect(host=getenv('SUPABASE_HOST'), database=getenv("SUPABASE_DATABASE"), user=getenv("SUPABASE_USER"), password=getenv("SUPABASE_PASSWORD"), port=getenv('SUPABASE_PORT'))
    return conn

# def get_db_connection():
#     conn = psycopg2.connect(host='127.0.0.1', database='hms', user="postgres", password="jarhasy", port=5432)
#     return conn


def check_token(access_token, authorized_users):
    current_user_id = ''
    if access_token is None or access_token == "" or access_token is Undefined:
        return 401, current_user_id
    
    # now we have received something in access token
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT access_token_expiry, type, user_id FROM users WHERE access_token = \'"+access_token+"\'")
    data = cur.fetchall()

    if len(data) != 1:
        return 401, current_user_id

    # now check the token expiry of the user
    temp = data[0]
    user_type = temp[1]
    current_user_id = temp[2]

    # if datetime.now() > temp[0]:
    #     # token expired
    #     return 69, current_user_id   # redirect to the login page


    # token not expired and user is hence known
    if user_type in authorized_users:
        # user is authenticated to use the endpoint
        # update the expiry time of the token
        time_ex = datetime.now() + timedelta(minutes=1000)
        new_expiry_time = time_ex.strftime('%Y-%m-%d %H:%M:%S')


        # update the table
        cur.execute("UPDATE users SET access_token_expiry = \'"+new_expiry_time +"\' WHERE access_token = \'"+access_token+"\';")

        conn.commit()
        conn.close()

        return 1, current_user_id

    else:
        conn.close()
        return 403, current_user_id # access forbidden to you
@auth.route('/', methods=['GET'])
def index():
    return "This is backend", 200

# @auth.route('/profile', methods=['GET'])
# def my_profile():
#     res = request.get_json()
#     access_token = res['access_token']
#     out, cur = check_token(access_token, ['doc'])
#     return str(out)



@auth.route('/login', methods=['POST'])
def login():
    req = request.get_json()        # request should contain "user_id" and "password"

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, type FROM users WHERE user_id = %s AND password = %s", (req['user_id'], req['password']))
    data = cur.fetchall()

    if len(data) != 1:
        return jsonify(message = "Login Failed"), 401
     
    # this contains info of the login entity
    temp = data[0]
    user_type = temp[1]
    # create the access token
    access_token = create_access_token(identity=req['user_id'])
    access_token = user_type + access_token

    

    # save access_token in the user table along with expiration of 5 mins later
    time_ex = datetime.now() + timedelta(minutes=1000)
    new_expiry_time = time_ex.strftime('%Y-%m-%d %H:%M:%S')


    # update the table
    cur.execute("UPDATE users SET access_token = \'"+access_token+"\', access_token_expiry = \'"+new_expiry_time+ "\' WHERE user_id = \'"+temp[0]+"\';")

    conn.commit()
    conn.close()

    return jsonify(message="Login Success",access_token=access_token, user_id=temp[0]), 200
        
    
# routes for Database Administrators

@auth.route('/logout', methods=['POST'])
def logout_user():
    # delete the access token or update the expiry date
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo','dba', 'doc', 'deo'])
    ########################################
    # we have an access token if we come here
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("UPDATE users SET access_token = '' WHERE user_id = '"+current_user_id+"';")

    conn.commit()
    conn.close()

    return jsonify(message="Logout Success"), 200