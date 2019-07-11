import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';

const NavbarLite = props => <div className="nav-container">
        <NavLink to="/" className="nav-item">
          <NavbarLogo />
        </NavLink>
        <div className="nav-link-container">
          <NavLink to="/" activeClassName="is-active" className="nav-item hover-item" onClick={props.logOut}>Log Out</NavLink>
        </div>
      </div>;
export default NavbarLite;
