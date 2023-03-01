import './register.css';
import React, { useState } from 'react';
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [sex, setSex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

    };
    return (
        <div className='vikasRegFormContainer'>
            <div className='vikasRegHead'>Patient Registration</div>
            <form onSubmit={handleSubmit} className='vikasRegForm'>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        First Name:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={firstName}
                            required
                            onChange={(e) => setFirstName(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Last Name:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={lastName}
                            required
                            onChange={(e) => setLastName(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Date of Birth:
                    </label>
                    <div className="vikasRegCol2">
                        <input type="date" className='vikasRegDOB' value={dateOfBirth} required onChange={(e) => setDateOfBirth(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Gender:
                    </label>
                    <div className="vikasRegCol2">
                        <div className="RegSex">
                            <select
                                value={sex}
                                onChange={(e) => setSex(e.target.value)}
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
                        <input type="tel" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} />
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Address Line 1:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={address1}
                            required
                            onChange={(e) => setAddress1(e.target.value)} />
                    </div>
                </div>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Address Line 2:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={address2}
                            required
                            onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                </div>
                <div className="vikasRegButton">
                    <button type="submit" >Submit</button>
                </div>
            </form>
        </div>

    );
}

export default Register;