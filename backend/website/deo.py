import os
import string
import psycopg2
from flask import Flask, request, jsonify, Blueprint

deo = Blueprint('deo', __name__)

def get_db_connection():
    conn = psycopg2.connect(host='127.0.0.1', database='hms', user="postgres", password="jarhasy", port=5432)
    return conn

def check_token(access_token):
    pass


# allow only data entry operator
@deo.route('/add_test_result', methods=['POST'])
def add_treatment():
    # request contains test_appointment_request_id
    # report_link, result, comment
    req = request.get_json()        
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM test_appointment WHERE test_appointment_result_id = \'"+req['test_appointment_result_id']+"\';")
    val = cur.fetchone()[0]

    if val != 1:
        conn.close()
        return jsonify(message="Invalid Test Id"), 401

    cur.execute("UPDATE test_appointment SET report_link = \'"+req['report_link']+"\', result = \'"+req['result']+"\', comment = \'"+ req['comment']+ "\' WHERE test_appointment_result_id = \'"+req['test_appointment_result_id']+"\';")

    conn.commit()
    conn.close()

    return jsonify(message="Test Updated"), 200



# allow doctor and data entry operator
@deo.route('add_treatment', methods=["POST"])
def add_test_result():
    req = request.get_json()
    # we obtain doc_appointment_id and treatment in the string
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT count(*) FROM doc_appointment WHERE doc_appointment_id = \'"+req['doc_appointment_id']+"\';")
    val = cur.fetchone()[0]

    if val != 1:
        conn.close()
        return jsonify(message="Invalid treatment Id"), 401
    
    # can simplify using fetchall()
    cur.execute("SELECT treatment FROM doc_appointment WHERE doc_appointment_id = \'"+req['doc_appointment_id']+"\';")
    treatment = cur.fetchone()[0]
    if treatment == "":
        treatment += req['treatment']
    else:
        treatment += (","+req['treatment'])
    

    cur.execute("UPDATE doc_appointment SET treatment = \'"+treatment+"\' WHERE doc_appointment_id = \'"+req['doc_appointment_id']+"\';")
    conn.commit()
    conn.close()

    return jsonify(message="Treatment Updates"), 200
    


    

    