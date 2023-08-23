# Send Email Module
#Description: Send email with attachment
import smtplib
from os.path import basename
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.application import MIMEApplication
from dotenv import load_dotenv
from os import getenv
load_dotenv()


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


if __name__ == "__main__":
    
    send_email(['rsh-raj@yandex.ru',], 'Test', 'Testing multiple participant', [])
