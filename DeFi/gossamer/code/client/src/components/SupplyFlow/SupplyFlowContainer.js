import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import Step0Primer from './Step0Primer';
import Step1Intro from './Step1Intro';
import Step2Risks from './Step2Risks';
import Step3Stablecoins from './Step3Stablecoins';
import Step4CoinPicker from './Step4CoinPicker';
import Step5SetAddress from './Step5SetAddress';
import Step6SupplyConfirmation from './Step6SupplyConfirmation';
import ProgressBar from './ProgressBar';

export default class SupplyFlowContainer extends React.Component {
  state = {
    currentStep: 1,
    percentComplete: 2,
    token: '',
    amount: 0,
    userAssetBalances: {},
    contractCreated: false,
    contractCopyButtonClicked: false,
  }

  componentDidMount = async () => {
    await this.props.getUserData();
    this.props.getTokenToUSDConversionRate();
    this.setDefaultToken();
  }

  setDefaultToken = async () => {
    const { primaryToken } = this.props.userData;
    this.setState({ token: primaryToken });
  }

  handleInputChange = ({ target: { name, value } }) => {
    this.setState({ [name]: value });
  }

  handleTokenSelection = (token) => {
    const { userHasSuppliedBefore } = this.props.userData;
    if (!userHasSuppliedBefore) {
      this.setState({ token });
    }
  }

  createSmartContract = async (userAddress) => {
    const { accessToken } = this.props.userData;
    const postData = { accessToken, userAddress };
    const postObj = {
      method: 'POST',
      body: JSON.stringify(postData),
      headers: {
        'Content-Type': 'application/json',
      },
    };
    const rawContractAddress = await fetch('/createSmartContract', postObj);
    const contractAddress = await rawContractAddress.json();
    // handle admin accounts busy or tx confirmation timeout
    console.log(contractAddress);
    if (!contractAddress.error) {
      this.setState({ contractCreated: true, approved: true });
    }
  }

  getUserAssetBalances = async (userAddress) => {
    if (userAddress.length === 42) {
      const postData = { userAddress };
      const postObj = {
        method: 'POST',
        body: JSON.stringify(postData),
        headers: {
          'Content-Type': 'application/json',
        },
      };
      const rawUserAssetBalances = await fetch('/getUserAssetBalances', postObj);
      const userAssetBalances = await rawUserAssetBalances.json();
      this.setState({ userAssetBalances });
    }
  }

  changeStep = (direction) => {
    // direction can be '+' or '-'.
    let { currentStep, percentComplete } = this.state;
    const stepModifier = (direction === '+') ? 1 : -1;
    const percentModifier = (direction === '+') ? 16 : -16;

    currentStep += stepModifier;
    percentComplete += percentModifier;
    this.setState({ currentStep });
    this.setState({ percentComplete });
  }

  setDepositAmount = (amount, setValueFunction) => {
    if (setValueFunction) {
      setValueFunction('supplyAmount', amount);
    }
    this.setState({ amount });
  }

  copyToClipboard = () => {
    const dummy = document.createElement('textarea');
    document.body.appendChild(dummy);
    dummy.value = this.props.userData.contractAddress;
    dummy.select();
    document.execCommand('copy');
    document.body.removeChild(dummy);

    this.setState({ contractCopyButtonClicked: true });
  }

  renderProgressWheel = () => {
    const animations = {
      0: 'fadeIn',
      1: 'heartBeat',
      2: 'rubberBand',
      3: 'jello',
      4: 'tada',
      5: '',
      6: '',
      7: '',
    };

    return (
      <ScrollAnimation animateIn={animations[this.state.currentStep - 1]} animateOnce={true} >
        <ProgressBar
          percent={this.state.percentComplete}
          status={this.state.currentStep}
        />
      </ScrollAnimation>
    );
  }

  renderBackButton = () => {
  // Dynamically render Back button based on if previous step has its own route or is a step within a route
    if (this.state.currentStep === 1) {
      return (
          <Link to="/dashboard">
            <button className="button button--back">Back</button>
          </Link>
      );
    }

    if (this.state.currentStep > 1) {
      return (
        <button className="button button--back" onClick={() => this.changeStep('current', '-')}>Back</button>
      );
    }

    return null;
  }

  renderCurrentStep = () => {
    if (this.state.currentStep === 11) {
      return (
        <div>
          <Step0Primer
            userData={this.props.userData}
            financialData={this.props.financialData}
            changeStep={this.changeStep}
          />
        </div>
      );
    }
    if (this.state.currentStep === 1) {
      return (
        <div>
          <Step1Intro
            userData={this.props.userData}
            financialData={this.props.financialData}
            changeStep={this.changeStep}
          />
        </div>
      );
    }
    if (this.state.currentStep === 2) {
      return (
        <div>
          <Step2Risks
            userData={this.props.userData}
            financialData={this.props.financialData}
            changeStep={this.changeStep}
          />
        </div>
      );
    }
    if (this.state.currentStep === 3) {
      return (
        <Step3Stablecoins
          token={this.state.token}
          userData={this.props.userData}
          handleTokenSelection={this.handleTokenSelection}
          changeStep={this.changeStep}
          financialData={this.props.financialData}
        />
      );
    }
    if (this.state.currentStep === 4) {
      return (
        <Step4CoinPicker
          token={this.state.token}
          userData={this.props.userData}
          handleTokenSelection={this.handleTokenSelection}
          changeStep={this.changeStep}
          financialData={this.props.financialData}
        />
      );
    }
    if (this.state.currentStep === 5) {
      return (
        <Step5SetAddress
          userData={this.props.userData}
          token={this.state.token}
          getUserAssetBalances={this.getUserAssetBalances}
          userAssetBalances={this.state.userAssetBalances}
          createSmartContract={this.createSmartContract}
          contractCreated={this.state.contractCreated}
          changeStep={this.changeStep}
        />
      );
    }
    if (this.state.currentStep === 6) {
      return (
        <Step6SupplyConfirmation
          amount={this.state.amount}
          userData={this.props.userData}
          financialData={this.props.financialData}
          token={this.state.token}
          amountSupplied={this.props.amountSupplied}
          copyToClipboard={this.copyToClipboard}
          contractCopyButtonClicked={this.state.contractCopyButtonClicked}
          getUserData={this.props.getUserData}
          pollForUserDepositThenSupply={this.props.pollForUserDepositThenSupply}
          changeUserStatus={this.props.changeUserStatus}
          changeStep={this.changeStep}
        />
      );
    }
    return null;
  }

  render = () => (
    <div>
      {this.props.renderNavbar('supply')}
      <div className="page-wrapper">
      <div className="supply-flow-header-row">
        <div className="left-dummy-item">
          {this.renderBackButton()}
        </div>
          {this.renderProgressWheel()}
        <div className="right-dummy-item"></div>
      </div>
        <div className="supply-flow-action-wrapper">
          {this.renderCurrentStep()}
        </div>
      </div>
    </div>
  )
}
