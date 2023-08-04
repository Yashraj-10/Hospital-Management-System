import os
import string
import psycopg2
from flask import Flask, request, jsonify, Blueprint
from .auth import check_token, get_db_connection
from .send_email import send_email
import smtplib
from os.path import basename
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
from os import getenv
load_dotenv()

deo = Blueprint('deo', __name__)


def generate_body(id,name, link, result):
    sub = "Test report results"
    body = "Hello Mr./Mrs. " + name + ",\n Hope you are doing good !\n Your results for the test with Id : "+id +" are "+result+".\nYou can access the report in detail at the link : "+link

    return sub, body


# allow only data entry operator and doc
# mail to be sent in this
@deo.route('/add_test_result', methods=['POST'])
def add_treatment():
    # request contains test_appointment_request_id
    # report_link, result, comment
    req = request.get_json()   

    # snipped to be added to every endpoint
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['deo', 'doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 69
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    # snippet over


    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT patient_id FROM test_appointment WHERE test_appointment_result_id = \'"+req['test_appointment_result_id']+"\';")
    data = cur.fetchall()

    if len(data) != 1:
        conn.close()
        return jsonify(message="Invalid Test Id"), 401
    
    temp = data[0]
    patient_id = temp[0]
    cur.execute("SELECT patient_id, email, patient_name FROM patients WHERE patient_id = \'"+patient_id+"\';")
    data = cur.fetchall()
    temp = data[0]

    id = req['test_appointment_result_id']
    email = temp[1]
    name = temp[2]
    link = req['report_link']
    result = req['result']

    cur.execute("UPDATE test_appointment SET test_status = \'1\', report_link = \'"+req['report_link']+"\', result = \'"+req['result']+"\', comment = \'"+ req['comment']+ "\' WHERE test_appointment_result_id = \'"+req['test_appointment_result_id']+"\';")

    conn.commit()
    conn.close()

    # initiate mailing procedure
    subject, body = generate_body(id,name, link, result)
    # send_email([email],subject, body, [])

    return jsonify(message="Test Updated"), 200



# allow doctor and data entry operator
@deo.route('/add_treatment', methods=["POST"])
def add_test_result():
    req = request.get_json()

    # snipped to be added to every endpoint
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['deo', 'doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 69
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    # snippet over
    # we obtain doc_appointment_id and treatment in the string
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT doc_id FROM doc_appointment WHERE doc_appointment_id = \'"+req['doc_appointment_id']+"\';")
    val = cur.fetchall()

    if len(val) != 1:
        conn.close()
        return jsonify(message="Invalid treatment Id"), 401
    
    if current_user_id.replace(" ","") != val[0][0].replace(" ","") and current_user_id[1] == 'O':
        return jsonify(message="Can not add treatment"), 401 
    

    # can simplify using fetchall()
    cur.execute("SELECT treatment FROM doc_appointment WHERE doc_appointment_id = \'"+req['doc_appointment_id']+"\';")
    treatment = cur.fetchone()[0]
    if treatment == "":
        treatment += req['treatment']
    else:
        treatment += (","+req['treatment'])
    

    # update the treatment_status
    cur.execute("UPDATE doc_appointment SET appointment_status = \'1\', treatment = \'"+treatment+"\' WHERE doc_appointment_id = \'"+req['doc_appointment_id']+"\';")
    conn.commit()
    conn.close()

    return jsonify(message="Treatment Updated"), 200
    


    

    