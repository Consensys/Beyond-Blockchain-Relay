import React from 'react';
import Rodal from 'rodal';
import 'rodal/lib/rodal.css';
import ScrollAnimation from 'react-animate-on-scroll';
import {
  Formik, Field, Form, ErrorMessage,
} from 'formik';
import schemas from '../../actions/validationSchemas';

export default class Step5SetAddress extends React.Component {
  state = {
    visible: false,
  }

  showModalAndTriggerContractCreation = async (userAddress) => {
    this.setState({ visible: true });
    await this.props.createSmartContract(userAddress);
  }

  hideModal = async () => {
    this.setState({
      visible: false,
    }, () => this.props.changeStep('+'));
  }

  renderButtonWhenContractCreated = () => {
    if (!this.props.contractCreated) {
      return (
        <button className="button" disabled>Please wait...</button>
      );
    }
    return (
      <React.Fragment>
        <p className="small-text"><br/>Success! 👏 We&apos;ve created and deployed your personal, super-secure smart contract
        onto the Ethereum blockchain!</p>
        <button className="button" onClick={this.hideModal}>Keep going 💪</button>
      </React.Fragment>
    );
  };

  renderSubmitButton = () => {
    const assets = Object.entries(this.props.userAssetBalances);
    if (assets.length > 0) {
      return <button className="button next-step-button" type="submit">Looks like my wallet 🙌</button>;
    }
    return <button className="button next-step-button" type="submit">Verify Ethereum address</button>;
  }

  renderUserAssetBalances = () => {
    const assets = Object.entries(this.props.userAssetBalances);
    if (assets.length > 0) {
      const assetsArr = [];
      for (let i = 0; i < assets.length; i += 1) {
        assetsArr.push(
          <div className="user-balance-item" key={i}>{Number(assets[i][1]).toFixed(6)} <strong>{assets[i][0]}</strong></div>,
        );
      }
      return (
        <div className="user-assets-balance">
          <h2 className="medium-text">🛑 Do these balances look right to you? (beta feature)</h2>
          <p className="small-text">
            <strong>Note:</strong> this feature only works on individual wallets, <span className="red">not</span> exchange wallets
            like Binance or Coinbase. <br/><br/>
          </p>
          <p className="small-text">
            We checked the Ethereum blockchain to verify that you entered the correct wallet. If this looks OK, click the button
            below to move on.
          </p>
          {assetsArr}
        </div>
      );
    }
    return null;
  };

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  render = () => {
    if (this.props.userData.contractAddress) {
      return (
        <div>
          <h2 className="big-text--bold">
            Hey {this.props.userData.name}, it looks you have previously reached this point while depositing.
          </h2>
          <p className="medium-text">
            That means we&apos;ve already created a smart contract for you, with the secure Ethereum wallet address for withdrawal
            that you provided. That wallet address you gave us was {this.props.userData.userAddress}, and as was previously
            mentioned, that can&apos;t be changed.
          </p>
          <p className="medium-text">
            We just wanted to remind you of that before moving forward. If that&apos;s not the address you want to keep
            withdrawing to, let us know before you deposit again and we can help you out.
          </p>
          <button className="button" onClick={this.hideModal}>Keep going 💪</button>
        </div>
      );
    }

    return (
      <div>
        <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={500}>
          <h2 className="big-text--bold">You can send us your deposit from any Ethereum address, but we need a specific address for
          you to receive your future withdrawals of {this.props.token}.</h2>
        </ScrollAnimation>
        <ScrollAnimation animateIn='bounceInUp' animateOnce={true} delay={1500}>
          <div className="supply-flow-set-address-text-wrapper">
            <p className="medium-text">
              We&apos;ve done our research, and the most secure way to protect your money is to set in advance <strong>one address
                that you can ever withdraw to</strong>. If your account is compromised, all a bad actor could do is return
                your funds back to your account.
            </p>
            <p className="medium-text">
              We recommend that you enter in the address of a standalone Ethereum-based wallet that supports {this.props.token}&nbsp;
              <span className="italics">(ex. MetaMask, Coinbase Wallet, MyEtherWallet, MyCrypto, TREZOR, Ledger)</span> as opposed to an exchange address, given exchanges are changing their technology all the time.
            </p>
          </div>
          <Formik
            validationSchema={schemas.ethereumAddress}
            validateOnChange={true}
            validateOnBlur={true}
            initialValues={{
              userAddress: '',
            }}
            onSubmit={(values) => {
              const { userAddress } = values;
              this.showModalAndTriggerContractCreation(userAddress);
            }}
          >
            { () => (
            <Form>
              <div className="supply-details-form-row">
                <p className="caption-text">Ethereum address</p>
                <div className="col-3 input-effect ethereum-address-input-modifier">
                  <Field name="userAddress" render={({ field }) => (
                    <input {...field}
                      onBlur={() => this.props.getUserAssetBalances(field.value)}
                      onKeyUp={() => this.props.getUserAssetBalances(field.value)}
                      type="text"
                      className="effect-20"
                      placeholder="Starts with 0x..."
                    />
                  )} />
                  <label>Ethereum address</label>
                  <span className="focus-border">
                    <i></i>
                  </span>
                </div>
              </div>
                <ErrorMessage name="userAddress" >
                  {errorMessage => <div className="error-text">{errorMessage}</div>}
                </ErrorMessage>
                {this.renderUserAssetBalances()}
                {this.renderSubmitButton()}
            </Form>
            )}
          </Formik>
        </ScrollAnimation>

        <Rodal
            visible={this.state.visible}
            onClose={this.hideModal}
            closeOnEsc={true}
            showMask={true}
            enterAnimation="slideDown"
            leaveAnimation="slideDown"
            width={900}
            height={700}
          >
            <div className="supply-modal-wrapper">
              <h1 className="title-text--bold">Hang tight for a few minutes, {this.props.userData.name}!</h1>
              <p className="medium-text">
                We&apos;re deploying a smart contract just for you on the Ethereum blockchain. This personal smart contract will
                receive your deposit, and take care of depositing and withdrawing from the lending ecosystem. Because of how
                Ethereum works, this could take up to a few minutes.
              </p>
              <div className="center-image-wrapper">
                <img className="supply-flow-transaction-infographic" height="350" width="700" src="https://dapp-lending.s3-us-west-1.amazonaws.com/SupplyFlowTransactionInfographic.png" />
              </div>
              <p className="medium-text">
               When the button changes colors to green, you can move on. If this window closes while still processing,
               just come back to this step in the Deposit process.
              </p>
              {this.renderButtonWhenContractCreated()}
            </div>
          </Rodal>
      </div>
    );
  }
}
