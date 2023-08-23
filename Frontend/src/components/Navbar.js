import { useHistory } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';
import '../styles/navbar3.css';
import { Link } from '@mui/material';
import axios from 'axios';
const Navbar = () => {
    const history = useHistory();
    const handleMyHome = () => {
        history.push('/login');
        axios.post('/logout', {access_token: localStorage.getItem('access_token')})
        .then((response) => {
            console.log(response.data);
        }
        , (error) => {
            console.log(error);
        }
        )
    }
    const handleLogoCLick = (e) => {
        
        let token_type = localStorage.getItem('access_token').slice(0, 3);
        if(token_type === "doc"){
            history.push("/doctor");
        }
        else if(token_type === "fdo"){
            history.push("/frontdesk");
        }
        else if(token_type === "dba"){
            history.push("/admin");
        }
        else if(token_type === "deo"){
            history.push("/dataentry");
        }
        else{
            history.push('/');
        }
    }

    return (
        <nav className='navbar3'>
            <div className="logo"><Link onClick={(e)=>handleLogoCLick(e)}><NavbarLogo /></Link></div>
            <div className='vikasHName'>
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
            <div className='vikasmyHomeNav'>
                <button onClick={handleMyHome}><b>Log In</b></button>
            </div>
            {/* <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div> */}
        </nav>
    );
}

export default Navbar;
