import { Link } from 'react-router-dom';
import { useHistory } from 'react-router-dom';
const Navbar2 = () => {
    const history = useHistory();
    const handleMyHome = () => {
        history.push('/');
    }
    return (
        <nav className="navbar2">
            <div className="vikasHName">
                <p>XYZ Hospital</p>
            </div>
            <div className='vikasmyHome1'>
                <button onClick={handleMyHome}>Home</button>
            </div>
            <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div>
        </nav>
    );
}

export default Navbar2;
