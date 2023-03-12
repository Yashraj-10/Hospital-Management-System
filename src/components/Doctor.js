import React, { useEffect, useState } from "react";
import StickyHeadTable from "./DoctorTable";
import "../styles/Admdb.css";
// import CheckboxesGroup from "./DoctorFilter";
import axios from "axios";
import DoctorTodayApmts from "./DoctorAppointments";
import { useHistory } from "react-router-dom";
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const Doctor = () => {
  const [searchInput, setSearchInput] = useState("");

  const handleChange = (e) => {
    e.preventDefault();
    setSearchInput(e.target.value);
  };

  const [isTodayapmts, setIsTodayapmts] = useState(false);
  const [todaydata, setTodaydata] = React.useState(null);
  const [isUser, setIsuser] = useState(false);


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
  };

  if(todaydata){
    appointments = todaydata;
  }

  const handleBack = (e) => {
    setIsTodayapmts(false);
  };

  //   useEffect(() => {
  //       console.log("useEffect");
  //   }, [isTodayapmts]);

  let patients = [];
  var appointments = [];

  const [post, setPost] = React.useState(null);
  const [dummyPost, setDummyPost] = React.useState(null);

  useEffect(() => {
    let token_type = localStorage.getItem('access_token').slice(0, 3);
    if (token_type === "doc") { setIsuser(true); }
    else { setIsuser(false); }

    var self_user_id = localStorage.getItem("self_user_id");
    axios
      .post('https://dbms-backend-api.azurewebsites.net/patient?doc_id='.concat(`${self_user_id}`), {
        access_token: localStorage.getItem("access_token")
      })
      .then(
        (response) => {
          setPost(response.data);
          setDummyPost(response.data);
        },
        (error) => {
          console.log(error);
        }
      );
  }, [isUser]);



const history = useHistory();

const handleSetSlot = (e) => {
    history.push('/doctor/add_slot')
};
  const getSearchQuery = (query) => {
    console.log(query);
    var temp = 0;
    for (var i = 0; i < query.length; i++) {
      if (query[i] >= '0' && query[i] <= '9') {
        temp = 1;
        break;
      }
    }
    if (temp) {
      localStorage.setItem('patient_id', query);
      history.push('/patient_details');
    }

    else {
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
  const [state, setState] = React.useState({
    Above: false,
    Between1: false,
    Between2: false,
    Below: false,
  });
  const [isRefresh, setIsRefresh] = useState(false);
  const handleStateChange = (event) => {
    // event.preventDefault();
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

  var { Above, Between1, Between2, Below } = state;

  React.useEffect(() => {
    state.Above = Above;
    state.Between1 = Between1;
    state.Between2 = Between2;
    state.Below = Below;
    console.log(state);

    // filtering the patient list based on age
    if (Above || Between1 || Between2 || Below) {
      dummyPost && dummyPost.map((patient) => {
        if (Above && patient.age >= 60) {
          patients.push(patient);
        }
        if (Between1 && patient.age >= 40 && patient.age < 60) {
          patients.push(patient);
        }
        if (Between2 && patient.age >= 20 && patient.age < 40) {
          patients.push(patient);
        }
        if (Below && patient.age < 20) {
          patients.push(patient);
        }
      });
      setPost(patients);
    }
    else {
      setPost(dummyPost);
    }
  }, [state]);

  return (
    <div>
      {!isTodayapmts && isUser && post && (
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
          </div>
          <div>
          <button className="aduser" onClick={handleTodayapmts}>
              <b>Future Appointments</b>
            </button>
            <button className="aduser" onClick={handleSetSlot}>
              <b>Add Slot</b>
            </button>
          </div>
          <div>
            <div className="dropdownAge">
              {/* <CheckboxesGroup /> */}
              <Box sx={{ display: 'flex' }}>
                <FormControl sx={{ m: -2 }} component="fieldset" variant="standard">
                  <FormLabel component="legend"></FormLabel>
                  <FormGroup>
                    <FormControlLabel
                      control={
                        <Checkbox checked={Above} onChange={(e) => handleStateChange(e)} name="Above" />
                      }
                      label="Above 60 yrs"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={Between1} onChange={(e) => handleStateChange(e)} name="Between1" />
                      }
                      label="Between 40 to 60 yrs"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={Between2} onChange={(e) => handleStateChange(e)} name="Between2" />
                      }
                      label="Between 20 to 40 yrs"
                    />
                    <FormControlLabel
                      control={
                        <Checkbox checked={Below} onChange={(e) => handleStateChange(e)} name="Below" />
                      }
                      label="Below 20 yrs"
                    />
                  </FormGroup>
                </FormControl>
              </Box>
            </div>
            <div className="admind_table">
              <StickyHeadTable patients={post} />
            </div>
          </div>
        </>
      )}
      {isTodayapmts && isUser && todaydata && (
        <div className="admind_table">
          <button className="backButton" onClick={handleBack}>
            <b>Back</b>
          </button>
          <DoctorTodayApmts appointments={appointments} />
        </div>
      )}
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
};

export default Doctor;
