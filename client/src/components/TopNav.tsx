import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  FaBars,
  FaSearch,
  FaTachometerAlt
} from 'react-icons/fa';
import { BsCircle } from 'react-icons/bs';
import AuthService from '../services/authorization/auth.service';

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

  <aside className="main-sidebar sidebar-dark-primary elevation-4">
      {/* <img src="#" className="brand-image img-circle elevation-3" style={{opacity: '0.8'}} /> */}
      <span className="brand-text font-weight-light">HugOS</span>

    <div className="sidebar">
      <div className="user-panel mt-3 pb-3 mb-3 d-flex">
        {/* <div className="image">
          <img src="#" className="img-circle elevation-2" />
        </div> */}
              <div className="info">
                <a href="#" className="d-block">Hurkan Dogan</a>
        </div>
      </div>

      <div className="form-inline">
        <div className="input-group" data-widget="sidebar-search">
          <input className="form-control form-control-sidebar" disabled={true} type="search" placeholder="Search" aria-label="Search" />
          <div className="input-group-append">
            <button className="btn btn-sidebar" disabled={true}>
              <FaSearch />
            </button>
          </div>
        </div>
      </div>

      {/* <!-- Sidebar Menu --> */}
      <nav className="mt-2">
        <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
          <li className="nav-header">General</li>        
          <li className="nav-item menu-open">
                  <NavLink to={"/"} className="nav-link" activeClassName="active">
              <FaTachometerAlt />
              <p>
                Dashboard  
              </p>
            </NavLink>
              <ul className="nav nav-treeview">
              <li className="nav-header">Artworks</li>
              <li className="nav-item">
                <a href="/artworks" className="nav-link">
                  <BsCircle />
                  <p>Artworks</p>
                </a>
              </li>
              <li className="nav-header">House Management</li>
              <li className="nav-item">
                <NavLink to={"/artwork"} className="nav-link" activeClassName="active">
                  <BsCircle />
                  <p>Soon!</p>
                </NavLink>
              </li>
            </ul>
          </li>  
        </ul>
      </nav>
    </div>
        </aside>
        <div className="content-wrapper">
      <div className="content-header">
      <div className="container-fluid">
        <div className="row mb-2">
          <div className="col-sm-6">
            <h1 className="m-0">Dashboard</h1>
          </div>
        </div>
      </div>
    </div>
    <section className="content">
      <div className="container-fluid">
        <div className="row">
          <div className="col-lg-3 col-6">
            <div className="small-box bg-info">
              <div className="inner">
                <h3>150</h3>
                <p>New Orders</p>
              </div>
              <div className="icon">
                <i className="ion ion-bag"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">

            <div className="small-box bg-success">
              <div className="inner">
                <h3>53<sup style={{fontSize: '20px'}}>%</sup></h3>
                <p>Bounce Rate</p>
              </div>
              <div className="icon">
                <i className="ion ion-stats-bars"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          <div className="col-lg-3 col-6">
            
            <div className="small-box bg-warning">
              <div className="inner">
                <h3>44</h3>

                <p>User Registrations</p>
              </div>
              <div className="icon">
                <i className="ion ion-person-add"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
          
          <div className="col-lg-3 col-6">
            
            <div className="small-box bg-danger">
              <div className="inner">
                <h3>65</h3>

                <p>Unique Visitors</p>
              </div>
              <div className="icon">
                <i className="ion ion-pie-graph"></i>
              </div>
              <a href="#" className="small-box-footer">More info <i className="fas fa-arrow-circle-right"></i></a>
            </div>
          </div>
            </div>
          </div>
          </section>
          </div>
    </div>
    );
}

export default TopNav;