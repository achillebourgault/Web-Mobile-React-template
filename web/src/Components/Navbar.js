import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom'
import './App.css';

class Navbar extends Component {
    logOut(e) {
        e.preventDefault();
        localStorage.clear();
        this.props.history.push('/login');
    }
    render() {
        /* If user is still on login page, then this component will get display */
        const loginReglink = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <Link to="/login" className="nav-link" style={{color: "white"}}>
                        Log In
                    </Link>
                </li>
                <li className="nav-item">
                    <Link to="/register" className="nav-link" style={{color: "white"}}>
                        Sign Up
                    </Link>
                </li>
            </ul>
        );
        const userLink = (
            <ul className='navbar-nav'>
                <li className="nav-item">
                    <a href="/#" onClick={this.logOut.bind(this)} className="nav-link" style={{color: "white"}}>
                        Logout
                    </a>
                </li>
            </ul>
        )
        return (
            <nav className={"navbar navbar-expand-lg navbar-dark bg-dark"}>
                <button className="navbar-toggler"
                    type="Button"
                    data-toggle="Collapse"
                    data-target="#navbar1"
                    aria-controls="navbar1"
                    aria-expanded="false"
                    aria-label="Toggle navigation">
                    <span className="navbar-toggle-icon"></span>
                </button>
                <div className="collapse navbar-collapse justify-content-md-center" id="navbar1">
                    {localStorage.usertoken? userLink:loginReglink}
                </div>
            </nav>
        );
    }
}

export default withRouter(Navbar);
