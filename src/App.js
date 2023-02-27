import './App.css';
import Login from './Login';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Footer from './Footer';
import Navbar from './Navbar';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <h2 className='hospital-name'>Hospital Management System</h2>
        <div className="container">
          <Switch>
            <Route exact path='/'>
            <p className='test-font'> Lorem, ipsum dolor sit amet consectetur adipisicing elit.</p>
            </Route>
            <Route exact path='/login'>
              <Login />
            </Route>


          </Switch>
        </div>
      </div>
      <Footer />
    </Router>
  );
}

export default App;
