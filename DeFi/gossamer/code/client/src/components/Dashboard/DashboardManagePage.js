import React from 'react';
import { Link } from 'react-router-dom';
import CountUp from 'react-countup';
import Tooltip from '../widgets/Tooltip';

const DashboardManagePage = props => (
  <div>
    <h1 className="title-text--bold dashboard-title-text">{props.userData.name}, manage your money here.</h1>
    <div className="dashboard-manage-grid">

      <div className="dashboard-hero-wrapper manage-grid-top-row">
        <div className="dashboard-data-unit-caption">
          <h2 className="caption-text">Your Balance</h2>
          <Tooltip
            height={10}
            width={10}
            message='This is the total amount you&apos;ve deposited, plus the total amount of interest you&apos;ve earned.' />
        </div>
        <h1 className="big-text--bold">
          <CountUp start={0} end={props.userData.balanceToken} duration={1} decimals={6} delay={0}
              suffix={` ${props.userData.primaryToken}`}/>
          &nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
          <CountUp start={0} end={props.userData.balanceToken * props.userData.tokenToUSDConversionRate} duration={1} decimals={2} delay={0}
          prefix="$" suffix=" USD" />
        </h1>
      </div>

      <div className="dashboard-data-unit manage-grid-deposit">
        <h2 className="caption-text">Deposit</h2>
        <p className="medium-text">You&apos;ve put in {props.userData.balanceToken} {props.userData.primaryToken} thus far.
        You&apos;re doing great - but just like any investment, it takes money to make money. What&apos;s that money
        in your savings account earning - a measley 2%? 😉 Just because this is crypto, doesn&apos;t mean it&apos;s risky. </p>
        <Link to="/supply">
            <button className="button">Deposit more</button>
        </Link>
      </div>

      <div className="dashboard-data-unit manage-grid-withdraw">
        <h2 className="caption-text">Withdraw</h2>
        <p className="medium-text">If you need to withdraw your funds back to your original wallet, you can do so below.</p>
          <Link to="/withdraw">
            <button className="button--alternate">Withdraw</button>
          </Link>

      </div>

    </div>
  </div>
);

export default DashboardManagePage;
