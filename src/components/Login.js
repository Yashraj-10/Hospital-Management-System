import React from 'react';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    const handleSubmit = (e) => {
        console.log(user_id, password);

        axios.post('https://dbms-backend-api.azurewebsites.net/login', { user_id: user_id, password: password })
            .then((response) => {
                // console.log(response.data['access_token']);
                console.log(response.data);
                // console.log(response.data.access_token);
                // take the first three letters of access_token
                let token = response.data.access_token;
                localStorage.setItem("access_token", token);
                localStorage.setItem("user_id", user_id);
                let token_type = token.slice(0, 3);
                console.log(token_type);
                if(token_type === "doc"){
                    // alert("Doctor Login Successful");
                    history.push("/doctor");
                }
                else if(token_type === "fdo"){
                    // alert("Front Desk Operator Login Successful");
                    history.push("/frontdesk");
                }
                else if(token_type === "dba"){
                    alert("Admin Login Successful");
                    history.push("/admin");
                }
                else if(token_type === "deo"){
                    // alert("Data Entry Operator Login Successful");
                    history.push("/dataentry");
                }
                else{
                    alert("Invalid Credentials");
                }
            }, (error) => {
                console.log(error);
                alert("Invalid Credentials");
            }
            )
    }
    return (

        <div className='login-box'>
            <h2>Login</h2>
            <form>
                <div className='user-box'>
                    <input
                        type="text"
                        name=""
                        required
                        onChange={(e) => setUser_id(e.target.value)}
                    />
                    <label>Username</label>
                </div>
                <div className='user-box'>
                    <input
                        type="password"
                        name=""
                        required
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label>Password</label>
                </div>
                <button type="button" className='yashrajButton' onClick={handleSubmit}>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;