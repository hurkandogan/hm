import React from 'react';
import { FaBars } from 'react-icons/fa';
import AuthService from '../../connection/auth.service';
import { useHistory } from 'react-router-dom';

const TopNav = () => {

  const history = useHistory();
  
  const signout = () => {
    AuthService.signout();
    history.push("/");
  }

    return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" role="button">
            <FaBars />
            </a>
          </li>
      {/* <li className="nav-item d-none d-sm-inline-block">
        <a href="#" className="nav-link">Test</a>
      </li> */}
        </ul>

    {/* Right navbar links */}
    <ul className="navbar-nav ml-auto">
      <li className="nav-item">
          <button className="btn btn-outline-danger" onClick={signout}>Logout</button>
      </li>
    </ul>
  </nav>
  </div>
    );
}

export default TopNav;