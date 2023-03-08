import { useEffect } from 'react';
import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';
const Discharge = () => {
    const [patientID, setpatientID] = useState('');
    const [amount, setamount] = useState('');
    const [isDischargerendered, setIsDischargerendered] = useState(false);
    const [isUser, setIsuser] = useState(false);
    
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
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "fdo") { setIsuser(true); }
        if (isDischargerendered) {
            setpatientID('');
            setamount('');
            setIsDischargerendered(false);
        }
    }, [isDischargerendered]);

    return (
        <div>
            {isUser && <div className='vikasAdmitFormContainer'>
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

export default Discharge;