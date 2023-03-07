
import NavbarLogo from './NavbarLogo';
import '../styles/navbar3.css';
import { Link } from '@mui/material';
import { useHistory } from 'react-router-dom';


const Navbar4 = () => {
    const history = useHistory();
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
            <div className="logo"><Link onClick={(e) => handleLogoCLick(e)}><NavbarLogo /></Link></div>
            <div className='vikasHName'>
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
        </nav>
    );
}

export default Navbar4;
