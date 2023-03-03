import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint
from datetime import datetime

doc = Blueprint('doc', __name__)

def get_db_connection():
    conn = psycopg2.connect(host='127.0.0.1', database='hms', user="postgres", password="jarhasy", port=5432)
    return conn

def check_token(access_token):
    pass

# only accessabe to the doctor
@doc.route('/appointments', methods = ["GET"])
def get_fixed_appointments():
    # will get doc_id in the json
    req = request.get_json()
    conn = get_db_connection()
    cur = conn.cursor()
    # return "SELECT count(*) FROM doctors WHERE doc_id = \'"+req['doc_id']+"\';"

    cur.execute("SELECT count(*) FROM doctors WHERE doc_id = \'"+req['doc_id']+"\';")
    val = cur.fetchone()[0]

    if val != 1:
        conn.close()
        return jsonify(message="Invalid Doctor Id"), 401


    # get all the appointments of the doctor for the day
    cur.execute("SELECT start_time, end_time, patient_id FROM doc_appointment WHERE doc_id = \'"+req['doc_id']+"\';")
    data = cur.fetchall()
    if len(data) == 0:
        return jsonify(message="No records found"), 200
    
    return_list = []
    for row in data:
        dictn = {}
        # row[0] start time, row[1] end time, row[2] patient_id
        # comapre start time with today time
        today = datetime.today().strftime('%Y-%m-%d %H:%M:%S')
        today = today.rsplit(" ")
        # today[0] is the date

        # converting to string
        temp1 = row[0].strftime('%Y-%m-%d %H:%M:%S')
        temp2 = row[1].strftime('%Y-%m-%d %H:%M:%S')

        # x[0] is the date
        x = temp1.rsplit(" ")

        if today[0] != x[0]:
            # get patient name from patient id
            cur.execute("SELECT patient_name FROM patients WHERE patient_id = \'"+row[2]+'\';')
            pat_name = cur.fetchone()[0]

            dictn.update({"start_time" : temp1,"end_time" : temp2,"patient_name" : pat_name}) 
        return_list.append(dictn) 

    return jsonify(return_list), 200


# @doc.route('/appointments', methods = ["GET"])
# def get_appointments():
#     pass

# @doc.route('/appointments', methods = ["GET"])
# def get_appointments():
#     pass