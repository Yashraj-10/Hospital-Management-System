import '../styles/register.css';
import React, { useState } from 'react';
import TestHistory from './TestHistory';
import PrevAppointments from './PrevAppointments';
import { useEffect } from 'react';
export default function PatientDetails(){
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [emailId, setEmailId] = useState('');
    const [conditions, setConditions] = useState(['']);
    const [isUser, setIsuser] = useState(false);

    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "doc") { setIsuser(true); }
    }, []);

    return (
        <div>
            {isUser &&
        <div className='vikasRegFormContainer'>
            <div className='vikasRegHead'>Patient Details</div>
            <div className='vikasRegForm'>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Name:
                    </label>
                    <div className="vikasRegCol2">
                        
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Email Id:
                    </label>
                    <div className="vikasRegCol2">

                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Date of Birth:
                    </label>
                    <div className="vikasRegCol2">
                        
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Gender:
                    </label>
                    <div className="vikasRegCol2">
                        
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Phone Number:
                    </label>
                    <div className="vikasRegCol2">
                        
                    </div>
                </div>

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Address:
                    </label>
                    <div className="vikasRegCol2">
                        
                    </div>
                </div>
                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Conditions:
                    </label>
                    <div className="vikasRegCol2">
                        
                    </div>
                </div>
            </div>
            <div className='vikasRegHead'>Tests History</div>
            <TestHistory />
            <div className='vikasRegHead'>Previous Appointments</div>
            <PrevAppointments />
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
