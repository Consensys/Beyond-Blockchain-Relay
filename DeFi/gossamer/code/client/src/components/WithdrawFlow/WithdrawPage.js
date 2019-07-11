import React from 'react';
import WithdrawForm from './WithdrawForm';
import WithdrawProgressPage from './WithdrawProgressPage';

export default class WithdrawPage extends React.Component {
  state = {
    transactionAmountToPrincipal: 0,
    transactionAmountToInterest: 0,
    modalVisible: false,
    withdrawalInProgress: false,
  }

  componentDidMount = async () => {
    await this.props.getUserData();
    this.props.getTokenToUSDConversionRate();
  }

  showModal = (event) => {
    event.preventDefault();
    this.setState({ modalVisible: true });
  }

  hideModal = (event) => {
    event.preventDefault();
    this.setState({ modalVisible: false });
  }

  handleFormikChange = ({ name, value }) => {
    const numberValue = Number(value);
    this.setState({ [name]: numberValue });
  }

  // handle error of admin accounts busy
  handleFormikSubmit = () => {
    this.props.callSmartContractFunction('withdraw', this.props.userData.primaryToken, this.state.transactionAmountToPrincipal, this.state.transactionAmountToInterest);
    this.setState({ withdrawalInProgress: true });
  }

  renderTokenIcon = () => {
    if (this.props.userData.primaryToken === 'DAI') {
      return <img src="https://settle.finance/blog/wp-content/uploads/2019/01/dai-logo.jpg" className="dai-icon" alt="Dai"
      height="25" width="25" />;
    } if (this.props.userData.primaryToken === 'USDC') {
      return <img src="https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png" alt="USDC" height="25" width="25" />;
    } return null;
  }

  renderWithrawalFormOrInProgressMessage = () => {
    if (!this.state.withdrawalInProgress) {
      return (
        <React.Fragment>
          <div className="withdraw-unit">
            <h2 className="medium-text">
            You can withdraw from your total balance here. Withdrawals are instant, and the minimum withdrawal is 1 {this.props.userData.primaryToken}.
            </h2>
            <h2 className="medium-text">
            Withdrawals themselves are free, but our small fee of 9.5% of earned interest is calculated when you withdraw. That fee helps us pay for some of the costs of gas and deployment.
            </h2>
            <h2 className="medium-text">
              But don’t empty your balance too soon! Let your money grow and compound over the medium term - right now you&apos;re beating historical stock market returns, while being on the cutting edge of finance.<br />
            </h2>
          </div>
          <div className="withdraw-unit">
            <WithdrawForm
              userData={this.props.userData}
              changeUserStatus={this.props.changeUserStatus}
              transactionAmountToPrincipal={this.state.transactionAmountToPrincipal}
              transactionAmountToInterest={this.state.transactionAmountToInterest}
              handleFormikChange={this.handleFormikChange}
              handleFormikSubmit={this.handleFormikSubmit}
              modalVisible={this.state.modalVisible}
              showModal={this.showModal}
              hideModal={this.hideModal}
              renderTokenIcon={this.renderTokenIcon}
            />
          </div>
        </React.Fragment>
      );
    }

    return (<WithdrawProgressPage />);
  }

  render() {
    return (
      <div className="withdraw-page-wrapper">
        {this.props.renderNavbar('withdraw')}
        <div className="page-wrapper">
            <h1 className="title-text--bold">Withdraw your money</h1>
            {this.renderWithrawalFormOrInProgressMessage()}
        </div>
      </div>
    );
  }
}
