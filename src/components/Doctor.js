import React, { useEffect, useState } from "react";
import StickyHeadTable from "./DoctorTable";
import "../styles/Admdb.css";
import CheckboxesGroup from "./DoctorFilter";
import axios from "axios";
import DoctorTodayApmts from "./DoctorAppointments";
import { useHistory } from "react-router-dom";

const Doctor = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  let appointments = [];

  const [isTodayapmts, setIsTodayapmts] = useState(false);
  const [todaydata, setTodaydata] = React.useState(null);

  const handleTodayapmts = (e) => {
    setIsTodayapmts(true);
    e.preventDefault();
    var self_user_id = localStorage.getItem("self_user_id");
    axios
        .post('https://dbms-backend-api.azurewebsites.net/appointments?doc_id='.concat(`${self_user_id}`), {
            access_token: localStorage.getItem("access_token")
        })
        .then(
            (response) => {
                setTodaydata(response.data);
                console.log(response.data);
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
      var self_user_id = localStorage.getItem("self_user_id");
  axios
    .post('https://dbms-backend-api.azurewebsites.net/patient?doc_id='.concat(`${self_user_id}`), {
      access_token: localStorage.getItem("access_token")
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

const history = useHistory();
  const getSearchQuery = (query) => {
    console.log(query);
    var temp = 0;
    for(var i =0; i < query.length; i++){
      if(query[i] >= '0' && query[i] <= '9'){
        temp = 1;
        break;
      }
    }
    if(temp){
      localStorage.setItem('patient_id', query);
      history.push('/patient_details');
    }

    else{
      axios
      .post('https://dbms-backend-api.azurewebsites.net/patient?search_string='.concat(`${query}`), {
        access_token: localStorage.getItem("access_token")
      })
      .then(
        (response) => {
          setPost(response.data);
      },
      (error) => {
          console.log(error);
      }
      );
  }
  }

  return (
    <div>
      {!isTodayapmts && post && (
        <>
          <div className="doctor_header">
            <input
              id="myForm"
              type="text"
              placeholder="Enter patient name/ID"
              onChange={handleChange}
              value={searchInput}
              className="searchTerm"
            ></input>
            <button type="submit" className="searchButton" onClick={() => getSearchQuery(searchInput)}>
              Go
            </button>
            <button className="aduser" onClick={handleTodayapmts}>
              <b>Today's Appointments</b>
            </button>
          </div>
          <div>
            <div className="dropdownAge">
              <CheckboxesGroup />
            </div>
            <div className="admind_table">
              <StickyHeadTable patients={post} />
            </div>
          </div>
        </>
      )}
      {isTodayapmts&& appointments && (
        <div className="admind_table">
          <button className="backButton" onClick={handleBack}>
           <b>Back</b>
          </button>
          <DoctorTodayApmts appointments={appointments} />
        </div>
      )}
    </div>
  );
};

export default Doctor;
