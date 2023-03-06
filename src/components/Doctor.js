import React, {useEffect, useState} from 'react';
import StickyHeadTable from './DoctorTable';
import '../styles/Admdb.css';
import CheckboxesGroup from './DoctorFilter';
import { useHistory } from 'react-router-dom';
import axios from 'axios';
import DoctorTodayApmts from './DoctorAppointments';

const Doctor = () => {
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    
    let appointments = [];
    appointments.push({
        "doc_appointment_id": "APP1",
        "end_time": "2018-04-24 10:47:00",
        "patient_name": "Vikas",
        "start_time": "2018-04-24 10:47:00"
    });
    appointments.push({
        "doc_appointment_id": "APP2",
        "end_time": "2018-04-24 11:32:00",
        "patient_name": "Nirbhay",
        "start_time": "2018-04-24 10:50:00"
    });

    const [isTodayapmts, setIsTodayapmts] = useState(false);
    
    const handleTodayapmts = (e) => {
        setIsTodayapmts(true);
        e.preventDefault();
    
    //     axios.get('http://127.0.0.1:5000//patients?doc_id=DOC1')
    //     .then((response) => {
    //         appointments = response.data;
    //         console.log(response);
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     });
    
    };

    const handleBack = (e) => {
        setIsTodayapmts(false);
    };

    useEffect(() => {
        console.log("useEffect");
    }, [isTodayapmts]);
    
    
    let patients = [];
    patients.push({
        "age": 30,
        "conditions": "",
        "doc_appointment_id": "DA1",
        "patient_id": "P2",
        "patient_name": "Astitva",
        "start_time": "2018-04-24 10:00:00",
        "treatment": ""
    });
    patients.push({
        "age": 40,
        "conditions": "Blood Pressure",
        "doc_appointment_id": "DA2",
        "patient_id": "P1",
        "patient_name": "Nirbhay",
        "start_time": "2018-04-24 10:45:00",
        "treatment": "Medicine"
    });
    // useEffect(() => {
    
    //     axios.get('http://192.168.50.68:5000/patient?doc_id=DOC1', {
    //         headers: {
    //             "Content-Type": "application/json"
    //         },
    
    //         data: {
    //             "access_token": "doceyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODA0MzQwOCwianRpIjoiMmU2MDkwZDgtMTZkYi00MWZjLTk1Y2ItOTdhMzQ2ZDcwZjZlIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkRPQzEiLCJuYmYiOjE2NzgwNDM0MDgsImV4cCI6MTY3ODA0NDMwOH0.iWfNki1t7aNz0sglCykqiigxXf2cmIkAkpSZw-7I2Ng"
    //         }
    //     })
    //     .then((response) => {
    //         console.log("nice");
    //         patients = response.data;
    //     })
    //     .catch((error) => {
    //         console.log("laude");
    //     });
    // }, []);
                                        
    return (
        <div>

            {!isTodayapmts && <><div className="doctor_header">
                <input type="text" placeholder='Enter patient name' onChange={handleChange} value={searchInput} className="searchTerm"></input>
                <button type="submit" className="searchButton">Go</button>
                <button className="aduser" onClick={handleTodayapmts}>Today's appointments</button>
            </div>
            <div>
                <div className="dropdownAge">
                    <CheckboxesGroup />
                </div>
                <div className="admind_table">
                    <StickyHeadTable patients={patients} />
                </div>
            </div></>
            }
            {isTodayapmts && <div className="admind_table">
            <button className="backButton" onClick={handleBack}>Back</button>
                    <DoctorTodayApmts appointments={appointments}/>
                </div>}
        </div>
    );
}

export default Doctor;
