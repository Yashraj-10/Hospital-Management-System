import Aditya from '../images/Aditya.jpg';
import Astitva from '../images/Astitva.png';
import Vikas from '../images/vikas.png';
import Yashraj from '../images/Yashraj.jpg';
import Rishi from '../images/Rishi.png';
const About = () => {
    return (
        <div className="about-us">
            <h1>About us</h1>
            <div className="row">

                <div className="column">
                    <img src={Aditya} alt="doctor" />
                    <div className="card-content">
                        <h3>Aditya Choudhary</h3>
                        <p>20CS10005 </p>
                    </div>

                </div>

                <div className="column">
                    <img src={Astitva} alt="doctor" />
                    <div className="card-content">
                        <h3>Astitva</h3>
                        <p>20CS30007</p>
                    </div>
                </div>


                <div className="column">
                    <img src={Vikas} alt="doctor" />
                    <div className="card-content">
                        <h3>Vikas Vijaykumar Bastewad</h3>
                        <p>20CS10073 </p>
                    </div>
                </div>
                <div className="column">
                    <img src={Yashraj} alt="doctor" />
                    <div className="card-content">
                        <h3>Yashraj Singh</h3>
                        <p>20CS10079 </p>
                    </div>
                </div>
                <div className="column">
                    <img src={Rishi} alt="doctor" />
                    <div className="card-content">
                        <h3>Rishi Raj</h3>
                        <p>20CS30040</p>
                    </div>
                </div>
            </div>
        </div>

        
    );
}

export default About;