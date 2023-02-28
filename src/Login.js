import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        
        <div class="login-box">
            <h2>Login</h2>
            <form>
                <div class="user-box">
                    <input
                        type="text"
                        name=""
                        required
                    />
                    <label>Username</label>
                </div>
                <div class="user-box">
                    <input
                        type="password"
                        name=""
                        required
                    />
                    <label>Password</label>
                </div>
                <Link to="#">
                    <span></span>
                    <span></span>
                    <span></span>
                    <span></span>
                    Log In
                </Link>
            </form>
        </div>
    );
}

export default Login;