import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint

dba = Blueprint('dba', __name__)

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

def get_db_connection():
    conn = psycopg2.connect(host='127.0.0.1', database='hms', user="postgres", password="jarhasy", port=5432)
    return conn

def check_token(token):
    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT count(*) FROM users WHERE access_token = %s", (token,))
    val = cur.fetchone()[0]
    conn.close()
    return val

@dba.route('/users', methods=['GET'])
def get_users():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

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
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM users WHERE users.type='DBA';")
    val_dba = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM users WHERE users.type='DEO';")
    val_deo = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM users WHERE users.type='FDO';")
    val_fdo = cur.fetchone()[0]
    cur.execute("SELECT count(*) FROM users WHERE users.type='DOC';")
    val_doc = cur.fetchone()[0]

    conn.close()

    return jsonify({"DBA": val_dba, "DEO": val_deo, "FDO": val_fdo, "DOC": val_doc}), 200

@dba.route('/users/dba', methods=['GET'])
def get_dbas():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='DBA';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/users/deo', methods=['GET'])
def get_deos():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='DEO';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/users/fdo', methods=['GET'])
def get_fdos():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='FDO';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/users/doc', methods=['GET'])
def get_docs():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users WHERE users.type='DOC';")
    val = cur.fetchall()
    conn.close()

    list=[]
    for i in val:
        dict = {"user_id":i[0], "name":i[1], "ph_number":i[2], "type":i[3], "address":i[4]}
        list.append(dict)


    return jsonify(list), 200

@dba.route('/user', methods=['GET'])
def get_user():
        # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT user_id, name, ph_number, type, address FROM users;")
    val = cur.fetchall()
    conn.close()

    args = request.args
    searchString = args.get('searchString')

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

@dba.route('/users/add', methods=['POST'])
def add_user():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401
    
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

    if type == 'DOC':
        email = req['email']
        docType = req['docType'] 

        conn = get_db_connection()
        cur = conn.cursor()
        cur.execute("INSERT INTO doctors (doc_id, user_id, email, docType) VALUES (%s, %s, %s, %s);", (user_id, user_id, email, docType))
        conn.commit()
        conn.close()

    return jsonify({"message": "User added successfully", "user_id":user_id}), 200

@dba.route('/users/delete', methods=['DELETE'])
def delete_user():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    req = request.get_json()
    user_id = req['user_id']

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
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('DBA') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    req = request.get_json()
    user_id = req['user_id']
    password = req['password']

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
