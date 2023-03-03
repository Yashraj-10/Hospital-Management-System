CREATE DATABASE hms;

-- Table 1
CREATE TABLE IF NOT EXISTS Users (
    user_id CHAR(10) NOT NULL ,
    name VARCHAR(100) NOT NULL,
    ph_number CHAR(12) NOT NULL,
    password VARCHAR(255) NOT NULL,
    type CHAR(1) NOT NULL,
    address VARCHAR(255) NOT NULL,
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
    conditions VARCHAR(255) NOT NULL,
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
    discharge_date TIMESTAMP NOT NULL,
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
    appointment_status CHAR(1) NOT NULL,
    symptoms VARCHAR(255) NOT NULL,
    treatment VARCHAR(255) NOT NULL,
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

-- Demo

INSERT INTO Users (user_id, name, ph_number, password, type, address) VALUES ('F1234', 'Vikas', '911234567890', 'asdfghjkl', 'F', 'Delhi');

-- new insertions
INSERT INTO Patients VALUES ('P1', 'Nirbhay', '2018-04-24 10:47', 'abc', 'gaya', 'bawasir');
INSERT INTO Test VALUES ('T1', 'Bawasir Operation');
INSERT INTO test_appointment(test_appointment_result_id, test_id, patient_id, start_time, end_time, test_status, report_link, result, comment) VALUES ('LK112', 'T1', 'P1', '2018-04-24 10:47','2018-04-24 10:53',NULL,NULL,NULL,NULL);



-- new insertions
INSERT INTO Patients VALUES ('P2', 'Astitva', '2018-04-24 10:47', 'abc', 'purnia', 'fever');
INSERT INTO Users VALUES ('User2', 'Strange', '9112', 'strange', 'D', 'New york'); 
INSERT INTO Doctors VALUES ('D1', 'OPD', 'Strange@','User2');
INSERT INTO doc_appointment VALUES ('APP1', 'D1', 'P2', '2018-04-24 10:47', '2018-04-24 10:47', 'P', 'Fever', '.');