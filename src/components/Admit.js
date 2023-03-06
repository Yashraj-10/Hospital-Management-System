
import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';
const Admit = () => {
    const [patientID, setpatientID] = useState('');
    const [admitDate, setadmitDate] = useState('');
    // const [admitTime, setadmitTime] = useState('');
    // const [roomNo, setroomNo] = useState('');
    const [roomType, setroomType] = useState('');
    const handleAdmitSubmit = (e) => {
        e.preventDefault();
        // const admitData = {patientID, admitDate, roomType};
        // console.log(admitData);
        // localStorage.getItem('access_token')}
  
        axios.post('https://dbms-backend-api.azurewebsites.net/admit', {patient_id: patientID, admit_date: admitDate, room_type: roomType, access_token: "fdoeyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODEyMDAyNywianRpIjoiMmQyNWE3OGItNmNiNi00MTZkLTllMzAtMDk1ZjJjYzQ2OGJkIiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkZETzEiLCJuYmYiOjE2NzgxMjAwMjcsImV4cCI6MTY3ODEyMDkyN30.9uzGR1Xd0CpbN7XgZvEWJG-x_y9yY2y5VxeN9V-7A-Q" })
            .then((response) => {
                // console.log(response.data['access_token']);
                console.log(response.data);
                alert("Patient Admitted Successfully");
                // history.push("/frontdesk");
            }, (error) => {
                console.log(error.data);
                alert(error.response.data.message);

            }
            )

        
    };
    return (
        <div className='vikasAdmitFormContainer'>
            <div className='vikasRegHead'>Admit Patient</div>
            <form onSubmit={handleAdmitSubmit} className='vikasRegForm'>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Patient ID:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            className='vikasAdmitTextBox'
                            value={patientID}
                            required
                            onChange={(e) => setpatientID(e.target.value)} />
                    </div>
                </div>
                
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Room Type:
                    </label>
                    <div className="vikasRegCol2">
                        <div className="admitRoomType">
                            <select
                                value={roomType}
                                onChange={(e) => setroomType(e.target.value)}
                                required
                            >
                                <option value="null">Select</option>
                                <option value="ICU">ICU</option>
                                <option value="CCU">CCU</option>
                                <option value="OT">OT</option>
                                <option value="AC">AC Ward</option>
                                <option value="Non-AC">Non-AC Ward</option>
                                <option value="General">General</option>


                            </select>
                        </div>
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Admit Date:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="date"
                            max="2030-12-31"
                            className='vikasAdmitTextBox' value={admitDate} required onChange={(e) => setadmitDate(e.target.value)} />
                    </div>
                </div>

                {/* <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Admit Time:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="time"
                            className='vikasAdmitTextBox' value={admitTime} required onChange={(e) => setadmitTime(e.target.value)} />
                    </div>
                </div> */}

                
        
                {/* <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Discharge Date:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="date"
                            max="2030-12-31"
                            className='vikasAdmitTextBox' value={dischargeDate} onChange={(e) => setdischargeDate(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Discharge Time:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="time"
                            className='vikasAdmitTextBox' value={dischargeTime} onChange={(e) => setdischargeTime(e.target.value)} />
                    </div>
                </div> */}

                {/* <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Room No:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            className='vikasAdmitTextBox'
                            value={roomNo}
                            required
                            onChange={(e) => setroomNo(e.target.value)} />
                    </div>
                </div> */}
                <div className="vikasRegButton">
                    <button type="submit" onClick={handleAdmitSubmit} >Admit</button>
                </div>
            </form>
        </div>

    );
}

export default Admit;