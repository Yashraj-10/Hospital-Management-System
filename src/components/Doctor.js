import React, {useState} from 'react';
import StickyHeadTable from './DoctorTable';
import '../styles/Admdb.css';

const Doctor = () => {
    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return (
        <div>
            <div className="admind_header">
                <input type="text" placeholder='Enter patient name' onChange={handleChange} value={searchInput} className="searchTerm"></input>
                <button type="submit" className="searchButton">Go</button>
            </div>
            <div>
                <div class="dropdown">
                    <select className="dropbtn">
                        <option className='dropdown-content' value="All">All</option>
                        <option className='dropdown-content' value="This">This</option>
                        <option className='dropdown-content' value="Prev">Prev</option>
                    </select>
                </div>
                <div className="admind_table">
                    <StickyHeadTable />
                </div>
            </div>
        </div>
     );
}

export default Doctor;
