import '../styles/register.css';
import React, { useState } from 'react';
import TestHistory from './TestHistory';
import AdmitHistory from './AdmitHistory';
import PrevAppointments from './PrevAppointments';
import { useEffect } from 'react';
import axios from 'axios';
import { useHistory } from 'react-router-dom';

export default function PatientDetails() {

    // var res = [];
    const history = useHistory();
    const [res, setPost] = React.useState(null);
    
        useEffect(() => {
            var self_user_id = localStorage.getItem("self_user_id");
            var pat = localStorage.getItem("patient_id")
            if(pat.length == 0){
                alert("Invalid patient Id !!")
                history.push('/doctor');
            }

            else{
          axios
          .post('https://dbms-backend-api.azurewebsites.net/patient?search_string='.concat(`${pat}`), {
            access_token: localStorage.getItem("access_token")
          })
          .then(
            (response) => {
              setPost(response.data);
              console.log(response.data)
              if(response.data.length == 0){
                  alert("Invalid patient Id !!")
                  history.push('/doctor');
              }
              
          },
          (error) => {
              console.log(error);
          }
          );
        }
      }, []);
    
    // res = post;

    // const [name, setName] = useState('');
    // const [dateOfBirth, setDateOfBirth] = useState('');
    // const [phoneNumber, setPhoneNumber] = useState('');
    // const [address, setAddress] = useState('');
    // const [gender, setGender] = useState('');
    // const [emailId, setEmailId] = useState('');
    // const [conditions, setConditions] = useState(['']);
    const [isUser, setIsuser] = useState(false);

    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "doc") { setIsuser(true); }
    }, []);

    return (
        <div>
            {res && isUser && <div className='PatientDetailsContainer'>
                <div className='vikasRegFormContainer'>
                    <div className='vikasRegHead'>Patient Details</div>
                    <div className='DetailsContainer'>
                        <div className='vikasRegForm'>
                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Name:
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].patient_name}
                                </div>
                            </div>
                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Phone Number:
                                </label>
                                <div className="vikasRegCol2">
                                    8830475330
                                </div>
                            </div>
                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Email Id:
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].email}
                                </div>
                            </div>

                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Age :
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].age}
                                </div>
                            </div>

                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Gender:
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].gender}
                                </div>
                            </div>

                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Patient Id:
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].patient_id}
                                </div>
                            </div>

                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Address:
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].address}
                                </div>
                            </div>
                            <div className="vikasRegRow">
                                <label className='vikasRegCol1'>
                                    Conditions:
                                </label>
                                <div className="vikasRegCol2">
                                    {res[0]['patient_info'].conditions}
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className='vikasRegHead'>Tests History</div>
                    <TestHistory data={res[0]['prev_tests']} />
                    <div className='vikasRegHead'>Previous Appointments</div>
                    <PrevAppointments data={res[0]['prev_appointments']} />
                    <div className='vikasRegHead'>Admit History</div>
                    <AdmitHistory data={res[0]['admit_history']} />
                </div>
            </div>}
            {res == [] && <p>Not found</p>}

            <div>
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
        </div>
    );
}