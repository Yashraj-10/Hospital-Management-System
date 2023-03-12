// import axios from 'axios';
// import { useEffect } from 'react';
import React, { useState } from 'react';
import axios from 'axios';
import { useEffect } from 'react';
import '../styles/scheduleAppointment.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { times } from 'lodash';
const dateFormat = "yyyy-MM-dd";
// import Example from './Example';
// import SelectDate from './SelectDate';
// import $ from 'jquery';
// import jQuery from 'jquery';

const ScheduleAppointment = () => {

    // 1st axios call to get the list of doctors
    const [doctorsAvailable, setdoctorList] = useState(null);
    useEffect(() => {
        axios.post('https://dbms-backend-api.azurewebsites.net/users/doc',{
            access_token : localStorage.getItem("access_token")
        })
        .then((response) => {
            console.log(response.data);
            setdoctorList(response.data);
        }
        , (error) => {
            console.log(error);
        }
        )
    }, []);

    const [docSelect, setdoctorsAvailable] = useState('');
    const [isDocSelected, setIsDocSelected] = useState(false);
    const [isUser, setIsuser] = useState(false);
    // const [isPendingDoctor, setIsPendingDoctor] = useState(false);

    // var array = ["2023-03-14", "2023-03-11", "2023-03-26"]; OR
    const [dateArray, setArray] = useState([]);

    const handleSelectDoctor = (e) => {
        // console.log(docSelect);
        e.preventDefault();
        console.log(docSelect);


        if(docSelect.length == 0){
            alert("Please select a doctor !");
        }

        // 2nd axios call to post the doctor selected 
        // axios.post("/doctors", {doc_id: docSelect})
        // .then((response) => {
        //     console.log(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )
        else{
        setIsDocSelected(true);

        // 3rd axios call to get the list of dates available for the doctor selected
        axios.post('https://dbms-backend-api.azurewebsites.net/doc_appointment/dates?doc_id='.concat(`${docSelect}`),{
            access_token : localStorage.getItem('access_token')
        })
        .then((response) => {
            console.log(response.data);
            var temp = response.data;
            var dates = []
            if(temp.length == 0){
                alert("Doctor is unavailable !");
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

    const [appointmentDate, setAppointmentDate] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);
                    
    // const [slotsarray, setSlotsArray] = useState('');
    var final;
    const [slots, setBastiSlots] = useState([])
    const [appFinal, setAppFinal] = useState('');

    const handleDateClick = (e) => {
        // console.log(e.target.value);
        // setAppointmentDate(e.target.value);
        e.preventDefault();
        console.log(appointmentDate);

        if(appointmentDate.length == 0){
            alert("Please select a date !");
        }

        else{
        final = appointmentDate.toISOString().slice(0,8).replace(/-/g,"-")
        final = final + appointmentDate.toString().slice(8,10);
        console.log(final);
        setAppFinal(final);
        setIsDateSelected(true);

        // 5th axios call to get the list of slots available for the doctor selected
        axios
          .post(`https://dbms-backend-api.azurewebsites.net/doc_appointment/slots?doc_id=${docSelect}&date=${final}`, {
            access_token: localStorage.getItem("access_token")
          })
          .then(
            (response) => {
              setBastiSlots(response.data);
              console.log(response.data)

              if(response.data.length == 0){
                alert("No slot available for that day !!")
              }
              
          },
          (error) => {
              console.log(error);
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

        else {setIsSlotSelected(true);}
    }
    const [patientId, setPatientId] = useState('');
    const [isPatientId, setIsPatientId] = useState(false);
    const [symptoms, setSymptoms] = useState('');
    const handlePatientId = (e) => {
        setPatientId(e.target.value);
        setIsPatientId(true);
    }
    


    const handleConfirmAppointment = (e) => {
        e.preventDefault();
        ///popup for confirmation/error
        //go to your dashboard/ schedule another appointment
        var appointmentData = { docSelect, appFinal, slotSelect, patientId, symptoms};

        var slotSelect2 = slotSelect.split("-");
        var temp = slotSelect2[0];
        var start_time = temp.slice(0, temp.length - 2) + ":" + temp.slice(temp.length-2, temp.length) + ":00";
        
        start_time = appFinal + " "+ start_time;
        var appfinaldata = {
            "doc_id" : docSelect,
            "patient_id" : patientId,
            "symptoms" : symptoms,
            "start_time" : start_time
        }
        console.log(appfinaldata);

        // send this to the server


        // 8th axios call to post all the appointment data
        axios
          .post(`https://dbms-backend-api.azurewebsites.net/doc_appointment`, {
            "access_token" : localStorage.getItem("access_token"),
            "doc_id" : docSelect,
            "patient_id" : patientId,
            "symptoms" : symptoms,
            "start_time" : start_time
          })
          .then(
            (response) => {
              console.log(response.data);
              alert("Appointment confirmed !");
              window.location.reload();
          },
          (error) => {
              alert(error.response.data.message);
          }
          );
    }


    return (
        <div>
        {doctorsAvailable &&
        <div className="vikasScheduleAppointmentContainer">
            <div className="vikasRegHead"> Schedule Appointment </div>
            <form className="vikasRegForm">

                <div className="vikasRegRow">
                    <label className='vikasRegCol1'>
                        Available Doctors:
                    </label>
                    <div className="vikasRegCol2">
                        <div>
                            <select
                                value={docSelect}
                                onChange={(e) => setdoctorsAvailable(e.target.value)}
                                required
                            >
                                <option value="">Select</option>
                                {doctorsAvailable.map((doctor) => (
                                    <option key={doctor.user_id} value={doctor.user_id}>
                                        {doctor.name}  {doctor.docType}
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
                            Available Dates:
                        </label>
                        {/* <div className='form-group'> */}
                        <div className="vikasRegCol2">

                            <div >
                                {/* <Example holidays={holidays} /> */}
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


                        </div>
                        <div className='vikasSelectDoctorButton'>
                            <button onClick={handleDateClick}>Confirm</button>
                        </div>

                    </div>
                    <hr />
                    {isDateSelected && <div className='vikasSelectSlot'>
                        <div className="vikasRegRow">
                            <label className='vikasRegCol1'>
                                Available Slots:
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

                                <label className="vikasRegCol1">
                                    Symptoms:
                                </label>
                                <div className="vikasRegCol2">
                                    <input
                                        type="text"
                                        value={symptoms}
                                        required
                                        onChange={(e) => setSymptoms(e.target.value)} />
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

        </div>}
        </div>
    );
}

export default ScheduleAppointment;