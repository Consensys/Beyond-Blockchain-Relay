import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const Step2Risks = props => (
  <React.Fragment>
    <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={500}>
      <h2 className="big-text--bold">Earn money, whether the market is up or down</h2>
    </ScrollAnimation>
    <ScrollAnimation animateIn="bounceInUp" animateOnce={true} delay={1500}>
      <div className="supply-flow-text-wrapper">
        <p className="medium-text">
          Buying something like Bitcoin is a <strong>risky</strong> investment - if prices go down, you lose money. Depositing money to us gives you steady earnings <strong>no matter what happens to crypto prices</strong>.
        </p>
        <ul>
          <li className="medium-text">
            <strong>Your deposit isn&apos;t at risk of going down in value.</strong> Similar to a bank, you deposit money with us and earn interest as profit on your money.
          </li>
          <li className="medium-text">
            <strong>You&apos;re paid every 15 seconds once you deposit, no matter what 💰.</strong> Those earnings add up over a year to around <strong>6-10%</strong> annual return. The actual rate changes a little every day based on how much money <a href="https://www.compound.finance" target="_blank" rel="noopener noreferrer">is in the lending ecosystem</a><ExternalLinkIcon width={12} height={12} />, but it&apos;s stable over time.
          </li>
          <li className="medium-text">
            <strong>Your money is safe</strong> - the ecosystem we&apos;re plugging you into has been around for almost 2 years without a single lender losing a cent of their deposits. One built-in safeguard is that people receiving your money have to put up more than the amount they borrow (150%, to be exact) as <span className="italics">just-in-case-I-can&apos;t-pay-you-back collateral</span>, which helps protect against big market dips.
          </li>
        </ul>
      </div>
      <button className="button next-step-button" onClick={() => props.changeStep('+')}>Let&apos;s get started 👏</button>
    </ScrollAnimation>
  </React.Fragment>
);

export default Step2Risks;
