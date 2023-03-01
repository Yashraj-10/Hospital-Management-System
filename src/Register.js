import './register.css';
import React, { useState } from 'react';
const Register = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [sex, setSex] = useState(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        // TODO: Implement form submission logic
    };
    return (
        <div className="form-container">
            <form onSubmit={handleSubmit}>
                <label>
                    First Name:
                    <input
                        type="text"
                        value={firstName}
                        required
                        onChange={(e) => setFirstName(e.target.value)} />
                </label>
                <br />
                <label>
                    Last Name:
                    <input
                        type="text"
                        value={lastName}
                        required
                        onChange={(e) => setLastName(e.target.value)} />
                </label>
                <br />
                <label>
                    Date of Birth:
                    <input type="date" value={dateOfBirth} required onChange={(e) => setDateOfBirth(e.target.value)} />
                </label>
                <br />
                <div className='dropdown'>
                <label>
                    Sex :
                    <select
                    value={sex}
                    onChange={(e) => setSex(e.target.value)}
                    >
                
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                </select>

                </label>
                <br />
                </div>
                <label>
                    Phone Number:
                    <input type="tel" value={phoneNumber} required onChange={(e) => setPhoneNumber(e.target.value)} />
                </label>
                <br />
                <label>
                    Address: 
                    <input
                        type="text"
                        value={address}
                        required
                        onChange={(e) => setAddress(e.target.value)} />
                </label>
                <button type="submit">Submit</button>
            </form>
        </div>
    );
}

export default Register;