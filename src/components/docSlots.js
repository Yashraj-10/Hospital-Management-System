import { useEffect } from 'react';
import '../styles/register.css';
import React, { useState } from 'react';
import axios from 'axios';
    
const DocSlots = () => {
    const [isUser, setIsuser] = useState(false);
    const [slot, setSlot] = useState('');
    const [date, setDate] = useState('');
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(slot, date);
        
        axios.post('https://dbms-backend-api.azurewebsites.net/doctor/add_slot', {date: date, slot: slot, access_token: localStorage.getItem('access_token') })
            .then((response) => {
                console.log(response.data);
                alert(`${response.data.message} for date ${response.data.on_date}`);
                window.location.reload();
            }, (error) => {
                console.log(error);
                alert(error.response.data.message);
            }
            )
    };

    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "doc") { setIsuser(true); }
        
    }, []);
    return ( 

        <div>
            { isUser && <div>
                <div className='vikasAdmitFormContainer'>
                <div className='vikasRegHead'>Select Slots for this week</div>
                <form onSubmit={handleSubmit} className='vikasRegForm'>
                <div className="vikasRegRow">
                        <label className='vikasRegCol1'>
                            Date:
                        </label>
                        <div className="vikasRegCol2">
                            <input type="date"
                                min="2023-03-10"
                                className='vikasRegDOB' value={date} required onChange={(e) => setDate(e.target.value)} />
                        </div>
                    </div>
                    <div className="vikasRegRow">
                        <label className='vikasRegCol1'>
                            Available Slots:
                        </label>
                        <div className="vikasRegCol2">
                        <div >
                                <select
                                    value={slot}
                                    onChange={(e) => setSlot(e.target.value)}
                                    required
                                >
                                    <option value="null">Select</option>
                                    <option value="09001200">9:00-12:00</option>
                                    <option value="10001200">10:00-12:00</option>
                                    <option value="10001200,14001600">10:00-12:00, 14:00-16:00</option>
                                    <option value="10001200,13001400">10:00-12:00, 13:00-14:00</option>
                                    <option value="15001900">15:00-19:00</option>
      
                                </select>
                            </div>
                        </div>
                    </div>

                    <div className="vikasRegButton">
                        <button type="submit"
                            onClick={handleSubmit}
                        >Add Slot</button>
                    </div>
                </form>
            </div></div>}
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


 
export default DocSlots;