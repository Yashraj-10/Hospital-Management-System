import '../styles/register.css';
import React, { useEffect, useState } from 'react';
import IconButton from '@mui/material/IconButton';
import Input from '@mui/material/Input';
import InputAdornment from '@mui/material/InputAdornment';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import 'react-phone-number-input/style.css'
import PhoneInput from 'react-phone-number-input'

const AdminAddUser = () => {
    const [firstName, setFirstName] = useState('');
    // const [lastName, setLastName] = useState('');
    const [Type, setType] = useState('');
    const [email, setEmail] = useState('');
    const [doctype, setDoctype] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address1, setAddress1] = useState('');
    const [password, setPassword] = useState('');
    // const [address2, setAddress2] = useState('');
    const [isAdduserrendered, setIsAdduserrendered] = useState(false);
    const [isUser, setIsuser] = useState(false);

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(firstName, Type, email, doctype, phoneNumber, address1);
        if (Type === "doc") {
            axios.post('https://dbms-backend-api.azurewebsites.net/users/add', { name: firstName, type: Type, email: email, docType: doctype, ph_number: phoneNumber.slice(1, 13), address: address1, password: password, access_token: localStorage.getItem("access_token") })
                .then((response) => {
                    console.log(response.data);
                    alert("User Added Successfully");
                    setIsAdduserrendered(true);

                }, (error) => {
                    console.log(error);
                    alert(error.response.data.message);
                }
                )
        }
        else {
            axios.post('https://dbms-backend-api.azurewebsites.net/users/add', { name: firstName, type: Type, email: email, ph_number: phoneNumber.slice(1, 13), address: address1, password: password, access_token: localStorage.getItem('access_token') })
                .then((response) => {

                    console.log(response.data);
                    alert("User Added Successfully");
                    setIsAdduserrendered(true);

                }, (error) => {
                    console.log(error);
                    alert(error.response.data.message);
                }
                )
        }
    };

    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "dba") { setIsuser(true); }
        if (isAdduserrendered) {
            setFirstName('');
            // setLastName('');
            setType('');
            setEmail('');
            setDoctype('');
            setPhoneNumber('');
            setAddress1('');
            setPassword('');
            // setAddress2('');
            setIsAdduserrendered(false);
        }
    }, [isAdduserrendered]);


    const [isDoctor, setIsDoctor] = useState(false);
    const emailandtype = (e, value) => {
        console.log(value);
        if (value === "doc") setIsDoctor(true);
        else setIsDoctor(false);
    };
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);

    const handleMouseDownPassword = (event) => {
        event.preventDefault();
    };

    return (
        <div >
            {isUser &&
                <div className='vikasRegFormContainer'>
                    <div className='vikasRegHead'>User Registration</div>
                    <form onSubmit={handleSubmit} className='vikasRegForm'>
                        <div className="vikasRegRow">
                            <label className='vikasRegCol1'>
                                Name:
                            </label>
                            <div className="vikasRegCol2">
                                <input
                                    type="text"
                                    value={firstName}
                                    required
                                    onChange={(e) => setFirstName(e.target.value)} />
                            </div>
                        </div>

                        {/* <div className="vikasRegRow">
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
                </div> */}
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
                                        onClick={(e) => emailandtype(e, Type)}
                                    >
                                        <option value="null">Select</option>
                                        <option value="dba">DBA</option>
                                        <option value="doc">Doctor</option>
                                        <option value="deo">DEO</option>
                                        <option value="fdo">FDO</option>
                                    </select>
                                </div>
                            </div>
                        </div>
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
                        {isDoctor && <div>
                            
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
                            required
                            onChange={(e) => setAddress2(e.target.value)} />
                    </div>
                </div> */}
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
                                    value={password}
                                    required
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        <div className="vikasRegButton">
                            <button type="submit" onClick={handleSubmit} >Submit</button>
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

export default AdminAddUser;