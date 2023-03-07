import { useHistory } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';
import FormDialogReset from './ResetPasswordPopup';
import '../styles/navbar3.css';
import { Link } from '@mui/material';
import axios from 'axios';
// import axios from 'axios';
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
            <div className='vikasHName2'>
                {/* <NavbarLogo /> */}
                Azad Hospital
            </div>
            <div className="vikasChangePass">
                {/* <button onClick={handleChangePass}>Change Password</button> */}
                <FormDialogReset />
            </div>
            <div className='vikasmyHome'>
                <button onClick={handleMyHome}>Logout</button>
            </div>
            {/* <div className='vikasmyHome2'>
                <Link to="/login"><button >Logout</button></Link>
            </div> */}
        </nav>
    );
}

export default Navbar3;
