import json
import os
import psycopg2
from flask import Flask, request, jsonify, Blueprint
from datetime import datetime, date, timedelta
from .auth import check_token, get_db_connection
from .send_email import send_email

doc = Blueprint('doc', __name__)

def generate_body_for_summary(app_data, name):
    sub = "Summary for the week"
    body = "Hello Mr./Mrs. "+name+"\nHere is the summary of appointments that you had in this week:\n"

    # row[0] : app_id, row[1] : patient_id, row[2] : symptoms, row[3] : treatment, row[4] : start_time
    i = 1
    for row in app_data:
        information = ""
        start_time = row[4].strftime('%Y-%m-%d')
        information += str(i) 

        if row[2] is None:
            symptoms = ''
        else:
            symptoms = row[2]

        if row[3] is None:
            row[3] = ''

        information2 = (". Appointment Id : " + row[0] + ", Patient_id : " + row[1] + ", Symptoms : "+symptoms + ", Treatment : " + row[3] + ", Date : " + start_time + "\n")
        information += information2
        body += information
        i += 1

    return sub, body
     

def age(birthdate):
    today = date.today()
    age = today.year - birthdate.year - ((today.month, today.day) < (birthdate.month, birthdate.day))
    return age

def get_patient_entire_info(patient_id, cur, pat_info):
    # only get the appointment and treatment information
    cur.execute("SELECT doc_appointment_id, start_time, symptoms, treatment, doc_id FROM doc_appointment WHERE patient_id = \'"+patient_id+"\' AND appointment_status = \'1\' ORDER BY start_time DESC;")
    data = cur.fetchall()

    list_return = []

    appointments = []
    # every row is an appointment
    for row in data:
        dictn = {}
        st_time = row[1].strftime('%Y-%m-%d')
        dictn.update({"doc_appointment_id" : row[0], "symptoms" : row[2], "treatment" : row[3], "start_time" : st_time})

        # geting doc info
        doc_id = row[4]
        cur.execute("SELECT user_id, name, ph_number FROM users WHERE user_id = \'"+doc_id+"\';")
        user_data = cur.fetchall()
        temp = user_data[0]
        dictn.update({"doc_id" : temp[0], "doc_name" : temp[1], "doc_number" : temp[2]})

        cur.execute("SELECT docType, email FROM doctors WHERE doc_id = \'"+doc_id+"\';")
        doc_data = cur.fetchall()
        temp = doc_data[0]
        dictn.update({"doc_email" : temp[1], "docType" : temp[0]})

        appointments.append(dictn)

    # getting test information

    # cur.execute("SELECT test_appointment_result_id, test_id, start_time, report_link, result, comment FROM test_appointment WHERE patient_id = \'"+patient_id+"\' AND test_status = \'1\';")
    cur.execute("SELECT test_appointment_result_id, test_id, start_time, report_link, result, comment FROM test_appointment WHERE patient_id = \'"+patient_id+"\' ORDER BY start_time DESC;")

    data = cur.fetchall()

    tests = []
    # every row is a test
    for row in data:
        dictn = {}
        st_time = row[2].strftime('%Y-%m-%d')
        dictn.update({"test_appointment_result_id" : row[0], "test_id" : row[1], "start_time" : st_time, "report_link" : row[3], "result" : row[4], "comment" : row[5]})

        # getting test info
        test_id = row[1]
        cur.execute("SELECT test_name FROM test WHERE test_id = \'"+test_id+"\';")
        testname = cur.fetchone()[0]
        dictn.update({"test_name" : testname})

        tests.append(dictn)

    # also return the admit history of the patient
    cur.execute("SELECT room_no, admit_date, discharge_date FROM Admit WHERE patient_id = \'"+patient_id+"\' ORDER BY admit_date DESC;")

    data = cur.fetchall()
    admit_history = []
    for rows in data:
        dictn = {}
        ad_time = rows[1].strftime('%Y-%m-%d')
        dictn.update({"room_no":rows[0], "admit_date" : ad_time})
        if rows[2]:
            dis_time = rows[2].strftime('%Y-%m-%d')
            dictn.update({"discharge_time" : dis_time})
        else:
            dictn.update({"discharge_time" : "Still Admit"})

            
        admit_history.append(dictn)


    # try to make it better
    list_return.append({
        "prev_appointments" : appointments,
        "patient_info" : pat_info,
        "prev_tests" : tests,
        "admit_history" : admit_history
    })

    return list_return


def get_patients(doc_id, cur):
    # we want name age conditions Treatments start_date
    # assumeed that appointment status 1 means it is done
    cur.execute("SELECT patient_id, start_time, treatment, doc_appointment_id FROM doc_appointment WHERE doc_id = \'"+doc_id+"\' AND appointment_status = \'1\' ORDER BY start_time DESC;")
    data = cur.fetchall()

    if len(data) == 0:
        return []

    list_return = []

    for row in data:
        dictn = {}
        patient_id = row[0]
        time = row[1].strftime('%Y-%m-%d')
        dictn.update({"start_time" : time,"treatment" : row[2],"patient_id" : patient_id, "doc_appointment_id" : row[3]}) 

        # getting the patient data
        cur.execute("SELECT patient_name, dob, conditions, gender FROM patients WHERE patient_id = \'"+patient_id+"\';")
        patient_data = cur.fetchall()

        # getting the age from dob
        for row2 in patient_data:
            pat_age = age(row2[1])
            dictn.update({"age" : pat_age, "patient_name" : row2[0], "conditions" : row2[2], "gender" : row2[3]})

            list_return.append(dictn)
            break

    return list_return


# only accessabe to the doctor
@doc.route('/appointments', methods = ["POST"])
def get_fixed_appointments():
    # will get doc_id in the json
    req = request.get_json()

    # snipped to be added to every endpoint
    access_token = req['access_token']

    val, current_user_id= check_token(access_token, ['doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    # snippet over

    conn = get_db_connection()
    cur = conn.cursor()
    # return "SELECT count(*) FROM doctors WHERE doc_id = \'"+req['doc_id']+"\';"

    cur.execute("SELECT count(*) FROM doctors WHERE doc_id = \'"+current_user_id+"\';")
    val = cur.fetchone()[0]

    if val != 1:
        conn.close()
        return jsonify(message="Invalid Doctor Id"), 401

    # get all the appointments of the doctor for the day
    cur.execute("SELECT start_time, end_time, patient_id, doc_appointment_id FROM doc_appointment WHERE doc_id = \'"+current_user_id+"\' AND appointment_status = '0' ORDER BY start_time;")
    data = cur.fetchall()
    if len(data) == 0:
        return jsonify([]), 200
    

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

        if today[0] <= x[0]:
            # get patient name from patient id
            cur.execute("SELECT patient_name, gender, dob FROM patients WHERE patient_id = \'"+row[2]+"\';")
            data2 = cur.fetchall()

            for row2 in data2:
                dictn.update({"patient_name" : row2[0], "doc_appointment_id" : row[3], "gender" : row2[1], "age" : age(row2[2])}) 
                if today[0] == x[0]:
                    dictn.update({"start_time" : temp1,"end_time" : temp2, "today" : 1})
                else : 
                    dictn.update({"start_time" : x[0],"end_time" : x[0],  "today" : 0})
                return_list.append(dictn) 
                break

    conn.close()
    return jsonify(return_list), 200


@doc.route('/patient', methods = ["POST"])
def get_patient_details():
    # query parameters
    args = request.args
    args.to_dict()
    req = request.get_json()


    # snipped to be added to every endpoint
    access_token = req['access_token']
    if access_token is None:
        print("access_token is missing")
        return jsonify(message="Access Token Missing"), 401
    val, current_user_id = check_token(access_token, ['doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    # snippet over


    doc_id = args.get('doc_id')
    search_string = args.get('search_string')
    # return [doc_id, search_string]
    # return [current_user_id, doc_id]
    current_user_id = current_user_id.replace(" ", "")

    return_list = []

    if doc_id is not None:
        if doc_id != current_user_id:
            return jsonify(message = "Invalid Doctor Id"), 403

        # we want to get the patients treated by the doctor
        conn = get_db_connection()
        cur = conn.cursor()

        return_list = get_patients(doc_id, cur)
        conn.close()
        return jsonify(return_list), 200

    # from search string, we get a list of possible patients
    # all info can only be fetched using patient_id
    elif search_string is not None:
        # we want entire patient data including appointments and tests
        # if search string is patient_id
        conn = get_db_connection()
        cur = conn.cursor()

        cur.execute("SELECT patient_id, patient_name, dob, email, address, conditions, gender FROM patients WHERE patient_id = \'"+search_string+"\';")
        data = cur.fetchall()
        return_list = []
        pat_info = {}

        if len(data) == 1:
            # it is patient_id


            # doctor and patient must have an appointment in common
            cur.execute("SELECT count(*) FROM doc_appointment WHERE patient_id = \'"+search_string+"\' AND doc_id = \'" + current_user_id+"\' AND appointment_status = '1';")
            val = cur.fetchone()[0]
            if val == 0:
                return jsonify([]), 200


            temp = data[0]
            pat_info.update({"patient_id" : temp[0],
            "patient_name" : temp[1],
            "email" : temp[3],
            "address" : temp[4],
            "conditions" : temp[5],
            "age" : age(temp[2]),
            "gender" : temp[6]})

            return_list = get_patient_entire_info(search_string, cur, pat_info)

            conn.close()
            return jsonify(return_list), 200
        
        # it may be search string or data may not exist
        search_string = search_string.lower()
        # correct this
        cur.execute("SELECT patients.patient_id, patients.patient_name, patients.dob, patients.conditions, doc_appointment.doc_appointment_id, doc_appointment.doc_id, patients.gender, doc_appointment.treatment, doc_appointment.start_time FROM patients JOIN doc_appointment ON patients.patient_id=doc_appointment.patient_id WHERE (LOWER(patients.patient_name) LIKE \'%"+search_string+"%\' AND doc_appointment.doc_id = \'"+current_user_id+"\' AND doc_appointment.appointment_status = '1') ORDER BY start_time DESC;")

        data = cur.fetchall()

        if len(data) == 0:
            return jsonify([]), 200


        for row in data:
            dictn={}
            st_time = row[8].strftime('%Y-%m-%d')
            dictn.update({"patient_id":row[0], "patient_name":row[1], "age":age(row[2]), "conditions": row[3], "doc_appointment_id":row[4], "gender":row[6], "treatment" : row[7], "start_time": st_time})
            return_list.append(dictn)

            conn.close()
        return jsonify(return_list), 200


    else: 
        return jsonify(message= "Invalid URL"), 401


@doc.route('/doc_appointment_info', methods = ["POST"])
def doc_appointment_info():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    args = request.args
    appointment_id = args.get('id')
    date = args.get('date')

    conn = get_db_connection()
    cur = conn.cursor()

    return_list = []
    if appointment_id:
        cur.execute("SELECT patients.patient_id, patients.patient_name, patients.dob, doc_appointment.symptoms, doc_appointment.treatment, doc_appointment.doc_appointment_id, doc_appointment.start_time, patients.gender FROM patients JOIN doc_appointment ON patients.patient_id=doc_appointment.patient_id WHERE doc_appointment.doc_id = \'"+current_user_id+"\' AND appointment_status = \'1\' AND doc_appointment_id = \'"+appointment_id+"\';")
        data = cur.fetchall()

        if len(data) == 0:
            return jsonify(message = "No such appointments"), 404

        for row in data:
            dictn = {}
            st_time = row[6].strftime('%Y-%m-%d %H:%M:%S')
            dictn.update({"doc_appointment_id" : appointment_id, "patient_id" : row[0], "patient_name":row[1], "age" : age(row[2]), "symptoms" : row[3], "treatment" : row[4], "start_time" : st_time, "gender" : row[7]})
            return_list.append(dictn)

        conn.close()
        return jsonify(return_list), 200

    # not working
    # if date:
    #     # return the appointment info of all appointments that day of that doctor
    #     cur.execute("SELECT patients.patient_id, patients.patient_name, patients.dob, doc_appointment.doc_appointment_id, doc_appointment.start_time, patients.gender FROM patients JOIN doc_appointment ON patients.patient_id=doc_appointment.patient_id WHERE (doc_appointment.doc_id = \'"+current_user_id+"\' AND appointment_status = \'1\' AND start_time BETWEEN \'"+date+"\' AND (SELECT \'"+date+"\'+ interval '1 day';));")
    #     data = cur.fetchall()

    #     if len(data) == 0:
    #         return jsonify(message = "No such appointments"), 404

    #     for row in data:
    #         dictn = {}
    #         st_time = row[4].strftime('%Y-%m-%d %H:%M:%S')
    #         dictn.update({"doc_appointment_id" : row[3], "patient_id" : row[0], "patient_name":row[1], "age" : age(row[2]), "start_time" : st_time, "gender" : row[5]})
    #         return_list.append(dictn)

    #     conn.close()
    #     return jsonify(return_list), 200

@doc.route('/doctor/add_slot', methods = ["POST"])
def add_slot_for_doctor():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    # take slot data and create slot in slot table
    date = req['date']
    slot = req['slot']
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT COUNT(*) FROM doc_slots WHERE doc_id = '"+current_user_id+"' AND doc_date = '"+date+"';")
    val = cur.fetchone()[0]

    if val != 0:
        return jsonify(message="Slot already selected for that day"), 401

    cur.execute("INSERT INTO doc_slots (doc_id, doc_slot, doc_date) VALUES ('"+current_user_id+"', '"+slot+"','"+date+"');")

    conn.commit()
    conn.close()

    return jsonify(message="Slot added successfully", on_date = date), 200




@doc.route('/test_result_info', methods = ["POST"])
def test_result_info():
    #######################################
    req = request.get_json()
    access_token = req['access_token']

    val, current_user_id = check_token(access_token, ['doc'])
    if val == 401:
        return jsonify(message = "Unidentified User"), 401
    elif val == 69:
        return jsonify(message = "User Session Expired"), 401
    elif val == 403:
        return jsonify(message = "Page Forbidden for user"), 403

    ########################################

    args = request.args
    test_appointment_id = args.get('id')

    conn = get_db_connection()
    cur = conn.cursor()

    return_list = []
    if test_appointment_id:
        cur.execute("SELECT patients.patient_id, patients.patient_name, patients.dob, test_id, start_time, report_link, result, comment, patients.gender FROM patients JOIN test_appointment ON patients.patient_id=test_appointment.patient_id WHERE (test_status = \'1\' AND test_appointment_result_id = \'"+test_appointment_id+ "\');")

        data = cur.fetchall()
        if len(data) == 0:
            return jsonify(message="no test result found"), 401

        for row in data:
            dictn = {}
            st_time = row[4].strftime('%Y-%m-%d %H:%M:%S')
            dictn.update({"test_appointment_result_id" : test_appointment_id, "patient_id" : row[0], "patient_name":row[1], "age" : age(row[2]), "start_time" : st_time, "gender" : row[5], "report_link" : row[5], "result" : row[6], "comment" : row[7], "gender" : row[8], "test_id" : row[3]})
            return_list.append(dictn)

        return jsonify(return_list), 200
    
    else :
        return [], 404


@doc.route('/doctor/send_summary', methods = ["POST"])
def send_summary_email():
    conn = get_db_connection()
    cur = conn.cursor()

    cur.execute("SELECT users.user_id, users.name, doctors.email FROM users JOIN doctors ON users.user_id = doctors.doc_id;")
    data = cur.fetchall()
    current_time = (datetime.now()).strftime('%Y-%m-%d')
    before_time = (datetime.now() - timedelta(days=7)).strftime('%Y-%m-%d')

    return_list = []
    for row in data:
        # use this user id to get the message
        dictn = {}
        cur.execute("SELECT doc_appointment_id, patient_id, symptoms, treatment, start_time FROM doc_appointment WHERE doc_id = '"+row[0]+"' AND start_time BETWEEN '"+before_time+"' AND '"+current_time+"';")
        app_data = cur.fetchall()

        sub, body = generate_body_for_summary(app_data, row[1]) 
        # send_email([row[2]],sub, body, []) 
        dictn.update({"email" : row[2], "subject" : sub, "body" : body})
        return_list.append(dictn)

    return jsonify(return_list), 200