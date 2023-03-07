import { useHistory } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';
import '../styles/navbar3.css';
import { Link } from '@mui/material';
import axios from 'axios';
const Navbar3 = () => {
    const history = useHistory();
    const handleMyHome = () => {
        history.push('/login');
        axios.post('https://dbms-backend-api.azurewebsites.net/logout', {access_token: localStorage.getItem('access_token')})
        .then((response) => {
            console.log(response.data);
        }
        , (error) => {
            console.log(error);
        }
        )
    }
    const handleLogoCLick = (e) => {
        history.push('/');
    }

    return (
        <nav className='navbar3'>
            <div className="logo"><Link onClick={(e) => handleLogoCLick(e)}><NavbarLogo /></Link></div>
            <div className='vikasHName2'>
                Azad Hospital
            </div>
            <div className='vikasmyHomeNav2'>
                <button onClick={handleMyHome}>Logout</button>
            </div>
            {/* <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div> */}
        </nav>
    );
}

export default Navbar3;
