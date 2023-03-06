import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'
// import { useHistory } from 'react-router-dom';

const Register = () => {
    const [patientName, setpatientName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState();
    const [address1, setAddress1] = useState('');
    // const [address2, setAddress2] = useState('');
    const [sex, setSex] = useState('');
    const [emailId, setEmailId] = useState('');
    const [conditions, setConditions] = useState(['']);
    // const history = useHistory();
    const handleSubmit = (e) => {
        e.preventDefault();

        const patientData = { patientName, dateOfBirth, phoneNumber, address1, emailId, conditions };
        console.log(patientData);

        axios.post('https://dbms-backend-api.azurewebsites.net/add_patient', { patient_name: patientName, dob: dateOfBirth, ph_number: phoneNumber.slice(1,13), address: address1, email: emailId, conditions: conditions, gender: sex, access_token: localStorage.getItem('access_token') })
            .then((response) => {
                // console.log(response.data['access_token']);
                console.log(response.data);
                alert("Patient Registered Successfully");
                // history.push("/frontdesk");
            }, (error) => {
                console.log(error);
                alert("Patient Registration Failed");
            }
            )

    };
    return (
        <div className='vikasRegFormContainer'>
            <div className='vikasRegHead'>Patient Registration</div>
            <form onSubmit={handleSubmit} className='vikasRegForm'>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Patient Name:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={patientName}
                            required
                            onChange={(e) => setpatientName(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Email Id:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="email"
                            value={emailId}
                            required
                            onChange={(e) => setEmailId(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Date of Birth:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="date"
                            max="2023-03-31"
                            className='vikasRegDOB' value={dateOfBirth} required onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Gender:
                    </label>
                    <div className="vikasRegCol2">
                        <div>
                            <select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
                                required
                            >
                                <option value="null">Select</option>
                                <option value="Male">Male</option>
                                <option value="Female">Female</option>
                                <option value="Other">Other</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Phone Number:
                    </label>
                    <div className="vikasRegCol2">
                        {/* <input type="number" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} /> */}
                        <PhoneInput
                            placeholder="Enter phone number"
                            value={phoneNumber}
                            required
                            onChange={setPhoneNumber} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Address:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={address1}
                            required
                            onChange={(e) => setAddress1(e.target.value)} />
                    </div>
                </div>
                {/* <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Address Line 2:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={address2}
                            // required
                            onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                </div> */}
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Prevailing Conditions (if any):
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={conditions}
                            onChange={(e) => setConditions(e.target.value)} />
                    </div>
                </div>
                <div className="vikasRegButton">
                    <button type="submit" onClick={handleSubmit} >Submit</button>
                </div>
            </form>
        </div>
    );
}

export default Register;