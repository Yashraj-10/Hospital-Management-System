import { useEffect } from 'react';
import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';
const Discharge = () => {
    const [patientID, setpatientID] = useState('');
    const [amount, setamount] = useState('');
    const [isDischargerendered, setIsDischargerendered] = useState(false);
    const handleSubmit = (e) => {

        e.preventDefault();
        const dischargeData = { patientID, amount };
        console.log(dischargeData);

        axios.post('https://dbms-backend-api.azurewebsites.net/discharge', { patient_id: patientID, amount: amount, access_token: localStorage.getItem('access_token') })
            .then((response) => {
                console.log(response.data);
                alert("Patient Discharged Successfully");
                setIsDischargerendered(true);
            }, (error) => {
                console.log(error);
                alert(error.response.data.message);
            }
            )

    };
    
    useEffect(() => {
        if (isDischargerendered) {
            setpatientID('');
            setamount('');
            setIsDischargerendered(false);
        }
    }, [isDischargerendered]);

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