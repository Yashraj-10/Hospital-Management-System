
import { useHistory } from 'react-router-dom';
// import NavbarLogo from './NavbarLogo';
const Navbar2 = () => {
    const history = useHistory();
    const handleMyHome = () => {
        history.push('/');
    }
    return (
        <nav className="navbar2">
            <div className="vikasHName">
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
            <div className='vikasmyHome1'>
                <button onClick={handleMyHome}>Logout</button>
            </div>
            {/* <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div> */}
        </nav>
    );
}

export default Navbar2;
