import React, {useState} from 'react';
import StickyHeadTable from './AdminTable';
import '../styles/Admdb.css';

import CheckboxesGroup from './AdminFilter';
import { useHistory } from 'react-router-dom';

const AdminDashboard = () => {

    const [searchInput, setSearchInput] = useState("");

    const history = useHistory();
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    const handleAddUser = (e) => {
        e.preventDefault();
        history.push('/adduser');
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
                <button className="aduser" onClick={handleAddUser}>Add User</button>
            </div>
            <div>
                <div class="dropdown">
                    <CheckboxesGroup />
                </div>
                <div className="admind_table">
                    <StickyHeadTable />
                </div>
                <div className="usr_cards">
                    <div className="usr_types_dba">
                        <h3>DBAs</h3>
                        <h4>{no_dbas}</h4>
                    </div>
                    <br />
                    <div className="usr_types_fd">
                        <h3>FDOs</h3>
                        <h4>{no_fds}</h4>
                    </div>
                    <br />
                    <div className="usr_types_doctor">
                        <h3>Doctors</h3>
                        <h4>{no_doctors}</h4>
                    </div>
                    <br />
                    <div className="usr_types_de">
                        <h3>DEOs</h3>
                        <h4>{no_des}</h4>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminDashboard;