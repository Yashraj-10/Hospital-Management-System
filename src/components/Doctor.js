import React, { useEffect, useState } from "react";
import StickyHeadTable from "./DoctorTable";
import "../styles/Admdb.css";
import CheckboxesGroup from "./DoctorFilter";
import axios from "axios";
import DoctorTodayApmts from "./DoctorAppointments";

const Doctor = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  let appointments = [];

  const [isTodayapmts, setIsTodayapmts] = useState(false);
  const [todaydata, setTodaydata] = useState(null);

  const handleTodayapmts = (e) => {
    setIsTodayapmts(true);
    e.preventDefault();

    axios
        .post("https://dbms-backend-api.azurewebsites.net/appointment?doc_id=DOC1", {
            access_token:
            "doceyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODEwMjgzMCwianRpIjoiZDc4MGY4NGUtNWMwMy00OWM1LTg5MzQtMzUxMzFiMmVkZjQ5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkRPQzEiLCJuYmYiOjE2NzgxMDI4MzAsImV4cCI6MTY3ODEwMzczMH0.mRB1-JIbAN7Y2qw3oLWAFdkEJYTHKzs9utRpcISN5xQ",
        })
        .then(
            (response) => {
                setTodaydata(response.data);
            }
        ,
        (error) => {
            console.log(error);
        }
        );

    if (todaydata) {
        appointments = todaydata;
    }
  };

  const handleBack = (e) => {
    setIsTodayapmts(false);
  };

//   useEffect(() => {
//       console.log("useEffect");
//   }, [isTodayapmts]);

  let patients = [];

    const [post, setPost] = React.useState(null);

    useEffect(() => {
  axios
    .post("https://dbms-backend-api.azurewebsites.net/patient?doc_id=DOC1", {
      access_token:
        "doceyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmcmVzaCI6ZmFsc2UsImlhdCI6MTY3ODEwMjgzMCwianRpIjoiZDc4MGY4NGUtNWMwMy00OWM1LTg5MzQtMzUxMzFiMmVkZjQ5IiwidHlwZSI6ImFjY2VzcyIsInN1YiI6IkRPQzEiLCJuYmYiOjE2NzgxMDI4MzAsImV4cCI6MTY3ODEwMzczMH0.mRB1-JIbAN7Y2qw3oLWAFdkEJYTHKzs9utRpcISN5xQ",
    })
    .then(
      (response) => {
        setPost(response.data);
    },
    (error) => {
        console.log(error);
    }
    );
}, []);

    if (post) {
        patients = post;
    }

  return (
    <div>
      {!isTodayapmts && (
        <>
          <div className="doctor_header">
            <input
              type="text"
              placeholder="Enter patient name"
              onChange={handleChange}
              value={searchInput}
              className="searchTerm"
            ></input>
            <button type="submit" className="searchButton">
              Go
            </button>
            <button className="aduser" onClick={handleTodayapmts}>
              Today's appointments
            </button>
          </div>
          <div>
            <div className="dropdownAge">
              <CheckboxesGroup />
            </div>
            <div className="admind_table">
              <StickyHeadTable patients={patients} />
            </div>
          </div>
        </>
      )}
      {isTodayapmts && (
        <div className="admind_table">
          <button className="backButton" onClick={handleBack}>
            Back
          </button>
          <DoctorTodayApmts appointments={appointments} />
        </div>
      )}
    </div>
  );
};

export default Doctor;
