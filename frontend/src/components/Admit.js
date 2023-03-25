
import '../styles/register.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
const Admit = () => {
    const [patientID, setpatientID] = useState('');
    const [admitDate, setadmitDate] = useState('');
    // const [admitTime, setadmitTime] = useState('');
    // const [roomNo, setroomNo] = useState('');
    const [roomType, setroomType] = useState('');
    const [isAdmitRendered, setIsAdmitRendered] = useState(false);
    const [isUser, setIsuser] = useState(false);
    const [patientIds, setPatientIds] = useState([]);
    const handleAdmitSubmit = (e) => {
        e.preventDefault();
        // const admitData = {patientID, admitDate, roomType};
        // console.log(admitData);
        // localStorage.getItem('access_token')}

        axios.post('https://dbms-backend-api.azurewebsites.net/admit', { patient_id: patientID, admit_date: admitDate, room_type: roomType, access_token: localStorage.getItem('access_token') })
            .then((response) => {
                // console.log(response.data['access_token']);
                console.log(response.data);
                alert(`Patient Admitted Successfully in Room no. ${response.data.room_no}`);
                setIsAdmitRendered(true);
                // history.push("/frontdesk");
            }, (error) => {
                console.log(error.data);
                alert(error.response.data.message);

            }
            )


    };
    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "fdo") { setIsuser(true); }

        axios.post('https://dbms-backend-api.azurewebsites.net/users/patients', {
            access_token: localStorage.getItem("access_token")
        })
            .then((response) => {
                console.log(response.data);
                setPatientIds(response.data);
            }
                , (error) => {
                    console.log(error);
                }
            )

        if (isAdmitRendered) {
            setpatientID('');
            setadmitDate('');
            setroomType('');
            setIsAdmitRendered(false);
        }
    }, [isAdmitRendered]);

    return (
        <div>
            {isUser && <div className='vikasAdmitFormContainer'>
                <div className='vikasRegHead'>Admit Patient</div>
                <form onSubmit={handleAdmitSubmit} className='vikasRegForm'>
                    <div className="vikasRegRow">
                        <label className='vikasRegCol1'>
                            Patient:
                        </label>
                        <div className="vikasRegCol2">
                            <div className="admitRoomType">
                                <select
                                    value={patientID}
                                    onChange={(e) => setpatientID(e.target.value)}
                                    required

                                >
                                    <option value=""></option>
                                    {patientIds.map((pat) => (
                                        <option key={pat.patient_id} value={pat.patient_id}>
                                            {pat.patient_name} - {pat.patient_id}
                                        </option>
                                    ))}
                                </select>
                            </div>
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
                                    <option value="AC Ward">AC Ward</option>
                                    <option value="General Ward">General Ward</option>


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
            </div>}
            {
                !isUser && <div className='notAuthorized'> <div class="w3-display-middle">
                    <h1 class="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
                    {/* <h class="w3-border-white w3-animate-left" style="margin:auto;width:50%"> */}
                    <h3 class="w3-center w3-animate-right">You dont have permission to view this page.</h3>
                    <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
                    <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
                </div></div>
            }
        </div>
    );
}

export default Admit;