import { Link } from "react-router-dom";
const Footer = () => {
    return (
        <div className="footer">
            <div className="row">
                <div className="column">© 2023 Hospital Management System. All Rights Reserved.</div>
                <div className="column">
                <Link to="/about" style={{
                    textDecoration: 'none'
                }}> About us </Link>
                </div>
            </div>

        </div>

    );
}

export default Footer;