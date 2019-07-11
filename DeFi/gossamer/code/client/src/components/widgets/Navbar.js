import React from 'react';
import { NavLink } from 'react-router-dom';
import NavbarLogo from './NavbarLogo';

export default class Navbar extends React.Component {
  state = {
  }

  setNavHoverStates = () => {
    // I know I shouldn't be using DOM methods here but I'll fix it later, there are complications with
    // using refs to get DOM elements here because you can't attach refs to functional components, and
    // <NavLink>s are functional components so will take some more time
    document.querySelectorAll('.hover-item').forEach((element) => {
      const element1 = element;
      const element2 = element;
      element1.onmouseenter = (event) => {
        const tolerance = 5;
        const left = 0;
        const right = element.clientWidth;
        let x = event.pageX - element.offsetLeft;
        if (x - tolerance < left) {
          x = left;
        }
        if (x + tolerance > right) {
          x = right;
          element.style.setProperty('--x', `${x}px`);
        }
      };
      element2.onmouseleave = (event) => {
        const tolerance = 5;
        const left = 0;
        const right = element.clientWidth;
        let x = event.pageX - element.offsetLeft;
        if (x - tolerance < left) {
          x = left;
        }
        if (x + tolerance > right) {
          x = right;
          element.style.setProperty('--x', `${x}px`);
        }
      };
    });
  }

  componentDidMount() {
    this.setNavHoverStates();
  }

  render() {
    return (
      <div className="nav-container">
        <NavLink to="/" className="nav-item">
          <NavbarLogo />
        </NavLink>
        <div className="nav-link-container">
          <NavLink to="/supply" activeClassName="is-active" className="nav-item hover-item">Deposit</NavLink>
          <NavLink to="/dashboard" activeClassName="is-active" className="nav-item hover-item">Dashboard</NavLink>
          <NavLink to="/faqs" activeClassName="is-active" className="nav-item hover-item">FAQs</NavLink>
          <NavLink to="/settings" activeClassName="is-active" className="nav-item hover-item">Settings</NavLink>
          <NavLink to="/" activeClassName="is-active" className="nav-item hover-item" onClick={this.props.logOut}>Log Out</NavLink>
        </div>
      </div>
    );
  }
}
