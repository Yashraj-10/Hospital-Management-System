import React, { useState } from 'react';
import '../styles/scheduleAppointment.css';
import axios from 'axios';
import { useEffect } from 'react';
import DatePicker from "react-datepicker";
const dateFormat = "yyyy-MM-dd";
// import SelectDate from './SelectDate';
// import $ from 'jquery';
// import jQuery from 'jquery';

const ScheduleTest = () => {

    const [testsAvailable, setTestsAvailable] = useState([]);
    useEffect(() => {
        axios.post('https://dbms-backend-api.azurewebsites.net/tests',{
            access_token : localStorage.getItem("access_token")
        })
        .then((response) => {
            console.log(response.data);
            setTestsAvailable(response.data);
        }
        , (error) => {
            console.log(error);
        }
        )
    }, []);



    const [docSelect, setslotsAvailable] = useState('');
    const [isDocSelected, setIsDocSelected] = useState(false);
    // const [isPendingDoctor, setIsPendingDoctor] = useState(false);

    const [dateArray, setArray] = useState([]);
    const handleSelectDoctor = (e) => {
        // console.log(docSelect);
        e.preventDefault();
        if(docSelect.length == 0){
            alert("Please select a test!");
        }
        else{
            console.log(docSelect);
            setIsDocSelected(true);

            axios.post('https://dbms-backend-api.azurewebsites.net/test_appointment/dates?test_id='.concat(`${docSelect}`),{
            access_token : localStorage.getItem('access_token')
            })
            .then((response) => {
                console.log(response.data);
                var temp = response.data;
                var dates = []
                if(temp.length == 0){
                    alert("Test is unavailable !");
                    // window.location.reload();
                }
                for(var i = 0; i < temp.length; i++){
                    console.log(temp[i].date)
                    var date = new Date(temp[i].date);
                    dates.push(date);
                }
                setArray(dates);
            }
            , (error) => {
                console.log(error);
            }
            )
        }
        
    }

    const [finalAppDate, setFinalAppDate] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);
    const [slots, setBastiSlots] = useState([])

    const handleDateClick = (e) => {
        // console.log(e.target.value);
        // setAppointmentDate(e.target.value);
        e.preventDefault();

        if(appointmentDate.length == 0){
            alert("Please select a date !");
        }

        else{
        var final = appointmentDate.toISOString().slice(0,8).replace(/-/g,"-")
        final = final + appointmentDate.toString().slice(8,10);
        console.log(final);
        // console.log(appointmentDate);
        setIsDateSelected(true);
        setFinalAppDate(final);
        // api call to get the slots of the test on the given date
        axios
          .post(`https://dbms-backend-api.azurewebsites.net/test_appointment/slots?test_id=${docSelect}&date=${final}`, {
            access_token: localStorage.getItem("access_token")
          })
          .then(
            (response) => {
                console.log(response.data)
                
                if(response.data.length == 0){
                    alert("No slot available for that day !!") 
                }
                setBastiSlots(response.data);
              
          },
          (error) => {
              console.log(error.data.message);
          }
          );
        }
    }
    
    const [slotSelect, setSlots] = useState('');
    const [isSlotSelected, setIsSlotSelected] = useState(false);
    const handleSelectSlot = (e) => {
        console.log(slotSelect);
        e.preventDefault();

        if(slotSelect.length == 0){
            alert("Please select a slot !");
        }

        else{
            setIsSlotSelected(true);
        }
    }

    const [patientId, setPatientId] = useState('');
    const [isPatientId, setIsPatientId] = useState(false);

    const handlePatientId = (e) => {
        setPatientId(e.target.value);
        setIsPatientId(true);
    }

    // const [isRender, setIsRender] = useState(false);

    const handleConfirmAppointment = (e) => {
        e.preventDefault();
        ///popup for confirmation/error
        //go to your dashboard/ schedule another appointment
        console.log('Appointment Confirmed');
        var slotSelect2 = slotSelect.split("-");
        var temp = slotSelect2[0];
        var start_time = temp.slice(0, temp.length - 2) + ":" + temp.slice(temp.length-2, temp.length) + ":00";
        
        start_time = finalAppDate + " "+ start_time;

        const appointmentData = { "test_id":docSelect,"start_time": start_time, "patient_id":patientId };
        console.log(appointmentData);
        
        axios
        .post(`https://dbms-backend-api.azurewebsites.net/test_appointment`, {
          "access_token" : localStorage.getItem("access_token"),
          "test_id" : docSelect,
          "patient_id" : patientId,
          "start_time" : start_time
        })
        .then(
          (response) => {
            console.log(response.data);
            alert("Test Appointment confirmed !");
            window.location.reload();
        },
        (error) => {
            alert(error.response.data.message);
        }
        );
        // setIsRender(true);

    }

    return (
        
        <div className="vikasScheduleAppointmentContainer">
            <div className="vikasRegHead"> Schedule Test </div>
            <form className="vikasRegForm">

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Available Tests:
                    </label>
                    <div className="vikasRegCol2">
                        <div>
                            <select
                                value={docSelect}
                                onChange={(e) => setslotsAvailable(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                {testsAvailable.map((test) => (
                                    <option key={test.test_id} value={test.test_id}>
                                        {test.test_name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='vikasSelectDoctorButton'>
                        <button onClick={handleSelectDoctor}>Confirm</button>
                    </div>
                </div>
                <hr />
                {isDocSelected && <div className='vikasSelectDate'>
                    <div className="vikasRegRow">
                        <label className='vikasRegCol1'>
                            Choose Date:
                        </label>
                        {/* <div className='form-group'> */}
                            <div className="vikasRegCol2">
                                {/* <label for="date"></label> */}

                                {/* <input
                                    type="date"
                                    name="date"
                                    value={appointmentDate}
                                    // class="form-control"
                                    placeholder=""
                                    required
                                    // readonly
                                    onChange={(e) => setAppointmentDate(e.target.value)}
                                /> */}
                                <DatePicker
                                    selected={appointmentDate}
                                    dateFormat={dateFormat}
                                    onChange={(date) => setAppointmentDate(date)}
                                    // filterDate={isWeekday}
                                    minDate={new Date()}
                                    // maxDate={addDays(new Date(), 7)}
                                    includeDates={dateArray}
                                />
                            </div>
                        {/* </div> */}
                        <div className='vikasSelectDoctorButton'>
                            <button onClick={handleDateClick}>Confirm</button>
                        </div>
                    </div>
                    <hr />
                    {isDateSelected && <div className='vikasSelectSlot'>
                        <div className="vikasRegRow">
                            <label className='vikasRegCol1'>
                                Choose Slot:
                            </label>
                            <div className="vikasRegCol2">
                                <div>
                                    <select
                                        value={slotSelect}
                                        onChange={(e) => setSlots(e.target.value)}
                                        required

                                    >
                                        <option value=""></option>
                                        {slots.map((slot) => (
                                            <option key={slot.slot} value={slot.slot}>
                                                {slot.slot}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='vikasSelectDoctorButton'>
                                <button onClick={handleSelectSlot}>Confirm</button>
                            </div>


                        </div>
                        <hr />
                        {isSlotSelected && <div className='vikasConfirmAppointment'>
                            <div className="vikasRegRow">
                                <label className="vikasRegCol1">
                                    Patient Id:
                                </label>
                                <div className="vikasRegCol2">
                                    <input
                                        type="text"
                                        value={patientId}
                                        required
                                        onChange={handlePatientId} />
                                </div>
                            </div>
                            {isPatientId && <div className='vikasRegButton'>


                                <button type="submit" onClick={(e) => handleConfirmAppointment(e)}>Confirm Appointment</button>
                            </div>}
                        </div>}
                    </div>}

                </div>

                }
            </form>

        </div>
    );
}

export default ScheduleTest;