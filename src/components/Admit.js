
import '../styles/register.css';
import React, { useState } from 'react';
const Admit = () => {
    const [patientID, setpatientID] = useState('');
    const [admitDate, setadmitDate] = useState('');
    const [admitTime, setadmitTime] = useState('');
    // const [roomNo, setroomNo] = useState('');
    const [roomType, setroomType] = useState('');

    const handleAdmitSubmit = (e) => {
        e.preventDefault();
        console.log(patientID);
        console.log(admitDate);
        console.log(admitTime);
        // console.log(roomNo); 
        console.log(roomType);

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

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Admit Time:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="time"
                            className='vikasAdmitTextBox' value={admitTime} required onChange={(e) => setadmitTime(e.target.value)} />
                    </div>
                </div>

                
        
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