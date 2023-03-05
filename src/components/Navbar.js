import { useHistory } from 'react-router-dom';
// import NavbarLogo from './NavbarLogo';
import '../styles/navbar3.css';
const Navbar = () => {
    const history = useHistory();
    const handleMyHome = () => {
        history.push('/login');
    }

    return (
        <nav className='navbar3'>
            <div className='vikasHName'>
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
            <div className='vikasmyHome'>
                <button onClick={handleMyHome}>Log In</button>
            </div>
            {/* <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div> */}
        </nav>
    );
}

export default Navbar;
