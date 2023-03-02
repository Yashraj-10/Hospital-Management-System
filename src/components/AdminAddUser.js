import '../styles/register.css';
import React, { useState } from 'react';
const AdminAddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');
    const [Type, setType] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();
    };
    return (
        <div className='vikasRegFormContainer'>
            <div className='vikasRegHead'>User Registration</div>
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
                        Type of User:
                    </label>
                    <div className="vikasRegCol2">
                        <div className="RegSex">
                            <select
                                value={Type}
                                onChange={(e) => setType(e.target.value)}
                                required
                            >
                                <option value="null">Select</option>
                                <option value="DBA">DBA</option>
                                <option value="Doctor">Doctor</option>
                                <option value="DE">DE</option>
                                <option value="FD">FD</option>
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
                    <button type="submit" onClick={handleSubmit} >Submit</button>
                </div>
            </form>
        </div>

    );
}

export default AdminAddUser;