import '../styles/register.css';
import React, { useState } from 'react';
import TestHistory from './TestHistory';
import PrevAppointments from './PrevAppointments';

export default function PatientDetails(){
    const [name, setName] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [gender, setGender] = useState('');
    const [emailId, setEmailId] = useState('');
    const [conditions, setConditions] = useState(['']);

    return (
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
        </div>
    );
}
