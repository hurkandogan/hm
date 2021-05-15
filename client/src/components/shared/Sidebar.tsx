import React from 'react';
import { NavLink } from 'react-router-dom';
import {
    FaSearch,
    FaTachometerAlt
} from 'react-icons/fa';
import {
    BsCircle,
    BsShield,
    BsWrench,
    BsHouseDoor
} from 'react-icons/bs';

const Sidebar = () => {
    return (
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

                <nav className="mt-2">
                    <ul className="nav nav-pills nav-sidebar flex-column" data-widget="treeview" role="menu" data-accordion="false">
                        <li className="nav-header">General</li>
                        <li className="nav-item menu-open">
                            <NavLink to={"/"} className="nav-link" activeClassName="active">
                                <FaTachometerAlt />
                                <p>Dashboard</p>
                            </NavLink>
                            <ul className="nav nav-treeview">
                                <li className="nav-header">Artworks</li>
                                <li className="nav-item">
                                    <NavLink to={"/artwork"} className="nav-link">
                                        <BsCircle />
                                        <p>Artworks</p>
                                    </NavLink>
                                </li>
                                <li className="nav-header">House Management</li>
                                <li className="nav-item">
                                    <NavLink to={"#"} className="nav-link" activeClassName="active">
                                        <BsShield />
                                        <p>Versicherungen</p>
                                    </NavLink>
                                    <NavLink to={"#"} className="nav-link" activeClassName="active">
                                        <BsWrench />
                                        <p>Renovierungskosten</p>
                                    </NavLink>
                                    <NavLink to={"#"} className="nav-link" activeClassName="active">
                                        <BsHouseDoor />
                                        <p>Berliner Str.</p>
                                    </NavLink>
                                </li>
                            </ul>
                        </li>
                    </ul>
                </nav>
            </div>
        </aside>
    );
};

export default Sidebar;