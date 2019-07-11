import React from 'react';
import { Link } from 'react-router-dom';

const WithdrawProgressPage = () => (
  <React.Fragment>
      <div className="withdraw-unit">
        <h1 className="big-text--bold">Your withdrawal has been submitted, and is currently processing.</h1>
      </div>
      <div className="dashboard-header-wrapper">
        <div className="left-text-align withdraw-confirmation-text">
          <h2 className="medium-text">Your withdrawal is en route to your original wallet! Don&apos;t worry - you don&apos;t have to do anything further. Your Dashboard should update with your new amount shortly.</h2>
          <h2 className="medium-text">You should see the amount in your wallet in a minute or two, depending on how congested the Ethereum blockchain is. If you don&apos;t, please let us know via the bottom right chat bubble, and we&apos;ll be happy to help.</h2>
          <h2 className="medium-text">Make sure to keep adding to your stockpile to grow your wealth. Nothing beats making money while you sleep.</h2>
        </div>
        <div className="withdraw-confirmation-button-wrapper">
          <Link to='/dashboard'>
            <button className="button">Check my new balance</button>
          </Link>
          <Link to='/supply'>
            <button className="button">Deposit more</button>
          </Link>
        </div>
    </div>
  </React.Fragment>
);

export default WithdrawProgressPage;
