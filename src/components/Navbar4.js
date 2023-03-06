
import NavbarLogo from './NavbarLogo';
import '../styles/navbar3.css';
import { Link } from '@mui/material';
import { useHistory } from 'react-router-dom';


const Navbar4 = () => {
    const history = useHistory();
    const handleLogoCLick = (e) => {
        history.push('/');
    }

    return (
        <nav className='navbar3'>
            <div className="logo"><Link onClick={(e) => handleLogoCLick(e)}><NavbarLogo /></Link></div>
            <div className='vikasHName'>
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
        </nav>
    );
}

export default Navbar4;
