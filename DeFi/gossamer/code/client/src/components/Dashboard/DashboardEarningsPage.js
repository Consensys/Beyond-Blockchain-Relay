import React from 'react';
import CountUp from 'react-countup';
import Tooltip from '../widgets/Tooltip';
import InterestRateGraph from './InterestRateGraph';
import InterestEarningsGraph from './InterestEarningsGraph';

export default class DashboardEarningsPage extends React.Component {
  state = {
    interestGraphNumDaysToFilter: 7,
    interestUnitToggle: 'current',
    earningsIsUpdating: false,
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  componentDidUpdate(prevProps) {
    if (this.props.userData.balanceToken !== prevProps.userData.balanceToken) {
      this.setState({ earningsIsUpdating: true }, () => {
        setTimeout(() => {
          this.setState({ earningsIsUpdating: false });
        }, 2000);
      });
    }
  }

  changeInterestGraphNumDaysToFilter = interestGraphNumDaysToFilter => (this.setState({ interestGraphNumDaysToFilter }))

  filterInterestData = () => {
    const { interestGraphNumDaysToFilter } = this.state;
    const { interestRateData } = this.props;
    const upperBound = interestRateData.length;
    const lowerBound = upperBound - interestGraphNumDaysToFilter > 0 ? upperBound - interestGraphNumDaysToFilter : 0;
    let filteredGraphData = interestRateData.slice(lowerBound, upperBound);

    if (!filteredGraphData.length) {
      const dummyData = [{ date: '', interestRate: 0 }];
      filteredGraphData = dummyData;
    }
    return filteredGraphData;
  }

  calculateAverageInterestRate = (filteredGraphData) => {
    let sumOfInterestRates = 0;

    filteredGraphData.forEach((elem) => {
      sumOfInterestRates += elem.interestRate;
    });

    const averageInterestRate = sumOfInterestRates / filteredGraphData.length;
    return averageInterestRate;
  }

  renderInterestEarnings = () => {
    if (this.state.interestUnitToggle === 'current') {
      return (
        <div>
          <h2 className="title-text--bold earnings-text">
            <CountUp start={0} end={this.props.userData.interestAccumulated} duration={1} decimals={7} delay={0} />
            &nbsp;{this.props.userData.primaryToken}
          </h2>
          <p className="medium-text fiat-conversion-text">
            <CountUp start={0} end={this.props.userData.interestAccumulated * this.props.userData.tokenToUSDConversionRate}
            duration={1} decimals={2} delay={0} prefix="$" suffix=" USD" />
          </p>
        </div>
      );
    }

    return (
      <div>
        <h2 className="title-text--bold earnings-text">
          <CountUp start={0} end={this.props.userData.interestLifetime} duration={1} decimals={7} delay={0} />
          &nbsp;{this.props.userData.primaryToken}
        </h2>
        <p className="medium-text fiat-conversion-text">
          <CountUp start={0} end={this.props.userData.interestLifetime * this.props.userData.tokenToUSDConversionRate}
          duration={1} decimals={2} delay={0} prefix="$" suffix=" USD" />
        </p>
      </div>
    );
  }

  renderInterestData = () => {
    const filteredGraphData = this.filterInterestData();
    const averageInterestRate = this.calculateAverageInterestRate(filteredGraphData);

    return (
      <React.Fragment>
        <div className="dashboard-earnings-data-unit average-interest-rates-data-unit">
          <div className="dashboard-data-unit-caption">
            <h2 className="caption-text">Your Average Rate of Return</h2>
            <Tooltip
              height={10}
              width={10}
              message="This is the average annual interest rate (APR) you&apos;ve been earning on your money, since you made your first deposit with us. So in a year, this is how much you'd make on your deposit. Remember, your interest rate changes a little daily based on the amount of borrowing and lending activity on the Compound platform." />
          </div>
          <div className="dashboard-data-unit-content">
            <h2 className="title-text">
              <CountUp start={0} end={averageInterestRate} duration={1} decimals={2} delay={0}/>%
            </h2>
          </div>
        </div>
        <InterestRateGraph
          interestRateGraphData={filteredGraphData}
          changeInterestGraphNumDaysToFilter={this.changeInterestGraphNumDaysToFilter}
        />
      </React.Fragment>
    );
  }

  render = () => (
    <div>
      <h1 className="title-text--bold dashboard-title-text">Hi {this.props.userData.name}! Here&apos;s how much you&apos;ve made. </h1>
      <div className="dashboard-earnings-grid">
        <InterestEarningsGraph
          balanceData={this.props.balanceData}
          userData={this.props.userData}
        />
        <div className="dashboard-earnings-data-unit">
          <div className="dashboard-data-unit-caption">
            <h2 className="caption-text">Your Balance</h2>
            <Tooltip
              height={10}
              width={10}
              message='This is the total amount you&apos;ve deposited, plus the total amount of interest you&apos;ve earned.' />
          </div>
          <div className="dashboard-data-unit-content">
            <h1 className={`title-text--bold ${this.state.earningsIsUpdating ? 'dashboard-balance-text--green' : 'dashboard-balance-text--black'}`}>
              <CountUp start={0} end={this.props.userData.balanceToken} duration={1} decimals={7} delay={0} />&nbsp;{this.props.userData.primaryToken}
            </h1>
            <p className="medium-text fiat-conversion-text">
              <CountUp start={0} end={this.props.userData.balanceToken * this.props.userData.tokenToUSDConversionRate}
              duration={1} decimals={2} delay={0} prefix="$" suffix=" USD" />
            </p>
          </div>
        </div>

        <div className="dashboard-earnings-data-unit">
          <div className="dashboard-data-unit-caption">
            <h2 className="caption-text">Your Earnings</h2>
            <Tooltip
              height={10}
              width={10}
              message='This is the amount of new money you&apos;ve earned - pure profit 💸. Current refers to the
              accumulated interest you have now, lifetime is your total account earnings.' />
          </div>

          <div className="dashboard-data-unit-content top-margin">
            {this.renderInterestEarnings()}
            <div className="mini-toggle-switch-wrapper">
              <form>
                <input id="current" type="radio" name="interestUnitToggle" value="current"
                checked={this.state.interestUnitToggle === 'current'} onChange={this.handleInputChange} />
                <label htmlFor="current">Current</label>
                <input type="radio" id="lifetime" name="interestUnitToggle" value="lifetime"
                checked={this.state.interestUnitToggle === 'lifetime'} onChange={this.handleInputChange} />
                <label htmlFor="lifetime">Lifetime</label>
              </form>
            </div>
          </div>
        </div>
        {this.renderInterestData()}
      </div>
    </div>
  )
}
