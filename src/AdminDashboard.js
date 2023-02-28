import React, {useState} from 'react';
import StickyHeadTable from './AdminTable';

const AdminDashboard = () => {

    const [searchInput, setSearchInput] = useState("");
    const handleChange = (e) => {
        e.preventDefault();
        setSearchInput(e.target.value);
    };

    return ( 
        <div className="admind">
            <div className="admind_header">
                <input type="text" placeholder='Search here' onChange={handleChange} value={searchInput} className="searchTerm"></input>
                <button type="submit" className="searchButton">Go</button>
                <button className="aduser">Add User</button>
            </div>
            <div className="admind_table">
                <StickyHeadTable />
            </div>
        </div>
     );
}
 
export default AdminDashboard;