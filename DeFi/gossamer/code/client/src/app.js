import React from 'react';
import { Route, Switch, withRouter } from 'react-router-dom';
import LandingPage from './components/Landing/LandingPage';
import Navbar from './components/widgets/Navbar';
import NavbarLite from './components/widgets/NavbarLite';
import Footer from './components/widgets/Footer';
import SignupPage from './components/SignupPage/SignupPage';
import LoginPage from './components/Login/LoginPage';
import SupplyFlowContainer from './components/SupplyFlow/SupplyFlowContainer';
import DashboardContainer from './components/Dashboard/DashboardContainer';
import SettingsPage from './components/SettingsPage/SettingsPage';
import WithdrawPage from './components/WithdrawFlow/WithdrawPage';
import DaiExplainerPage from './components/Explainers/DaiExplainerPage';
import UsdcExplainerPage from './components/Explainers/UsdcExplainerPage';
import HowGetDaiPage from './components/Explainers/HowGetDaiPage';
import HowGetUsdcPage from './components/Explainers/HowGetUsdcPage';
import NotFound from './components/NotFoundPage/NotFoundPage';
import FAQsPage from './components/FAQs/FAQsPage';
import SwapPage from './components/SwapPage/SwapPage';
import auth0Client from './components/widgets/Auth';
import VerifyCredentialsAndUpdateDB from './components/widgets/VerifyCredentialsAndUpdateDB';
import PrivateRoute from './PrivateRoute';

class App extends React.Component {
  state = {
    checkingSession: true,
    avgDAIInterestRate: 8.92,
    avgUSDCInterestRate: 5.42,
    primaryToken: '',
    userHasSuppliedBefore: false,
    userName: '',
    userAddress: null,
    contractAddress: null,
    tokenToUSDConversionRate: 0,
    cTokenExchangeRate: 0,
    principal: 0,
    balanceCToken: 0,
    balanceToken: 0,
    interestWithdrawn: 0,
    interestAccumulated: 0,
    interestLifetime: 0,
    amountSupplied: 0,
    userStatus: 'banner closing',
    transactionHistory: [],
    dateOfFirstSupply: '',
  }

  componentDidMount = async () => {
    if (this.props.location.pathname !== '/verifycredentials') {
      try {
        this.getAverageInterestRates();
        await auth0Client.silentAuth();
        this.forceUpdate();
      } catch (error) {
        if (error.error !== 'login_required') {
          console.log(error.error);
        }
      }
    }
    this.userDataUpdateTimer = setInterval(() => {
      if (this.state.userStatus === 'supply completed' || this.state.userStatus === 'withdraw completed') {
        this.getUserData();
      } else if (this.state.balanceToken !== 0) {
        this.getCTokenExchangeRateAndCalculateMoreUserData();
      }
    }, 15000);
    this.setState({ checkingSession: false });
  }

  componentWillUnmount() {
    clearInterval(this.userDataUpdateTimer);
    this.userDataUpdateTimer = null;
  }

  renderNavbar = (page) => {
    // howto, supply, dashboard, withdraw, 404
    if (page === 'supply') {
      return <NavbarLite logOut={auth0Client.logout} />;
    }
    return <Navbar logOut={auth0Client.logout} />;
  }

  getTokenToUSDConversionRate = async () => {
    const postData = { token: this.state.primaryToken };

    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const rawUSDConversationRate = await fetch('/getTokenToUSDConversionRate', postObj);
    const tokenToUSDConversionRate = Number(await rawUSDConversationRate.json());
    this.setState({ tokenToUSDConversionRate });
  }

  getAverageInterestRates = async () => {
    const daiPostData = { token: 'DAI', timePeriodInDays: 7 };
    const usdcPostData = { token: 'USDC', timePeriodInDays: 7 };

    const daiPostObj = {
      method: 'POST',
      body: JSON.stringify(daiPostData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const usdcPostObj = {
      method: 'POST',
      body: JSON.stringify(usdcPostData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const daiInterestRate = fetch('/getAverageInterestRate', daiPostObj);
    const usdcInterestRate = fetch('/getAverageInterestRate', usdcPostObj);

    const rawInterestRates = await Promise.all([daiInterestRate, usdcInterestRate]).then(data => data);
    let [avgDAIInterestRate, avgUSDCInterestRate] = await Promise.all([rawInterestRates[0].json(), rawInterestRates[1].json()]).then(data => data);
    avgDAIInterestRate = Number(avgDAIInterestRate) * 100;
    avgUSDCInterestRate = Number(avgUSDCInterestRate) * 100;

    if (avgDAIInterestRate) {
      this.setState({ avgDAIInterestRate: (avgDAIInterestRate).toFixed(2) });
    }

    if (avgUSDCInterestRate) {
      this.setState({ avgUSDCInterestRate: (avgUSDCInterestRate).toFixed(2) });
    }
  }

  getUserData = async () => {
    const { accessToken } = auth0Client;

    const postData = { accessToken };
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const rawDataObj = await fetch('/getUserData', postObj);
    const dataObj = await rawDataObj.json();
    const {
      balance,
      principal,
      interestWithdrawn,
      contractAddress,
      name,
      userAddress,
      userHasSuppliedBefore,
      primaryToken,
      transactionHistory,
      dateOfFirstSupply,
    } = dataObj;

    this.setState({
      balanceCToken: Number(balance),
      principal: Number(principal),
      interestWithdrawn: Number(interestWithdrawn),
      userName: name,
      contractAddress,
      userAddress,
      userHasSuppliedBefore,
      primaryToken,
      transactionHistory,
      dateOfFirstSupply,
    }, this.getCTokenExchangeRateAndCalculateMoreUserData);
  }

  getCTokenExchangeRateAndCalculateMoreUserData = async () => {
    const postData = { token: this.state.primaryToken };
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    const rawExchangeRate = await fetch('/getCTokenConversionRate', postObj);
    const cTokenExchangeRate = Number(await rawExchangeRate.json());
    const balanceToken = cTokenExchangeRate * this.state.balanceCToken;
    const interestAccumulated = balanceToken - this.state.principal;
    const interestLifetime = interestAccumulated + this.state.interestWithdrawn;

    this.setState({
      cTokenExchangeRate,
      balanceToken: Math.floor(balanceToken * 10000000) / 10000000,
      interestAccumulated: Math.floor(interestAccumulated * 10000000) / 10000000,
      interestLifetime: Math.floor(interestLifetime * 10000000) / 10000000,
    });
  }

  // waiting for deposit
  // deposit received
  // withdraw initiated
  // supply/withdraw completed
  changeUserStatus = (status) => {
    if (status === 'supply completed' || status === 'withdraw completed') {
      this.setState({ userStatus: status }, () => {
        setTimeout(() => this.setState({ userStatus: 'banner closing' }), 20000);
      });
    }
    this.setState({ userStatus: status });
  }

  pollForUserDepositThenSupply = async (token) => {
    const { accessToken } = auth0Client;
    const postData = { accessToken, token };
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const rawAmountSupplied = await fetch('/pollForDeposit', postObj);
    const amountSupplied = await rawAmountSupplied.json();
    this.setState({ userStatus: 'deposit received', amountSupplied }, () => this.callSmartContractFunction('supply', token, amountSupplied));
  }

  // handle admin accounts busy
  callSmartContractFunction = async (transactionType, tokenRequested, transactionAmountToPrincipal, transactionAmountToInterest = 0) => {
    console.log(`Initiating ${transactionType}...\nPrincipal: ${transactionAmountToPrincipal}  Interest: ${transactionAmountToInterest}`);
    const { accessToken } = auth0Client;

    let token;
    if (this.state.userHasSuppliedBefore) {
      token = this.state.primaryToken;
    } else {
      token = tokenRequested;
    }

    const postData = {
      accessToken,
      token,
      transactionType,
      transactionAmountToPrincipal,
      transactionAmountToInterest,
      cTokenExchangeRate: this.state.cTokenExchangeRate,
    };
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const rawTxHash = await fetch('/callSmartContractFunction', postObj);
    const txHash = await rawTxHash.json();
    console.log(`${transactionType} successful: ${txHash}`);
    this.changeUserStatus(`${transactionType} completed`);
  }

  render = () => {
    const userData = {
      accessToken: auth0Client.accessToken,
      name: this.state.userName,
      primaryToken: this.state.primaryToken,
      userHasSuppliedBefore: this.state.userHasSuppliedBefore,
      userAddress: this.state.userAddress,
      contractAddress: this.state.contractAddress,
      tokenToUSDConversionRate: this.state.tokenToUSDConversionRate,
      cTokenExchangeRate: this.state.cTokenExchangeRate,
      balanceToken: this.state.balanceToken,
      principal: this.state.principal,
      interestAccumulated: this.state.interestAccumulated,
      interestLifetime: this.state.interestLifetime,
      transactionHistory: this.state.transactionHistory,
      dateOfFirstSupply: this.state.dateOfFirstSupply,
    };

    const financialData = {
      interestRate: {
        DAI: this.state.avgDAIInterestRate,
        USDC: this.state.avgUSDCInterestRate,
      },
      // move other non user specific financial data here
    };

    return (
      <div>
        <Switch>
          <Route exact path='/verifycredentials' render={() => (
            <VerifyCredentialsAndUpdateDB auth={auth0Client}/>
          )}/>
          <Route path="/" exact={true}
            render={props => (
              <LandingPage {...props} auth={auth0Client} renderNavbar={this.renderNavbar} />
            )}
          />
          <Route path="/login" component={LoginPage} exact={true} />
          <Route path="/signup" component={SignupPage} exact={true} />
          <Route path="/faqs" render={() => <FAQsPage renderNavbar={this.renderNavbar} />} exact={true} />
          <PrivateRoute
            path="/supply"
            component={SupplyFlowContainer}
            auth={auth0Client}
            checkingSession={this.state.checkingSession}
            exact={true}
            userData={userData}
            getTokenToUSDConversionRate={this.getTokenToUSDConversionRate}
            financialData={financialData}
            getUserData={this.getUserData}
            pollForUserDepositThenSupply={this.pollForUserDepositThenSupply}
            amountSupplied={this.state.amountSupplied}
            changeUserStatus={this.changeUserStatus}
            renderNavbar={this.renderNavbar}
          />
          <PrivateRoute
            path="/dashboard"
            component={DashboardContainer}
            auth={auth0Client}
            checkingSession={this.state.checkingSession}
            exact={true}
            userData={userData}
            getTokenToUSDConversionRate={this.getTokenToUSDConversionRate}
            getUserData={this.getUserData}
            financialData={this.financialData}
            amountSupplied={this.state.amountSupplied}
            userStatus={this.state.userStatus}
            changeUserStatus={this.changeUserStatus}
            renderNavbar={this.renderNavbar}
          />
          <PrivateRoute
            path="/withdraw"
            component={WithdrawPage}
            auth={auth0Client}
            checkingSession={this.state.checkingSession}
            exact={true}
            userData={userData}
            getTokenToUSDConversionRate={this.getTokenToUSDConversionRate}
            getUserData={this.getUserData}
            callSmartContractFunction={this.callSmartContractFunction}
            changeUserStatus={this.changeUserStatus}
            renderNavbar={this.renderNavbar}
          />
          <Route path="/dai" render={() => <DaiExplainerPage renderNavbar={this.renderNavbar} />} exact={true} />
          <Route path="/getdai" render={() => <HowGetDaiPage renderNavbar={this.renderNavbar} />} exact={true} />
          <Route path="/usdc" render={() => <UsdcExplainerPage renderNavbar={this.renderNavbar} />} exact={true} />
          <Route path="/getusdc" render={() => <HowGetUsdcPage renderNavbar={this.renderNavbar} />} exact={true} />
          <Route path="/swap" render={() => <SwapPage renderNavbar={this.renderNavbar} />} exact={true} />
          <Route path="/settings" render={() => <SettingsPage renderNavbar={this.renderNavbar} />} exact={true} />
          <Route render={() => <NotFound renderNavbar={this.renderNavbar} />} />
        </Switch>
        <Footer />
      </div>
    );
  }
}

export default withRouter(App);
