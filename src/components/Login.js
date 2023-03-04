import React from 'react';
import axios from "axios";
import { useState } from 'react';
import { useHistory } from 'react-router-dom';

const Login = () => {
    const [user_id, setUser_id] = useState("");
    const [password, setPassword] = useState("");

    const history = useHistory();

    const handleSubmit = (e) => {
        // e.preventDefault();
        console.log(user_id, password);
        // let ret_val = getLogin(e, user_id, password);
        // console.log(123)
        // console.log(ret_val)
        // console.log(123)
        // if(ret_val === 200) {
        //     history.push("/frontdesk");
        // }
        // else {
        //     history.push("/login");
        // }

        axios.post("/login", {user_id: user_id, password: password})
        .then((response) => {
            console.log(response);
            history.push("/frontdesk");
        }
        , (error) => {
            console.log(error);
            history.push("/login");
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
                <button className='yashrajButton' onClick={handleSubmit}>
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Log In
                </button>
            </form>
        </div>
    );
}

export default Login;