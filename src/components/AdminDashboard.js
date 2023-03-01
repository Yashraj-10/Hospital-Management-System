import React, {useState} from 'react';
import StickyHeadTable from './AdminTable';
import '../styles/Admdb.css';

const AdminDashboard = () => {

    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };
    let no_dbas = 0;
    let no_doctors = 0;
    let no_fds = 0;
    let no_des = 0;
    return ( 
        <div>
            <div className="admind_header">
                <input type="text" placeholder='Search here' onChange={handleChange} value={searchInput} className="searchTerm"></input>
                <button type="submit" className="searchButton">Go</button>
                <button className="aduser">Add User</button>
            </div>
            <div>
                <div class="dropdown">
                    <select className="dropbtn">
                        <option className='dropdown-content' value="DBA">DBA</option>
                        <option className='dropdown-content' value="Doctor">Doctor</option>
                        <option className='dropdown-content' value="FD">FD</option>
                        <option className='dropdown-content' value="DE">DE</option>
                    </select>
                </div>
                <div className="admind_table">
                    <StickyHeadTable />
                </div>
                <div className="usr_cards">
                    <div className="usr_types">
                        <h3>DBAs</h3>
                        <h4>{no_dbas}</h4>
                    </div>
                    <br />
                    <div className="usr_types">
                        <h3>Doctors</h3>
                        <h4>{no_doctors}</h4>
                    </div>
                    <br />
                    <div className="usr_types">
                        <h3>Front desks</h3>
                        <h4>{no_fds}</h4>
                    </div>
                    <br />
                    <div className="usr_types">
                        <h3>Data entrys</h3>
                        <h4>{no_des}</h4>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminDashboard;