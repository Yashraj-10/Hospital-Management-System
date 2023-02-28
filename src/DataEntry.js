import React from 'react';
import { Link } from 'react-router-dom';
import './DataEnt.css';

const DataEntry = () => {
    return ( 
        <div class="pde-box">
            <h2> Patient Data Entry </h2>
            <form>
                <div class="user-box">
                    <input
                        type="text"
                        name=""
                        required
                    />
                    <label>Name</label>
                    
                </div>
                <div class="user-box">
                    <input
                        type="text"
                        name=""
                        required
                    />
                    <label>Address</label>
                </div>
                <div class="user-box">
                    <input
                        type="text"
                        name=""
                        required
                    />
                    <label>Address</label>
                </div>
                <div class="user-box">
                    <input
                        type="text"
                        name=""
                        required
                    />
                    <label>Address</label>
                </div>
                <div class="user-box">
                    <input
                        type="text"
                        name=""
                        required
                    />
                    <label>Address</label>
                </div>
                <Link to="#">
                    {/* <span></span>
                    <span></span>
                    <span></span>
                    <span></span> */}
                    Submit
                </Link>
            </form>
        </div>
     );
}
 
export default DataEntry;