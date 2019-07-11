import React from 'react';
import Login from './Login';

const LandingPage = props => (
  <div>
    {props.renderNavbar('landing')}
    <div className="page-container">
      <div className="landing-page-wrapper">
        <div className="content-wrap">
          <h1 className="section-title-text--bold"></h1>
          <div className="hero-login-wrapper">
            <div className="hero-wrapper">
            </div>
            <Login
              auth={props.auth}
            />
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default LandingPage;
