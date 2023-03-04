CREATE DATABASE hms;

-- Table 1
CREATE TABLE IF NOT EXISTS Users (
    user_id CHAR(10) NOT NULL ,
    name VARCHAR(100) NOT NULL,
    ph_number CHAR(12) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type CHAR(3) NOT NULL,
    address VARCHAR(255) NOT NULL,
    access_token VARCHAR(1000),
    access_token_expiry TIMESTAMP,
    PRIMARY KEY (user_id)
);

-- Table 2
CREATE TABLE IF NOT EXISTS Doctors (
    doc_id CHAR(10) NOT NULL ,
    docType VARCHAR(20) NOT NULL,
    email VARCHAR(255) NOT NULL,
    user_id CHAR(10) NOT NULL,
    PRIMARY KEY (doc_id),
    FOREIGN KEY (user_id) REFERENCES Users(user_id)
);

-- Table 3
CREATE TABLE IF NOT EXISTS Patients (
    patient_id CHAR(10) NOT NULL ,
    patient_name VARCHAR(100) NOT NULL,
    dob TIMESTAMP NOT NULL,
    email VARCHAR(255) NOT NULL,
    address VARCHAR(255) NOT NULL,
    conditions VARCHAR(255),
    PRIMARY KEY (patient_id)
);

-- Table 4
CREATE TABLE IF NOT EXISTS Room (
    room_no VARCHAR(5) NOT NULL,
    room_type VARCHAR(20) NOT NULL,
    PRIMARY KEY (room_no) 
);

-- Table 5
CREATE TABLE IF NOT EXISTS Test (
    test_id VARCHAR(10) NOT NULL,
    test_name VARCHAR(20) NOT NULL,
    PRIMARY KEY (test_id) 
);

-- Table 6
CREATE TABLE IF NOT EXISTS Admit (
    patient_id CHAR(10) NOT NULL,
    room_no VARCHAR(5) NOT NULL,
    admit_date TIMESTAMP NOT NULL,
    discharge_date TIMESTAMP,
    PRIMARY KEY (patient_id, room_no),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id),
    FOREIGN KEY (room_no) REFERENCES Room(room_no)
);

-- Table 7
CREATE TABLE IF NOT EXISTS doc_slots (
    doc_id CHAR(10) NOT NULL,
    doc_slot VARCHAR(100) NOT NULL,
    doc_date TIMESTAMP NOT NULL,
    PRIMARY KEY (doc_id, doc_date),
    FOREIGN KEY (doc_id) REFERENCES Doctors(doc_id)
);

-- Table 8
CREATE TABLE IF NOT EXISTS test_slots (
    test_id VARCHAR(10) NOT NULL,
    test_slot VARCHAR(100) NOT NULL,
    test_date TIMESTAMP NOT NULL,
    PRIMARY KEY (test_id, test_date),
    FOREIGN KEY (test_id) REFERENCES Test(test_id)
);

-- Table 9
CREATE TABLE IF NOT EXISTS doc_appointment (
    doc_appointment_id VARCHAR(10) NOT NULL,
    doc_id CHAR(10) NOT NULL,
    patient_id CHAR(10) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    appointment_status CHAR(1),
    symptoms VARCHAR(255),
    treatment VARCHAR(255),
    PRIMARY KEY (doc_appointment_id),
    FOREIGN KEY (doc_id) REFERENCES Doctors(doc_id)
);

-- Table 10
CREATE TABLE IF NOT EXISTS test_appointment (
    test_appointment_result_id VARCHAR(10) NOT NULL,
    test_id VARCHAR(10) NOT NULL,
    patient_id CHAR(10) NOT NULL,
    start_time TIMESTAMP NOT NULL,
    end_time TIMESTAMP NOT NULL,
    test_status CHAR(1),
    report_link VARCHAR(255),
    result CHAR(1),
    comment VARCHAR(255),
    PRIMARY KEY (test_appointment_result_id),
    FOREIGN KEY (test_id) REFERENCES Test(test_id),
    FOREIGN KEY (patient_id) REFERENCES Patients(patient_id)
);

--Table 11
CREATE TABLE IF NOT EXISTS ids (
    doc INT NOT NULL,
    dba INT NOT NULL,
    fdo INT NOT NULL,
    deo INT NOT NULL,
    PRIMARY KEY(doc, dba, fdo, deo)
);

-- Demo

INSERT INTO Users (user_id, name, ph_number, password, type, address) VALUES ('F1234', 'Vikas', '911234567890', 'asdfghjkl', 'F', 'Delhi');
INSERT INTO Users (user_id, name, ph_number, password, type, address) VALUES ('DBA1', 'Yashraj', '910987654321', 'asdfghjkl', 'DBA', 'Delhi');
