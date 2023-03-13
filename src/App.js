import './App.css';
import Login from './components/Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './components/Footer';
import Navbar from './components/Navbar';
import About from './components/about';
import Navbar2 from './components/Navbar2';
import AdminDashboard from './components/AdminDashboard';
import DataEntry from './components/DataEntry';
import Doctor from './components/Doctor';
import Register from './components/Register';
import FrontDesk from './components/FrontDesk';
import Admit from './components/Admit';
import Discharge from './components/Discharge';
import AdminAddUser from './components/AdminAddUser';
import TodaysApmts from './components/DoctorAppointments';
import PatientDetails from './components/PatientDetails';
import AddTestResults from './components/AddTestResults';
import AddTreatment from './components/AddTreatment';
import ScheduleAppointment from './components/ScheduleAppointment';
import ScheduleTest from './components/ScheduleTest';
import NotFound from './components/NotFound';
import Navbar3 from './components/Navbar3';
import Navbar4 from './components/Navbar4';
import Home from './components/Home';
import DocSlots from './components/docSlots';

function App() {
  return (
    <Router>
      <div className="App">
        <div className="container">
          <Switch>
            <Route exact path='/'>
              <Navbar />
              <Home />
              <Footer />
            </Route>
            <Route exact path='/login'>
              <Navbar4 />
              <Login />
              <Footer />
            </Route>
            <Route exact path='/admin'>
              <Navbar3 />
              <AdminDashboard />
              <Footer />
            </Route>
            <Route exact path='/about'>
              <About />
            </Route>
            <Route exact path='/dataentry'>
              <Navbar3 />
              <DataEntry />
              <Footer />
            </Route>
            <Route exact path='/doctor'>
              <Navbar3 />
              <Doctor />
              <Footer />
            </Route>
            <Route exact path='/register'>
              <Navbar2 />
              <Register />
              <Footer />
            </Route>
            <Route exact path='/frontdesk'>
              <Navbar3 />
              <FrontDesk />
              <Footer />
            </Route>
            <Route exact path='/admit'>
              <Navbar2 />
              <Admit />
              <Footer />
            </Route>
            <Route exact path='/discharge'>
              <Navbar2 />
              <Discharge />
              <Footer />
              </Route>
            <Route exact path='/adduser'>
              <Navbar2 />
              <AdminAddUser />
              <Footer />
            </Route>
            <Route exact path='/todays_apmts'>
              <Navbar2 />
              <TodaysApmts />
              <Footer />
            </Route>
            <Route exact path='/patient_details'>
              <Navbar2 />
              <PatientDetails />
              <Footer />
            </Route>
            <Route exact path='/addtestresults'>
              <Navbar2 />
              <AddTestResults />
              <Footer />
            </Route>
            <Route exact path='/addtreatments'>
              <Navbar2 />
              <AddTreatment />
              <Footer />
            </Route>
            <Route exact path='/scheduleappointment'>
              <Navbar2 />
              <ScheduleAppointment />
              <Footer />
            </Route>
            <Route exact path='/scheduletest'>
              <Navbar2 /> 
              <ScheduleTest />
              <Footer />
            </Route>
            <Route exact path='/addslot'>
              <Navbar2 /> 
              <DocSlots />
              <Footer />
            </Route>
            <Route exact path='*'>
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;