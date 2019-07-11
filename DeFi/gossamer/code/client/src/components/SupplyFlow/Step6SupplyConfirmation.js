import React from 'react';
import { Link } from 'react-router-dom';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import ScrollAnimation from 'react-animate-on-scroll';
import Step6SupplyConfirmationTransactionAction from './Step6SupplyConfirmationTransactionAction';

export default class Step6SupplyConfirmation extends React.Component {
  state = { visible: true }

  hideModal = (event) => {
    event.preventDefault();
    this.setState({ visible: false });
  }

  renderModal = () => {
    if (this.props.amountSupplied) {
      return (
        <Rodal
          visible={this.state.visible}
          onClose={this.hideModal}
          closeOnEsc={true}
          showMask={true}
          enterAnimation="slideDown"
          leaveAnimation="slideDown"
          width={800}
          height={500}
        >
          <div className="supply-modal-wrapper">
            <h1 className="title-text--bold">{this.props.userData.name}, we see your transaction!</h1>
            <p className="medium-text">Breathe easy! We see your transaction of {this.props.amountSupplied} {this.props.token}, and we&apos;re currently processing it. Your money is on its way to growing, and will soon be in your very own secure smart contract.</p>
            <p className="medium-text">You&apos;ll start earning interest in seconds, once your transaction has finalized and we connect your money to the lending ecosystem.</p>
            <p className="medium-text">You can wait for your money to arrive by clicking on the button below to go to the dashboard. Because things on the Ethereum blockchain take a little time, your earnings <strong>won&apos;t appear instantly</strong>.</p>
            <Link to="/dashboard">
              <button className="button">Go to Dashboard</button>
            </Link>
            <p className="small-text">Don&apos;t worry, clicking this button will not affect the transaction.</p>
          </div>
        </Rodal>
      );
    }
    return null;
  }

  componentDidMount() {
    this.props.getUserData();
    this.props.pollForUserDepositThenSupply(this.props.token);
    this.props.changeUserStatus('waiting for deposit');
  }

  render() {
    return (
      <div>
        <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={500}>
          <h1 className="big-text--bold">You&apos;re ready to deposit, {this.props.userData.name} ✨</h1>
          <p className="medium-text">Send us the amount you want to start earning on, and watch your interest compound. Once you send your transaction, <strong>please wait on this page</strong> for our confirmation window to appear!</p>
          <p className="medium-text">
            Since we&apos;re paying for Ethereum gas and server fees, we&apos;re charging a 9.5% fee on the <strong>interest you will earn</strong>, calculated when you withdraw. If you make no money with us, you pay nothing in fees.
          </p>
            <Step6SupplyConfirmationTransactionAction
              amount={this.props.amount}
              userData={this.props.userData}
              financialData={this.props.financialData}
              token={this.props.token}
              copyToClipboard={this.props.copyToClipboard}
              contractCopyButtonClicked={this.props.contractCopyButtonClicked}
            />
        </ScrollAnimation>
        {this.renderModal()}
      </div>
    );
  }
}
