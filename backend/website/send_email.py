# Send Email Module
#Description: Send email with attachment
import smtplib
from os.path import basename
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
from os import getenv
import json
import os
import psycopg2
from datetime import datetime, date, timedelta
load_dotenv()
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
def get_db_connection():
    conn = psycopg2.connect(host=getenv('SUPABASE_HOST'), database=getenv("SUPABASE_DATABASE"), user=getenv("SUPABASE_USER"), password=getenv("SUPABASE_PASSWORD"), port=getenv('SUPABASE_PORT'))
    return conn

def send_email(receiver, subject, body, attachment):
    sender = 'admin@AzadHospital.email'
    msg = MIMEMultipart()
    msg['Subject'] = subject
    msg['To'] = ','.join(receiver)
    msg['From'] = sender
    msg.attach(MIMEText(body, 'plain'))
    for file in attachment:
        filename = file
        with open(filename, 'rb') as f:
            part = MIMEApplication(f.read(),Name=basename(filename))
        part['Content-Disposition'] = 'attachment; filename="{}"'.format(basename(filename))
        msg.attach(part)
    # print(basename(filename))
    link = getenv('MAILGUN_LINK')
    port = getenv('MAILGUN_PORT')
    user = getenv('MAILGUN_USER')
    password = getenv('MAILGUN_PASSWORD')
    with smtplib.SMTP(link, port) as server:
        server.login(user, password)
        server.sendmail(sender, receiver, msg.as_string())
        print("Successfully sent email")
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

    return return_list
if __name__ == "__main__":
    docList=send_summary_email()
    for doc in docList:
        send_email([doc['email']],doc['subject'],doc['body'],[])
    # send_email(['rsh-raj@yandex.ru',], 'Test', 'Testing multiple participant', [])
