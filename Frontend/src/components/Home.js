import Marquee from 'react-fast-marquee';
import '../styles/home.css';
const Home = () => {
    return ( 
        <div className='home'>
            <Marquee text="Azad" speed={200} className= 'sliding' gradient= {false}>Welcome to Azad Hospital  </Marquee>
        </div>
     );
}
 
export default Home;