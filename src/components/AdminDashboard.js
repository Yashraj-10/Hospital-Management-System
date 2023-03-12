import React, { useEffect, useState } from 'react';
import StickyHeadTable from './AdminTable';
import '../styles/Admdb.css';
import Box from '@mui/material/Box';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
// import CheckboxesGroup from './AdminFilter';
import { useHistory } from 'react-router-dom';
import axios from 'axios';

const AdminDashboard = () => {

    const [searchInput, setSearchInput] = useState("");

    const [post, setPost] = React.useState(null);
    const [dummyPost, setDummyPost] = React.useState(null);
    const [usertype, setUsertype] = React.useState(null);
    const [isUser, setIsuser] = useState(false);
    const history = useHistory();

    const [state, setState] = React.useState({
        DBA: false,
        FDO: false,
        DEO: false,
        DOC: false,
    });

    const handleStateChange = (event) => {
        setState({
            ...state,
            [event.target.name]: event.target.checked,
        });
    };

    const { DBA, FDO, DEO, DOC } = state;



    const handleChange = (e) => {
        e.preventDefault();
        // setSearchInput(e.target.value);
        console.log(searchInput);
        axios
            .post('https://dbms-backend-api.azurewebsites.net/user?search_string='.concat(`${searchInput}`), {
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
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        history.push('/adduser');
    };

    let data = [];
    data.push({ "DBA": 15, "DEO": 20, "FDO": 30, "DOC": 40 });
    let users = [];
    const handleRefresh = () => {
        //   e.preventDefault();
        var DBA = state.DBA;
        var DEO = state.DEO;
        var FDO = state.FDO;
        var DOC = state.DOC;
        console.log(state);
        console.log("----------------")
        // console.log(DBA);
        // var { DBA, DEO, FDO, DOC } = state;

        // filtering the user list based on type
        if (DBA || DEO || FDO || DOC) {
            dummyPost && dummyPost.map((user) => {
                // console.log(users)
                if (DBA && user.type == 'dba') {
                    users.push(user);
                    console.log("dba")
                }
                if (DEO && user.type == 'deo') {
                    users.push(user);
                    console.log("deo")
                }
                if (FDO && user.type == 'fdo') {
                    users.push(user);
                    console.log("fdo")
                }
                if (DOC && user.type == 'doc') {
                    users.push(user);
                    console.log("doc")
                }
                console.log("xxxxxx")
                // console.log(post)
                setPost(users);
            });
        }
        else {
            setPost(dummyPost);
        }
    }

    useEffect(() => {
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if (token_type === "dba") { setIsuser(true); }
        var self_user_id = localStorage.getItem("self_user_id");
        axios.post('https://dbms-backend-api.azurewebsites.net/users', {
            access_token: localStorage.getItem("access_token")
        })
            .then(
                (response) => {
                    setPost(response.data);
                    setDummyPost(response.data);
                    console.log(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );

        axios.post('https://dbms-backend-api.azurewebsites.net/user_type_count', {
            access_token: localStorage.getItem("access_token")
        })
            .then(
                (response) => {
                    setUsertype(response.data);
                    // console.log(response.data);
                },
                (error) => {
                    console.log(error);
                }
            );
        

    }, []);

    useEffect(() => {
        handleRefresh();
    }, [state]);


    return (
        <div>
            {isUser && <div>
                <div className="admind_header">
                    <input type="text" placeholder='Search here' onChange={(e) => setSearchInput(e.target.value)} value={searchInput} className="searchTerm"></input>
                    <button type="submit" className="searchButton" onClick={handleChange}>Go</button>
                    <button className="aduser" onClick={handleAddUser}>Add User</button>
                </div>
                <div>
                    <div class="dropdown">
                        {/* <CheckboxesGroup /> */}
                        <Box sx={{ display: 'flex' }}>
                            <FormControl sx={{ m: -2 }} component="fieldset" variant="standard">
                                <FormLabel component="legend"></FormLabel>
                                <FormGroup>
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={state.DBA} onChange={handleStateChange} name="DBA" />
                                        }
                                        label="DBA"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={state.FDO} onChange={handleStateChange} name="FDO" />
                                        }
                                        label="FDO"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={state.DEO} onChange={handleStateChange} name="DEO" />
                                        }
                                        label="DEO"
                                    />
                                    <FormControlLabel
                                        control={
                                            <Checkbox checked={state.DOC} onChange={handleStateChange} name="DOC" />
                                        }
                                        label="DOC"
                                    />
                                </FormGroup>
                            </FormControl>
                        </Box>
                    </div>
                    {post && <div className="admind_table">
                        <StickyHeadTable users={post} />
                    </div>}
                    {usertype && <div className="usr_cards">
                        <div className="usr_types_dba">
                            <h3>DBAs</h3>
                            <h2>{usertype.DBA}</h2>
                        </div>
                        <br />
                        <div className="usr_types_fd">
                            <h3>FDOs</h3>
                            <h2>{usertype.FDO}</h2>
                        </div>
                        <br />
                        <div className="usr_types_doctor">
                            <h3>Doctors</h3>
                            <h2>{usertype.DOC}</h2>
                        </div>
                        <br />
                        <div className="usr_types_de">
                            <h3>DEOs</h3>
                            <h2>{usertype.DEO}</h2>
                        </div>
                        {/* <div className="admind_footer">
                        <br />
                        <h3>Quantity</h3>
                    </div> */}
                    </div>}
                </div>
            </div>}
            {
                !isUser && <div className='notAuthorized'> <div class="w3-display-middle">
                    <h1 class="w3-jumbo w3-animate-top w3-center"><code>Access Denied</code></h1>
                    {/* <h class="w3-border-white w3-animate-left" style="margin:auto;width:50%"> */}
                    <h3 class="w3-center w3-animate-right">You dont have permission to view this ptype.</h3>
                    <h3 class="w3-center w3-animate-zoom">🚫🚫🚫🚫</h3>
                    <h6 class="w3-center w3-animate-zoom">error code:403 forbidden</h6>
                </div></div>
            }
        </div>
    );
}

export default AdminDashboard;