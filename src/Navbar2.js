import { Link } from 'react-router-dom';

const Navbar2 = () => {
    return (

        <nav className="navbar2">
            <h1>Hospital Management System</h1>
            <div className="links">
                <Link to="/login">Logout</Link>
            </div>
        </nav>
    );
}


export default Navbar2;