import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const Step1Intro = props => (
      <div>
        <React.Fragment>
          <ScrollAnimation animateIn='wobble' animateOnce={true} delay={500}>
            <h2 className="big-text--bold">Hey {props.userData.name}! 👋</h2>
          </ScrollAnimation>
          <ScrollAnimation animateIn="bounceInUp" animateOnce={true} delay={1500}>
            <div className="supply-flow-text-wrapper">
              <p className="medium-text">
                <strong><a href="https://media.consensys.net/the-100-projects-pioneering-decentralized-finance-717478ddcdf2" target="_blank" rel="noopener noreferrer">Lending and borrowing</a></strong><ExternalLinkIcon width={12} height={12} /> of cryptocurrencies through the blockchain is becoming a thing 💅. Right this second, people have <a href="https://defipulse.com" target="_blank" rel="noopener noreferrer"><strong>over $550 million dollars</strong></a><ExternalLinkIcon width={12} height={12} /> of assets in Ethereum smart contract loans alone. Smart contracts are replacing the banks as a trusted middleman, setting the rules for the lending ecosystem transparently in code.
              </p>
              <p className="medium-text">
                Normally, the banks pay you <strong>0.2-2%</strong> interest per year to park your money in your savings or checkings account, then turn around and flip it for immense profits by lending it out to businesses for over 50x that amount. That's one reason banks last year made  <a href="https://www.bloomberg.com/news/articles/2019-02-21/banks-crushed-profit-record-with-237-billion-in-2018-fdic-says" target="_blank" rel="noopener noreferrer">record-setting profits</a><ExternalLinkIcon width={12} height={12} />
              </p>
              <p className="medium-text">
              {props.userData.name}, we&apos;re cutting out the banks and giving their cut to <strong>you</strong>.
              </p>
              <div className="center-image-wrapper">
                <img className="center" height="175" width="250" src="https://media.giphy.com/media/l3mZaGv4Krokd3GM0/giphy.gif" />
              </div>
              <p className="big-text">
              You deposit to us, we plug you into the Ethereum lending ecosystem, and you make <strong>6-10%</strong> annual interest. It&apos;s that simple.
              </p>
            </div>
            <button className="button next-step-button" onClick={() => props.changeStep('+')}>Tell me more 😮</button>
          </ScrollAnimation>
        </React.Fragment>
      </div>
);

export default Step1Intro;


/*

<li className="medium-text">
                Your algorithmic banker will take care of lending out chunks of your money to various borrowers. The standards to borrow are rigorous - they actually have to put up more than the amount they borrow (150%, to be exact) as <span className="italics">just-in-case-I-can&apos;t-pay-you-back collateral</span>, which makes the ecosystem quite safe. The liquidity pool you&apos;re lending to has existed for almost 2 years, without a single lender like you losing a cent.
              </li>

<div className="supply-flow-text-wrapper">
              <p className="medium-text">
                Let&apos;s start off by making sure we&apos;re on the same page about a few things:
              </p>
              <ul>
                <li className="medium-text">
                  <strong>Smart contracts</strong> are bits of code a developer can put on the Ethereum blockchain that sets in stone rules about what an app can and can&apos;t do. The benefit of establishing rules through code is that <a href="https://www.ted.com/watch/ted-institute/ted-bcg/blockchain-and-the-middleman" target="_blank" rel="noopener noreferrer"> middlemen across a variety of industries</a><ExternalLinkIcon width={12} height={12} /> (ex. banks, securities clearinghouses, real estate brokers) can be removed. That means <strong>their cut goes back to you</strong>, the consumer.
                </li>
                <li className="medium-text">
                  Blockchain as a technology is <strong>maturing</strong>. <a href="https://www.theblockcrypto.com/2019/01/04/mapping-out-ethereums-developer-ecosystem/" target="_blank" rel="noopener noreferrer">Hundreds of thousands of software engineers</a><ExternalLinkIcon width={12} height={12} /> are building smart contracts into their apps today ⚒️.
                </li>
                <li className="medium-text">
                  One real-world industry in which blockchain is already cutting out the middleman is <strong>lending and borrowing</strong>. Right this second, people have <a href="https://defipulse.com" target="_blank" rel="noopener noreferrer"><strong>over $550 million dollars</strong></a><ExternalLinkIcon width={12} height={12} /> of assets in Ethereum smart contract loans, and several <strong>billions</strong> if you include centralized cryptocurrency loans.
                </li>
              </ul>
              <p className="medium-text">
                We're going to make you around <strong>{this.props.financialData.interestRate.DAI}% APR</strong> by helping you become a lender on the Ethereum blockchain. The liquidity pool you're lending to has existed for almost 2 years, without a single lender like you losing a cent. Make stable earnings, without the volatility of Bitcoin.
              </p>
            </div>

if (this.props.introStep === 3) {
      return (
      <ScrollAnimation animateIn="fadeIn" animateOnce={true} animatePreScroll={true} delay={500}>
        <div className="supply-flow-text-wrapper">
          <h2 className="big-text">
            Because of these algorithms, you can get an impressive <strong>{this.props.financialData.interestRate.DAI}% APR</strong> return on your money.
          </h2>
          <p className="medium-text">
            To be transparent, this is a dynamic number - a 30-day average of interest rates in this lending ecosystem run by Compound. We think that&apos;s a good, if even low indicator of the rate what you&apos;ll be getting in the future. The interest rate changes based on supply and demand in the lending ecosystem, controlled by the algorithms 🧠. Your interest rate goes up when more people want to borrow.
          </p>
          <p className="medium-text">
            If you want to go deeper into the technical details, you can read more in our FAQs <a href="/faqs" target="_blank" rel="noopener noreferrer">here</a><ExternalLinkIcon width={12} height={12} />.
          </p>
          <p className="medium-text">
            Blockchain is complicated - as the comedian Jon Oliver once said, <span className="italics">everything you didn&apos;t know about finance combined with everything you didn&apos;t know about technology.</span> We want to take care of the complicated and technical parts for you, so you can just sit back and watch your
            money grow without worry 🌱.
          </p>
          <p className="medium-text">
          Now, enough talk. With us, additional interest is efficiently calculated and added to your account every 15 seconds. Time is literally money! 💸
        </p>
        </div>
        <button className="button next-step-button" onClick={() => this.props.changeStep('current', '+')}>Awesome!</button>
      </ScrollAnimation>
      );
    }
    */
