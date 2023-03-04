import '../styles/register.css';
import React, { useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const AdminAddUser = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [Type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [doctype, setDoctype] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [address2, setAddress2] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const [isDoctor, setIsDoctor] = useState(false);
    const emailandtype = (e,value) => {
        console.log(value);
        if(value === "Doctor") setIsDoctor(true);
        else setIsDoctor(false);
    };
    const [showPassword, setShowPassword] = React.useState(false);

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
                        <div>
                            <select
                                value={Type}
                                onChange={(e) => setType(e.target.value)}
                                required
                                onClick={(e) => emailandtype(e,Type)}
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
                {isDoctor && <div>
                    <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        E-mail:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={email}
                            required
                            onChange={(e) => setEmail(e.target.value)} />
                    </div>
                    </div>
                    <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Type of Doctor:
                    </label>
                    <div className="vikasRegCol2">
                        <input
                            type="text"
                            value={doctype}
                            required
                            onChange={(e) => setDoctype(e.target.value)} />
                    </div>
                    </div>
                </div>}
                
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
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Password:
                    </label>
                    <div >
                    <Input
                        id="standard-adornment-password"
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                            <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={handleClickShowPassword}
                                onMouseDown={handleMouseDownPassword}
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                            </InputAdornment>
                        }
                    />
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