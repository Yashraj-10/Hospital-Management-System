
import '../styles/register.css';
import React, { useState } from 'react';
const Discharge = () => {
    const [patientID, setpatientID] = useState('');
    const [amount, setamount] = useState('');
    const handleSubmit = (e) => {

        // e.preventDefault();
        console.log(patientID);
        

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