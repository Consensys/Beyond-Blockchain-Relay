import React from 'react';
import DashboardMultiToggleSwitch from './DashboardMultiToggleSwitch';
import DashboardEarningsPage from './DashboardEarningsPage';
import DashboardHistoryPage from './DashboardHistoryPage';
import DashboardManagePage from './DashboardManagePage';
import balanceTestData from './dashboardBalanceDummyData';
import Banner from '../widgets/Banner';

export default class DashboardContainer extends React.Component {
  state = {
    currentPage: 'earnings',
    balanceData: balanceTestData,
    interestRateData: [],
    dailyTokenBalance: [],
  };

  componentDidMount = async () => {
    await this.props.getUserData();
    const getTokenToUSDConversionRatePromise = this.props.getTokenToUSDConversionRate();
    const getCTokenExchangeRateHistoryPromise = this.getCTokenExchangeRateHistory(this.props.userData.transactionHistory);
    const interestRateDataPromise = this.getHistoricalInterestRates();
    const { interestRateData, dailyTokenBalance } = await Promise.all(
      [interestRateDataPromise, getCTokenExchangeRateHistoryPromise, getTokenToUSDConversionRatePromise],
    ).then(data => ({ interestRateData: data[0], dailyTokenBalance: data[1] }));
    this.setState({ interestRateData, dailyTokenBalance });
    this.forceUpdate();
  }

  getCTokenExchangeRateHistory = async (userTransactionHistory) => {
    const postData = { token: this.props.userData.primaryToken, dateOfFirstSupply: this.props.userData.dateOfFirstSupply, userTransactionHistory };
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const dailyTokenBalanceRaw = await fetch('/getCTokenExchangeRateHistory', postObj);
    const dailyTokenBalance = await dailyTokenBalanceRaw.json();
    this.setState({ dailyTokenBalance });
  }

  getHistoricalInterestRates = async () => {
    const { dateOfFirstSupply, primaryToken } = this.props.userData;
    const postData = { dateOfFirstSupply, token: primaryToken };

    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const rawInterestRateData = await fetch('/getHistoricalInterestRates', postObj);
    const interestRateData = await rawInterestRateData.json();
    return interestRateData;
  }

  renderTransactionStatusBanner = () => {
    const statusData = [{
      status: 'banner closing',
      messageTitle: '',
      messageBody: '',
      boxClass: 'box--listening',
    },
    {
      status: 'waiting for deposit',
      messageTitle: 'Listening for your deposit...',
      messageBody: 'We are still waiting for your deposit. We will let you know once we receive it.',
      boxClass: 'box--listening',
    },
    { // same as modal - when we see the user's supply transaction to us
      status: 'deposit received',
      messageTitle: 'Almost there!',
      messageBody: `We have received your deposit of ${this.props.amountSupplied} tokens and are in the
      process of putting it to work in the lending ecosystem. Sit tight, your dashboard will update soon!`,
      boxClass: 'box--pending',
    },
    { // supply happened, user smart contract wallet now has cTokens
      status: 'supply completed',
      messageTitle: 'Your deposit is complete!',
      messageBody: 'Your money is being put to work, and you should start seeing your earnings rolling in within seconds.',
      boxClass: 'box--completed',
    },
    { // broadcast the withdrawal transaction but it has not completed yet
      status: 'withdraw initiated',
      messageTitle: 'Withdrawing now...',
      messageBody: 'We are processing your withdrawal. Hang tight, your dashboard will update to reflect your withdrawal soon!',
      boxClass: 'box--pending',
    },
    { // money is in user's wallet
      status: 'withdraw completed',
      messageTitle: 'Withdrawal complete!',
      messageBody: `We have withdrawn your money from the lending ecosystem. Your money should be back in your wallet ending in ${this.props.userData.userAddress ? this.props.userData.userAddress.substring(36, 42) : ''}. Your dashboard balance should update in seconds.`,
      boxClass: 'box--completed',
    },
    { // money is in user's wallet
      status: 'banner closing',
      messageTitle: 'Bye bye!',
      messageBody: 'Adios!',
      boxClass: 'box--completed',
    },
    ];

    const statusDataInstance = statusData.find(statusObject => statusObject.status === this.props.userStatus);

    return (
      <Banner
        userStatus={this.props.userStatus}
        messageTitle={statusDataInstance.messageTitle}
        messageBody={statusDataInstance.messageBody}
        boxClass={statusDataInstance.boxClass}
      />
    );
  }

  changePage = currentPage => this.setState({ currentPage })

  renderPage = () => {
    let page = null;
    if (this.state.currentPage === 'earnings') {
      page = (
        <DashboardEarningsPage
          userData={this.props.userData}
          interestRateData={this.state.interestRateData}
          balanceData={this.state.balanceData}
          userStatus={this.props.userStatus}
          amountSupplied={this.props.amountSupplied}
        />
      );
    } else if (this.state.currentPage === 'manage') {
      page = (<DashboardManagePage
                userData={this.props.userData}
              />);
    } else if (this.state.currentPage === 'history') {
      page = (<DashboardHistoryPage
                userData={this.props.userData}
              />);
    }
    return page;
  }

  render = () => (
    <div className="dashboard-wrapper">
      {this.props.renderNavbar('dashboard')}
      {this.renderTransactionStatusBanner()}
      <div className="page-wrapper">
        <DashboardMultiToggleSwitch
          currentPage={this.state.currentPage}
          changePage={this.changePage}
        />
        <div className="dashboard-body-wrapper">
          {this.renderPage()}
        </div>
      </div>
    </div>
  );
}
