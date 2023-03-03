import React, {useState} from 'react';
import StickyHeadTable from './DoctorTable';
import '../styles/Admdb.css';
import CheckboxesGroup from './DoctorFilter';
import { useHistory } from 'react-router-dom';

const Doctor = () => {
    const [searchInput, setSearchInput] = useState("");
    const history = useHistory();

    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        history.push('/todays_apmts');
    };

    return (
        <div>
            <div className="admind_header">
                <input type="text" placeholder='Enter patient name' onChange={handleChange} value={searchInput} className="searchTerm"></input>
                <button type="submit" className="searchButton">Go</button>
                <button className="aduser" onClick={handleAddUser}>Today's appointments</button>
            </div>
            <div>
                <div class="dropdown">
                    <CheckboxesGroup />
                </div>
                <div className="admind_table">
                    <StickyHeadTable />
                </div>
            </div>
        </div>
     );
}

export default Doctor;
