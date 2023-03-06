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

    let data = [];
    data.push({"DBA":15, "DEO": 20, "FDO": 30, "DOC": 40});

    let users = [];
    users.push(
    {
        "address": "KGP",
        "name": "Vikas Basti",
        "ph_number": "8830475325  ",
        "type": "doc",
        "user_id": "DOC1"
    });
    users.push(
    {
        "address": "Delhi",
        "name": "Yashraj",
        "ph_number": "916393746715",
        "type": "dba",
        "user_id": "DBA1"
    });
    users.push(
    {
        "address": "Delhi",
        "name": "Astitva",
        "ph_number": "910987654321",
        "type": "fdo",
        "user_id": "FDO2"
    });

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
                    <StickyHeadTable users={users}/>
                </div>
                <div className="usr_cards">
                    <div className="usr_types_dba">
                        <h3>DBAs</h3>
                        <h2>{data[0]["DBA"]}</h2>
                    </div>
                    <br />
                    <div className="usr_types_fd">
                        <h3>FDOs</h3>
                        <h2>{data[0]["FDO"]}</h2>
                    </div>
                    <br />
                    <div className="usr_types_doctor">
                        <h3>Doctors</h3>
                        <h2>{data[0]["DOC"]}</h2>
                    </div>
                    <br />
                    <div className="usr_types_de">
                        <h3>DEOs</h3>
                        <h2>{data[0]["DEO"]}</h2>
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