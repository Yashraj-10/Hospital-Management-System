import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint
import datetime

fdo = Blueprint('fdo', __name__)

def reqDate_to_SQLdate(reqDate):
    year_str = reqDate[0:4]
    month_str = reqDate[5:7]
    day_str = reqDate[8:10]
    year = int(year_str)
    month = int(month_str)
    day = int(day_str)
    
    return datetime.date(year,month,day)

def generate_patient_id():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM patients;")
    val = cur.fetchone()[0]

    conn.commit()
    conn.close()

    return 'P' + str(val+1)

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

@fdo.route('/add_patient', methods=['POST'])
def add_patient():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('FDO') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()

    patient_id = generate_patient_id()

    dob = reqDate_to_SQLdate(data['dob'])

    cur.execute("INSERT INTO patients (patient_id, patient_name, dob, email, address, conditions, ph_number, gender) VALUES (%s, %s, %s, %s, %s, %s, %s, %s)", (patient_id, data['patient_name'], dob, data['email'], data['address'], data['conditions'], data['ph_number'], data['gender']))
    conn.commit()
    conn.close()

    return jsonify({"message": "Patient added successfully", "patient_id": patient_id}), 200


@fdo.route('/admit', methods=['POST'])
def admit():
    # token = request.headers.get('Authorization')
    # if check_token(token) == 0:
    #     return jsonify({"message": "Invalid token"}), 401

    # if token.startswith('FDO') == False:
    #     return jsonify({"message": "Unauthorized"}), 401

    data = request.get_json()               # request contains patient_id, room_type and admit_date
    conn = get_db_connection()
    cur = conn.cursor()
    patient_id = data['patient_id']
    room_type = data['room_type']
    admit_date = reqDate_to_SQLdate(data['admit_date'])
    # print (admit_date)

    cur.execute("SELECT count(*) FROM admit WHERE patient_id = %s AND admit_date <= %s AND discharge_date IS NULL;", (patient_id, admit_date))
    val = cur.fetchone()[0]

    if val>0:
        conn.commit()
        conn.close()
        return jsonify({"message": "Patient already admitted on that date"}), 400 
    
    cur.execute("SELECT count(*) FROM admit WHERE patient_id = %s AND admit_date > %s;", (patient_id, admit_date))
    val = cur.fetchone()[0]

    if val>0:
        conn.commit()
        conn.close()
        return jsonify({"message": "Patient already admitted on a later date"}), 400

    cur.execute("(SELECT room_no FROM room WHERE room_type = %s) EXCEPT ((SELECT room_no FROM admit WHERE admit_date <= %s AND discharge_date IS NULL) UNION (SELECT room_no FROM admit WHERE discharge_date IS NOT NULL AND admit_date <= %s AND %s <= discharge_date))", (room_type, admit_date, admit_date, admit_date))

    if "SELECT 0" in cur.statusmessage:
        conn.commit()
        conn.close()
        return jsonify({"message": "No rooms available"}), 400

    fin_room = cur.fetchone()[0]

    cur.execute("INSERT INTO admit (patient_id, room_no, admit_date, discharge_date) VALUES (%s, %s, %s, NULL);", (patient_id, fin_room, admit_date))

    conn.commit()
    conn.close()    

    return jsonify({"message": "Patient admitted successfully", "room_no": fin_room}), 200

# @fdo.route('/room_availability/dates', methods=['POST'])
# def room_availability_dates():


# @fdo.route('/discharge', methods=['POST'])
# def discharge():


# @fdo.route('/tests', methods=['GET'])
# def get_tests():


# @fdo.route('/test_appointment', methods=['POST'])
# def test_appointment():


# @fdo.route('/test_appointment/dates', methods=['GET'])
# def test_appointment_dates():


# @fdo.route('/test_appointment/slots', methods=['GET'])
# def test_appointment_slots():


# @fdo.route('/doc_appointment', methods=['POST'])
# def doc_appointment():


# @fdo.route('/doc_appointment/dates', methods=['GET'])
# def doc_appointment_dates():


# @fdo.route('/doc_appointment/slots', methods=['GET'])
# def doc_appointment_slots():
