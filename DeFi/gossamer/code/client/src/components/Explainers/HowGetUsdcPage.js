import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const HowGetUsdcPage = props => <div>
  {props.renderNavbar('howto')}
    <div className="copy-page-wrapper">
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} >
        <h1 className="title-text--bold">Not sure how to get or buy USDC? <br/>Don&apos;t worry, we&apos;re here to help.</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={2000} >
      <div className="copy-unit-wrapper">
        <h2 className="big-text--bold">Where can I buy USDC?</h2>
          <p className="medium-text">
            If you know what <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a>
            <ExternalLinkIcon width={10} height={10} /> is and have it, you probably already have a good sense of where to buy USDC:
          </p>
          <li className="medium-text">You can use our Kyber Swap integration <Link to="/swap">here</Link>.
            You can exchange ETH or any ERC-20 token for USDC instantly, in a few clicks.</li>
          <li className="medium-text">You can also use Kyber Network&apos;s Swap product directly at their website&nbsp;
            <a href="https://kyberswap.com/" target="_blank" rel="noopener noreferrer">here</a>
            <ExternalLinkIcon width={10} height={10} />.
          </li>
          <p className="medium-text">If you have a Binance account, you can buy USDC easily on Binance. There are a&nbsp;
          <a href="https://www.binance.com/en/trade/BTC_USDC" target="_blank" rel="noopener noreferrer">lot of trading pairs for
          USDC</a><ExternalLinkIcon width={10} height={10} />. Make sure you&apos;re purchasing USDC though, and not a similarly
          named token like USDT.</p>
          <p className="medium-text">You can also buy USDC easily on Coinbase, given that Coinbase helps operate and back
          USDC&apos;s reserves: </p>
            <li className="medium-text">If you prefer Coinbase Pro, it&apos;s easy to trade for USDC - you can start&nbsp;
              <a href="https://pro.coinbase.com/trade/BTC-USDC" target="_blank" rel="noopener noreferrer">here</a>
              <ExternalLinkIcon width={10} height={10} />. Coinbase Pro is Coinbase&apos;s more advanced exchange formerly
              called GDAX. It&apos;s still owned by Coinbase, but to use it you have to attach your bank account to your
              Coinbase Pro account, or transfer crypto over from your regular Coinbase account.
            </li>
            <li className="medium-text">
              Buying directly on regular Coinbase is the easiest way to get USDC, if you already have a Coinbase account.
              You can buy it just as easily as you would buy Bitcoin or Ethereum on Coinbase, with a few clicks.
              Look below for a more detailed step-by-step guide on how to do so.
            </li>
      </div>
      <div className="copy-unit-wrapper">
        <h2 className="big-text--bold">How do I buy USDC on Coinbase?</h2>
          <p className="medium-text">1) Sign in to your Coinbase account and go to&nbsp;
            <a href="https://www.coinbase.com/buy" target="_blank" rel="noopener noreferrer">coinbase.com/buy</a>
            <ExternalLinkIcon width={10} height={10} />.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getusdcstep1.png" />
          </p>
          <p className="medium-text"><strong>2)</strong> Under the <strong>Cryptocurrency</strong> drop-down menu,&nbsp;
            <strong>select USD Coin.</strong> Fill in the <strong>amount</strong> of USD Coin (USDC) that you want to buy.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getusdcstep2.png" />
          </p>
          <p className="medium-text"><strong>3)</strong> Click <strong>Buy USD Coin Instantly</strong> to queue up the transaction, then click <strong>Confirm Buy</strong> to finalize it.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getusdcstep3.png" />
          </p>
          <p className="medium-text"><strong>4)</strong> Once you&apos;ve made the purchase, click on <strong><a href="https://www.coinbase.com/buy" target="_blank" rel="noopener noreferrer">Accounts</a></strong>. Scroll down to your <strong>USDC Wallet</strong>, and click <strong>Send</strong>.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getusdcstep4.png" />
          </p>
          <p className="medium-text"><strong>5)</strong> Under <strong>Recipient</strong>, enter in the address that 
          you&apos;re sending to - in this case, likely our smart contract that we create for you to deposit into. 
          From there, you can click <strong>Continue</strong> and send the USDC to us! 👏
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getusdcstep5.png" />
          </p>
      </div>
      </ScrollAnimation>
    </div>
  </div>;

export default HowGetUsdcPage;
