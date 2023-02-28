import React from 'react';
import { Link } from 'react-router-dom';
const Login = () => {
    return (
        <>
        <header><h1>Name of hospital</h1></header>
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
                <div class="forget">
                    <label for=""><input type="checkbox" />Remember Me  <Link to="##">Forgot Password ?</Link></label>
                </div>
                <Link to="#">
                    Log in
                </Link>
            </form>
        </div>
        </>
    );
}

export default Login;