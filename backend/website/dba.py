import os
import psycopg2
import smtplib
from flask import Flask, request, jsonify, Blueprint
from .auth import check_token, get_db_connection
from .send_email import send_email
from os.path import basename
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
from os import getenv
load_dotenv()

dba = Blueprint('dba', __name__)

def generate_body_doctor(user_id,docType, password, name):
    sub = "Access to Azad Hospital Website"
    body = "Hello Mr./Mrs. "+name+",\nWe welcome you to Azad Hospital as a "+docType+" doctor and it is an honour for us to have you in our family. We have a information portal. You can access it with you doctor_id : "+user_id+" and password : "+password+".\nKindly reset your password for better security."

    return sub, body

def generate_user_id(type):
    conn = get_db_connection()
    cur = conn.cursor()

    query = "SELECT " + type.lower() + " FROM ids;"

    cur.execute(query)
    val = cur.fetchone()[0]

    query = "UPDATE ids SET " + type.lower() + " = " + type.lower() + " + 1;"
    cur.execute(query)

    conn.commit()
    conn.close()

    return type.upper() + str(val+1)


@dba.route('/users', methods=['GET'])
def get_users():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users;")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)

    return jsonify(list), 200

@dba.route('/user_type_count', methods=['GET'])
def get_user_type_count():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM users WHERE users.type='dba';")
    val_dba = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM users WHERE users.type='deo';")
    val_deo = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM users WHERE users.type='fdo';")
    val_fdo = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM users WHERE users.type='doc';")
    val_doc = cur.fetchone()[0]

    conn.close()

    return jsonify({"DBA": val_dba, "DEO": val_deo, "FDO": val_fdo, "DOC": val_doc}), 200

@dba.route('/users/dba', methods=['GET'])
def get_dbas():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='dba';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/users/deo', methods=['GET'])
def get_deos():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='deo';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/users/fdo', methods=['GET'])
def get_fdos():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='fdo';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/users/doc', methods=['GET'])
def get_docs():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='doc';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/user', methods=['GET'])
def get_user():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users;")
    val = cur.fetchall()
    conn.close()

    args = request.args
    searchString = args.get('search_string')

    list=[]

    if any(chr.isdigit() for chr in searchString):
        for i in val:
            if searchString.lower() in i[0].lower():
                dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
                list.append(dict)
    else:
        for i in val:
            if searchString.lower() in i[1].lower():
                dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
                list.append(dict)

    return jsonify(list), 200


# email the doctor about the addition
@dba.route('/users/add', methods=['POST'])
def add_user():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################
    
    req = request.get_json()
    name = req['name']
    ph_number = req['ph_number']
    type = req['type']
    address = req['address']
    password = req['password']
    user_id = generate_user_id(type)

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("INSERT INTO users (user_id, name, ph_number, password, type, address) VALUES (%s, %s, %s, %s, %s, %s);", (user_id, name, ph_number, password, type, address))
    conn.commit()
    conn.close()

    if type == 'doc':
        email = req['email']
        docType = req['docType'] 

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO doctors (doc_id, user_id, email, docType) VALUES (%s, %s, %s, %s);", (user_id, user_id, email, docType))
        conn.commit()
        conn.close()

        # email the doctor
        subject, body = generate_body_doctor(user_id,docType, password, name)
        # send_email([email],subject, body, [])

    return jsonify({"message": "User added successfully", "user_id":user_id}), 200

@dba.route('/users/delete', methods=['DELETE'])
def delete_user():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    req = request.get_json()
    user_id = req['user_id']

    if user_id == current_user_id:
        return jsonify(message = "Cannot delete self"), 403

    conn = get_db_connection()
    cur = conn.cursor()
    if user_id.startswith('DOC'):
        cur.execute("DELETE FROM doctors WHERE doc_id=%s;", (user_id,))

    cur.execute("DELETE FROM users WHERE user_id=%s;", (user_id,))

    # FULTIONALITY TO BE ADDED-----------------------------------------
    # type = user_id[0:3]
    # cur.execute("SELECT %s FROM ids;", (type.lower(),))
    # val = cur.fetchone()[0]
    # if str(val) in user_id and int(val) > 0:
    #     query = "UPDATE ids SET " + type.lower() + " = " + type.lower() + " - 1;"
    #     cur.execute(query)

    conn.commit()
    conn.close()

    return jsonify({"message": "User deleted successfully"}), 200

@dba.route('/users/update_pass', methods=['PUT'])
def update_user_pass():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['dba', 'fda', 'doc', 'deo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    req = request.get_json()
    user_id = req['user_id']
    password = req['password']

    if user_id!=current_user_id:
        return jsonify(message = "Cannot update password of other users"), 403

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM users WHERE user_id=%s;", (user_id,))
    val = cur.fetchone()[0]
    if(val == 0):
        return jsonify({"message": "Invalid user_id"}), 400

    cur.execute("UPDATE users SET password=%s WHERE user_id=%s;", (password, user_id))
    
    conn.commit()
    conn.close()

    return jsonify({"message": "Password updated successfully"}), 200

