import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const Step0Primer = props => (
  <React.Fragment>
    <ScrollAnimation animateIn='wobble' animateOnce={true} delay={500}>
      <h2 className="big-text--bold">Hey {props.userData.name}! 👋</h2>
    </ScrollAnimation>
    <ScrollAnimation animateIn="bounceInUp" animateOnce={true} delay={1500}>
      <div className="supply-flow-text-wrapper">
        <p className="medium-text">
          Let&apos;s start off by making sure we&apos;re on the same page about a few things:
        </p>
        <ul>
          <li className="medium-text">
            <strong>Smart contracts</strong> are bits of code a developer can put on the Ethereum blockchain that sets in stone rules about what an app can and can&apos;t do. The benefit of establishing rules through code is that <a href="https://www.ted.com/watch/ted-institute/ted-bcg/blockchain-and-the-middleman" target="_blank" rel="noopener noreferrer"> middlemen across a variety of industries</a><ExternalLinkIcon width={12} height={12} /> (ex. banks, securities clearinghouses, real estate brokers) can be removed. That means their cut goes <strong>back to you</strong>, the consumer.
          </li>
          <li className="medium-text">
            Blockchain as a technology is <strong>maturing</strong>. <a href="https://www.theblockcrypto.com/2019/01/04/mapping-out-ethereums-developer-ecosystem/" target="_blank" rel="noopener noreferrer">Hundreds of thousands of software engineers</a><ExternalLinkIcon width={12} height={12} /> are building smart contracts into their apps today ⚒️.
          </li>
          <li className="medium-text">
            One real-world industry in which blockchain is already cutting out the middleman is <strong>lending and borrowing</strong>. Right this second, people have <a href="https://defipulse.com" target="_blank" rel="noopener noreferrer"><strong>over $550 million dollars</strong></a><ExternalLinkIcon width={12} height={12} /> of assets in Ethereum smart contract loans, and several <strong>billions</strong> if you include centralized cryptocurrency loans.
          </li>
        </ul>
        <p className="big-text">
          We&apos;re going to leverage the above to let you deposit your money, and make steady <strong>6-10% APR interest</strong>. No matter where in the 🌍 you live.
        </p>
        <div className="center-image-wrapper">
          <button className="button next-step-button" onClick={() => props.changeStep('+')}>Got it! 👍</button>
        </div>
      </div>
    </ScrollAnimation>
  </React.Fragment>
);

export default Step0Primer;
