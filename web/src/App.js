import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom'

import Navbar from './Components/Navbar'

import './Components/App.css';
import Login from "./Components/Login";
import Register from "./Components/Register";

class App extends Component {

  render() {
    return (
        <Router>
          <Navbar />
          <div className="App">
            <Route exact path="/">
              <div className="view-body">
                <h1 className="AppTitle">React Template</h1>
                <p className="AppDesc">Let's start to code !</p>
              </div>
            </Route>
            <Route exact path="/login">
              <Login />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="/profile">
              <div>
                Your custom view
              </div>
            </Route>
          </div>
        </Router>
    );
  }
}

export default App;
