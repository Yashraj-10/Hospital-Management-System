import json
import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint
from .auth import check_token, get_db_connection
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

def generate_test_appointment_result_id():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM test_appointment;")
    val = cur.fetchone()[0]

    conn.commit()
    conn.close()

    return 'TAR' + str(val+1)

def generate_doc_appointment_id():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM doc_appointment;")
    val = cur.fetchone()[0]

    conn.commit()
    conn.close()

    return 'DA' + str(val+1)

def generate_patient_id():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM patients;")
    val = cur.fetchone()[0]

    conn.commit()
    conn.close()

    return 'P' + str(val+1)


@fdo.route('/add_patient', methods=['POST'])
def add_patient():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

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
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    data = request.get_json()               # request contains patient_id, room_type and admit_date
    conn = get_db_connection()
    cur = conn.cursor()
    patient_id = data['patient_id']
    room_type = data['room_type']
    admit_date = reqDate_to_SQLdate(data['admit_date'])
    # print (admit_date)

    cur.execute("SELECT count(*) from patients WHERE patient_id = '"+patient_id+"';")
    val = cur.fetchone()[0]
    if val == 0:
        return jsonify(message="Patient Id does not exist"), 404


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

@fdo.route('/discharge', methods=['POST'])
def discharge():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    data = request.get_json()               # request contains patient_id and discahrge date is the current date

    conn = get_db_connection()
    cur = conn.cursor()
    
    patient_id = data['patient_id']
    discharge_date = datetime.date.today()

    cur.execute("SELECT count(*) FROM admit WHERE patient_id = %s AND admit_date <= %s AND discharge_date IS NULL;", (patient_id, discharge_date))
    val = cur.fetchone()[0]
    # print(val + " " + patient_id + " " + discharge_date)
    if val==0:
        conn.commit()
        conn.close()
        return jsonify({"message": "Patient not admitted on that date"}), 400
    
    cur.execute("UPDATE admit SET discharge_date = %s WHERE patient_id = %s AND admit_date <= %s AND discharge_date IS NULL;", (discharge_date, patient_id, discharge_date))

    conn.commit()
    conn.close()

    return jsonify({"message": "Patient discharged successfully"}), 200

@fdo.route('/tests', methods=['POST'])
def get_tests():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    conn = get_db_connection()
    cur = conn.cursor()
    cur.execute("SELECT * FROM test")
    val = cur.fetchall()

    list=[]
    for i in val:
        dict = {"test_id":i[0], "test_name":i[1]}
        list.append(dict)
    
    conn.close()

    return jsonify(list), 200

@fdo.route('/test_appointment', methods=['POST'])
def test_appointment():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    data = request.get_json()               # request contains patient_id, test_id and start_time
    patient_id = data['patient_id']
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) from patients WHERE patient_id = '"+patient_id+"';")
    val = cur.fetchone()[0]
    if val == 0:
        return jsonify(message="Patient Id does not exist"), 404


    test_appointment_result_id = generate_test_appointment_result_id()
    test_id = data['test_id']
    start_time = str(data['start_time'])
    end_time = start_time[0:11] + str(int(start_time[11:13])+1) + start_time[13:]

    
    cur.execute("INSERT INTO test_appointment (test_appointment_result_id, test_id, patient_id, start_time, end_time, test_status, report_link, result, comment) VALUES (%s, %s, %s, %s, %s, %s, NULL, NULL, NULL);", (test_appointment_result_id, test_id, patient_id, start_time, end_time, "0"))

    conn.commit()
    conn.close()

    return jsonify({"message": "Test appointment booked successfully", "test_appointment_result_id": test_appointment_result_id}), 200

@fdo.route('/test_appointment/dates', methods=['POST'])
def test_appointment_dates():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    args = request.args
    test_id = args['test_id']

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT DISTINCT test_date FROM test_slots WHERE test_id = %s AND test_date >= %s;", (test_id, datetime.date.today()))
    val = cur.fetchall()

    list=[]
    for i in val:
        list.append({"date":i[0].strftime('%Y-%m-%d')})
    
    conn.close()

    return jsonify(list), 200


@fdo.route('/test_appointment/slots', methods=['POST'])
def test_appointment_slots():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    args = request.args
    test_id = args['test_id']
    test_date = reqDate_to_SQLdate(args['date'])
    test_date_begin = str(test_date) + " 00:00:00"
    test_date_end = str(test_date) + " 23:59:59"

    conn = get_db_connection()
    cur = conn.cursor()

    uniqueSet = {}

    cur.execute("SELECT test_slot FROM test_slots WHERE test_id = %s AND test_date = %s", (test_id, test_date))
    allSlots = cur.fetchall()
    for mid in allSlots:
        slots = mid[0].split(',')
        for slot in slots:
            n1 = int(slot[0:4])
            n2 = int(slot[4:8])
            while n1 < n2:
                uniqueSet[n1] = 1
                n1 += 100
    print (uniqueSet)

    cur.execute("SELECT start_time FROM test_appointment WHERE test_id = %s AND start_time >= %s AND start_time <= %s", (test_id, test_date_begin, test_date_end))
    bookedSlots = cur.fetchall()
    for mid in bookedSlots:
        midx = str(mid[0])
        bookedSlot = midx[11]+midx[12]+midx[14]+midx[15]
        n1 = int(bookedSlot[0:4])
        uniqueSet[n1] = 0

    list=[]
    for slot in uniqueSet:
        if uniqueSet[slot] == 1:
            start = str(slot)
            end = str(slot+100)
            list.append({"slot":start+"-"+end})
    
    conn.close()

    return jsonify(list), 200

@fdo.route('/doc_appointment', methods=['POST'])
def doc_appointment():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    data = request.get_json()               # request contains patient_id, doc_id and start_time and symptoms
    conn = get_db_connection()
    cur = conn.cursor()
    
    patient_id = data['patient_id']
    cur.execute("SELECT count(*) from patients WHERE patient_id = '"+patient_id+"';")
    val = cur.fetchone()[0]
    if val == 0:
        return jsonify(message="Patient Id does not exist"), 404


    doc_appointment_id = generate_doc_appointment_id()
    doc_id = data['doc_id']
    start_time = str(data['start_time'])
    symptoms = data['symptoms']

    giventime = datetime.datetime.strptime(start_time, '%Y-%m-%d %H:%M:%S')
    end_time = giventime + datetime.timedelta(minutes=15)

    
    cur.execute("INSERT INTO doc_appointment (doc_appointment_id, doc_id, patient_id, start_time, end_time, appointment_status, symptoms, treatment) VALUES (%s, %s, %s, %s, %s, %s, %s, %s);", (doc_appointment_id, doc_id, patient_id, start_time, end_time, '0', symptoms, ''))
    
    conn.commit()
    conn.close()

    return jsonify({"message": "Doctor appointment booked successfully", "doc_appointment_id": doc_appointment_id}), 200

@fdo.route('/doc_appointment/dates', methods=['POST'])
def doc_appointment_dates():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    args = request.args
    doc_id = args['doc_id']

    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT DISTINCT doc_date FROM doc_slots WHERE doc_id = %s AND doc_date >= %s;", (doc_id, datetime.date.today()))
    val = cur.fetchall()

    list=[]
    for i in val:
        list.append({"date":i[0].strftime('%Y-%m-%d')})
    
    conn.close()

    return jsonify(list), 200

@fdo.route('/doc_appointment/slots', methods=['POST'])
def doc_appointment_slots():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['fdo'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    args = request.args
    doc_id = args['doc_id']
    doc_date = reqDate_to_SQLdate(args['date'])
    doc_date_begin = str(doc_date) + " 00:00:00"
    doc_date_end = str(doc_date) + " 23:59:59"

    conn = get_db_connection()
    cur = conn.cursor()

    uniqueSet = {}

    cur.execute("SELECT doc_slot FROM doc_slots WHERE doc_id = %s AND doc_date = %s", (doc_id, doc_date))
    allSlots = cur.fetchall()
    for mid in allSlots:
        slots = mid[0].split(',')
        for slot in slots:
            n1 = int(slot[0:4])
            n2 = int(slot[4:8])
            while n1 < n2:
                uniqueSet[n1] = 1
                n1 += 15
                if n1%100 >= 60:
                    n1 += 40

    cur.execute("SELECT start_time FROM doc_appointment WHERE doc_id = %s AND start_time >= %s AND start_time <= %s", (doc_id, doc_date_begin, doc_date_end))
    bookedSlots = cur.fetchall()
    for mid in bookedSlots:
        midx = str(mid[0])
        bookedSlot = midx[11]+midx[12]+midx[14]+midx[15]
        n1 = int(bookedSlot[0:4])
        uniqueSet[n1] = 0

    list=[]
    for slot in uniqueSet:
        if uniqueSet[slot] == 1:
            start = str(slot)
            end = str(slot+15)
            if int(end)%100 >= 60:
                end = str(int(end)+40)
            list.append({"slot":start+"-"+end})

    conn.close()

    return jsonify(list), 200