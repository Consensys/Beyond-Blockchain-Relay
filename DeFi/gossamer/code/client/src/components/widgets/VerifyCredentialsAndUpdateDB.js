import React from 'react';
import { withRouter } from 'react-router-dom';

function VerifyCredentialsAndUpdateDB(props) {
  props.auth.handleAuthentication()
    .then(() => {
      const postData = { accessToken: props.auth.accessToken };
      const postObj = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      return fetch('/login', postObj);
    })
    .then(response => response.json())
    .then((hasSupplied) => {
      if (!hasSupplied) {
        props.history.push('/supply');
      } else {
        props.history.push('/dashboard');
      }
    });

  return (
    <div className="loading-animation-wrapper">
      <div className="loading-animation-container">
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-bar"></div>
        <div className="loading-ball"></div>
      </div>
      <h1 className="medium-text loading-text">Loading, please wait
        <span className="loading-ellipsis"><span>.</span><span>.</span><span>.</span></span>
      </h1>
    </div>
  );
}

export default withRouter(VerifyCredentialsAndUpdateDB);
