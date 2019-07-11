import React from 'react';
import { Link } from 'react-router-dom';
import FooterLogo from './FooterLogo';

const Footer = () => (
  <div className="footer-container">
    <div className="footer-logo-container">
      <FooterLogo />
    </div>
    <div className="footer-links-container">
      <div className="footer-links-leftcolumn-container">
        <h2 className="footer-item"><strong>About Us</strong></h2>
        <Link to="/dashboard" className="footer-item hover-item">Learn More</Link>
        <Link to="/dashboard" className="footer-item hover-item">Our Team</Link>
        <Link to="/dashboard" className="footer-item hover-item">Terms of Use</Link>
      </div>
      <div className="footer-links-rightcolumn-container">
        <h2 className="footer-item"><strong>Contact</strong></h2>
        <Link to="https://www.gmail.com" className="footer-item hover-item">Email</Link>
        <Link to="https://www.twitter.com" className="footer-item hover-item">Twitter</Link>
        <Link to="https://www.medium.com" className="footer-item hover-item">Medium</Link>
      </div>
    </div>
  </div>
);

export default Footer;
