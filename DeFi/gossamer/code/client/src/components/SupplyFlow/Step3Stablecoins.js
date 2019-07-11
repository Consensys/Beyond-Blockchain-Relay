import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const Step3Stablecoins = props => (
  <div>
    <h2 className="big-text--bold">To get you the highest rate of return, we use <strong>stablecoins.</strong></h2>
    <ScrollAnimation animateIn='bounceInUp' animateOnce={true} delay={500} >
      <p className="medium-text left-text-align">
        {props.userData.name}, lending out Bitcoin or Ethereum will get you interest rates at 1% or lower, and would expose you to a lot of risk with large price movements.
      </p>
      <p className="medium-text left-text-align">
        We accept deposits in <strong>stablecoins</strong>, cryptocurrencies that are built to stay at a stable price. This way, you make the <strong>most</strong> money, and your balance won&apos;t be affected when crypto prices go down.
      </p>
    </ScrollAnimation>
    <ScrollAnimation animateIn='bounceInUp' animateOnce={true} delay={1500} >
      <div className="supply-flow-stablecoins-explainer-wrapper">
        <h1 className="title-text stablecoin-explainer-icon-grid-item">
          <img src="https://settle.finance/blog/wp-content/uploads/2019/01/dai-logo.jpg" className="dai-icon" alt="Dai"
            height="25" width="25" />
          <img src="https://www.centre.io/images/usdc/usdc-icon-86074d9d49.png" alt="USDC" height="25" width="25" />
        </h1>
        <div className="stablecoin-explainer-text-grid-item">
          <p className="medium-text">
            You&apos;ll deposit to us with your choice of <strong>Dai</strong> or <strong>USDC</strong>.
            They&apos;re popular stablecoins that are built to stay at the $1.00 US dollar price and fluctuate within
            1-2 cents of that value.
          </p>
        </div>
        <h1 className="title-text stablecoin-explainer-icon-grid-item">💱</h1>
        <div className="stablecoin-explainer-text-grid-item">
          <p className="medium-text">
            To deposit, you can get these stablecoins on Coinbase (USDC) and Coinbase Pro (Dai), or if you know how to use
            MetaMask, you can use decentralized exchanges like Kyber, IDEX or <a href="/swap" target="_blank" rel="noopener noreferrer">ours right here</a><ExternalLinkIcon width={12} height={12} />.
          </p>
        </div>
        <h1 className="title-text stablecoin-explainer-icon-grid-item">📈</h1>
        <div className="stablecoin-explainer-text-grid-item">
          <p className="medium-text">
            After depositing, your stablecoins shield you from volatile crypto prices, and your earnings are paid out in the stablecoin you deposited with. Even if Bitcoin prices keep going down, <strong>your money will just keep going up</strong>.
          </p>
        </div>
      </div>
      <button className="button next-step-button" onClick={() => props.changeStep('+')}>Got it ✅</button>
    </ScrollAnimation>
  </div>
);

export default Step3Stablecoins;
