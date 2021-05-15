import React from 'react';
import { FaBars } from 'react-icons/fa';
import AuthService from '../../services/authorization/auth.service';

const TopNav = () => {
  
  const signout = () => {
    AuthService.signout();
    window.location.reload();
  }

    return (
    <div>
      {/* Navbar */}
      <nav className="main-header navbar navbar-expand navbar-white navbar-light">
      {/* Left navbar links */}
        <ul className="navbar-nav">
          <li className="nav-item">
            <a className="nav-link" data-widget="pushmenu" href="#" role="button">
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
          <button className="nav-link" onClick={signout}>Logout</button>
      </li>
    </ul>
  </nav>
  </div>
    );
}

export default TopNav;