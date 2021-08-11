import React from 'react';
import { Login } from './components/Login.js';
import { Reset } from './components/Reset.js';
import { Signup } from './components/Signup.js';
import { ToastContainer } from 'react-toastify';
// import Producted from './components/Producted';
import 'react-toastify/dist/ReactToastify.css';
// import './App.css';

import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';


function App() {
  return (
    <div>
      <Router>
        <Switch>
          <Route exact path="/" component={Login} />
          <Route exact path="/reset" component={Reset} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signup" component={Signup} />
          {/* <Producted exact path="/home" component={Home} /> */}
        </Switch>
        <ToastContainer />
      </Router>
    </div>
  )
}

export default App;
