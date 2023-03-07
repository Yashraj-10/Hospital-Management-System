// import axios from 'axios';
// import { useEffect } from 'react';
import React, { useState } from 'react';
import '../styles/scheduleAppointment.css';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
const dateFormat = "yyyy-MM-dd";
// import Example from './Example';
// import SelectDate from './SelectDate';
// import $ from 'jquery';
// import jQuery from 'jquery';

const ScheduleAppointment = () => {

    const doctorsAvailable = [
        {
            doc_id: 1,
            name: 'Dr. Vikas'
        },
        {
            doc_id: 2,
            name: 'Dr. Ravi'
        },
        {
            doc_id: 3,
            name: 'Dr. Rakesh'
        },
    ];

    // 1st axios call to get the list of doctors
    // const [doctorsAvailable, setdoctorList] = useState('');
    // useEffect(() => {
    //     axios.get("/doctors")
    //     .then((response) => {
    //         console.log(response.data);
    //         setdoctorList(response.data);
    //     }
    //     , (error) => {
    //         console.log(error);
    //     }
    //     )
    // }, []);

    const [docSelect, setdoctorsAvailable] = useState('');
    const [isDocSelected, setIsDocSelected] = useState(false);
    const [isUser, setIsuser] = useState(false);
    // const [isPendingDoctor, setIsPendingDoctor] = useState(false);

    // var array = ["2023-03-14", "2023-03-11", "2023-03-26"]; OR
    // const [array, setArray] = useState(["2023-03-14", "2023-03-11", "2023-03-26"]);
    const holidays = [
        new Date("2023-01-01"),
        new Date("2023-01-15"),
        new Date("2023-02-19"),
        new Date("2023-05-28"),
        new Date("2023-07-04"),
        new Date("2023-09-03"),
        new Date("2023-10-08"),
        new Date("2023-11-11"),
        new Date("2023-11-28"),
        new Date("2023-12-25"),
        new Date("2023-03-05"),
    ];
    const handleSelectDoctor = (e) => {
        // console.log(docSelect);
        e.preventDefault();
        console.log(docSelect);
        setIsDocSelected(true);

        // 2nd axios call to post the doctor selected 
        // axios.post("/doctors", {doc_id: docSelect})
        // .then((response) => {
        //     console.log(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )

        // 3rd axios call to get the list of dates available for the doctor selected
        // axios.get("/dates")
        // .then((response) => {
        //     console.log(response.data);
        //     setArray(response.data);  OR array = response.data;
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )


    }

    // $(function () {
    //     $("input").datepicker({
    //         dateFormat: "yy-mm-dd",
    //         beforeShowDay: function (date) {
    //             var string = jQuery.datepicker.formatDate("yy-mm-dd", date);
    //             return [array.indexOf(string) !== -1];
    //         },
    //     });
    // });

    const [appointmentDate, setAppointmentDate] = useState('');
    const [isDateSelected, setIsDateSelected] = useState(false);

    const slots = [
        {
            slot_id: 1,
            time: '10:00 AM'
        },
        {
            slot_id: 2,
            time: '11:00 AM'
        },
        {
            slot_id: 3,
            time: '12:00 PM'
        },

    ];

    // const [slotsarray, setSlotsArray] = useState('');
    var final;
    const [appointmentDatefinal, setAppointmentDateFinal] = useState('');
    const handleDateClick = (e) => {
        // console.log(e.target.value);
        // setAppointmentDate(e.target.value);
        console.log(appointmentDate);
        final = appointmentDate.toISOString().slice(0,8).replace(/-/g,"-")
        final = final + appointmentDate.toString().slice(8,10);
        console.log(final);
        // setAppointmentDate(final);
        setAppointmentDateFinal(final);
        setIsDateSelected(true);

        // 4th axios call to post the date selected
        // axios.post("/dates", {date: final})
        // .then((response) => {
        //     console.log(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )

        // 5th axios call to get the list of slots available for the doctor selected
        // axios.get("/slots")
        // .then((response) => {
        //     console.log(response.data);
        //     slots = response.data; OR setSlotsArray(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )
    }

    const [slotSelect, setSlots] = useState('');
    const [isSlotSelected, setIsSlotSelected] = useState(false);
    const handleSelectSlot = (e) => {
        console.log(slotSelect);
        setIsSlotSelected(true);

        // 6th axios call to post the slot selected
        // axios.post("/slots", {slot_id: slotSelect})
        // .then((response) => {
        //     console.log(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )

    }
    const [patientId, setPatientId] = useState('');
    const [isPatientId, setIsPatientId] = useState(false);

    const handlePatientId = (e) => {
        setPatientId(e.target.value);
        setIsPatientId(true);

        // 7th axios call to post the patient id
        // axios.post("/patient", {patient_id: patientId})
        // .then((response) => {
        //     console.log(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )

    }

    const handleConfirmAppointment = (e) => {
        // e.preventDefault();
        ///popup for confirmation/error
        //go to your dashboard/ schedule another appointment
        console.log('Appointment Confirmed');
        const appointmentData = { docSelect, appointmentDatefinal, slotSelect, patientId };
        console.log(appointmentData);
        console.log('Appointment Confirmed');
        console.log('This is running');


        // 8th axios call to post all the appointment data
        // axios.post("/appointment", {appointmentData})
        // .then((response) => {
        //     console.log(response.data);
        // }
        // , (error) => {
        //     console.log(error);
        // }
        // )


    }


    return (
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
                                    <option key={doctor.doc_id} value={doctor.doc_id}>
                                        {doctor.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className='vikasSelectDoctorButton'>
                        <button onClick={handleSelectDoctor}>Select</button>
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
                            <div >
                                {/* <Example holidays={holidays} /> */}
                                <DatePicker
                                    selected={appointmentDate}
                                    dateFormat={dateFormat}
                                    onChange={(date) => setAppointmentDate(date)}
                                    // filterDate={isWeekday}
                                    minDate={new Date()}
                                    // maxDate={addDays(new Date(), 7)}
                                    includeDates={holidays}
                                />

                            </div>


                        </div>
                        <div className='vikasSelectDoctorButton'>
                            <button onClick={handleDateClick}>Select</button>
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
                                            <option key={slot.slot_id} value={slot.slot_id}>
                                                {slot.time}
                                            </option>
                                        ))}
                                    </select>
                                </div>
                            </div>
                            <div className='vikasSelectDoctorButton'>
                                <button onClick={handleSelectSlot}>Select</button>
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

export default ScheduleAppointment;