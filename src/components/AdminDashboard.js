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

    let no_dbas = 220;
    let no_doctors = 475;
    let no_fds = 280;
    let no_des = 160;
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
                        <h2>{no_dbas}</h2>
                    </div>
                    <br />
                    <div className="usr_types_fd">
                        <h3>FDOs</h3>
                        <h2>{no_fds}</h2>
                    </div>
                    <br />
                    <div className="usr_types_doctor">
                        <h3>Doctors</h3>
                        <h2>{no_doctors}</h2>
                    </div>
                    <br />
                    <div className="usr_types_de">
                        <h3>DEOs</h3>
                        <h2>{no_des}</h2>
                    </div>
                    <div className="admind_footer">
                        <br />
                        <h3>Quantity</h3>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default AdminDashboard;