
import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';
const Discharge = () => {
    const [patientID, setpatientID] = useState('');
    const [amount, setamount] = useState('');
    const handleSubmit = (e) => {

        e.preventDefault();
        const dischargeData = { patientID, amount };
        console.log(dischargeData);

        axios.post('https://dbms-backend-api.azurewebsites.net/discharge', { patient_id: patientID, amount: amount, access_token: localStorage.getItem('access_token') })
            .then((response) => {
                // console.log(response.data['access_token']);
                console.log(response.data);
                alert("Patient Discharged Successfully");
                // history.push("/frontdesk");
            }, (error) => {
                console.log(error);
                alert("Patient Discharge Failed");
            }
            )

    };
    return (
        <div className='vikasAdmitFormContainer'>
            <div className='vikasRegHead'>Discharge Patient</div>
            <form onSubmit={handleSubmit} className='vikasRegForm'>
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
                        Amount:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="number"
                            className='vikasAdmitTextBox'
                            value={amount}
                            required
                            onChange={(e) => setamount(e.target.value)} />
                    </div>
                </div>



                <div className="vikasRegButton">
                    <button type="submit"
                        onClick={handleSubmit}
                    >Discharge</button>
                </div>
            </form>


        </div>

    );
}

export default Discharge;