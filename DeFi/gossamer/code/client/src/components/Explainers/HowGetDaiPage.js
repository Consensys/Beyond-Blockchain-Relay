import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const HowGetDaiPage = props => <div>
    {props.renderNavbar('howto')}
      <div className="copy-page-wrapper">
        <ScrollAnimation animateIn='fadeIn' animateOnce={true} >
          <h1 className="title-text--bold">Not sure how to get or buy Dai? <br/>Don&apos;t worry. We&apos;ve got you covered.</h1>
        </ScrollAnimation>
        <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={2000} >
          <div className="copy-unit-wrapper">
            <h2 className="big-text--bold">Wait, what&apos;s Dai again?</h2>
            <p className="medium-text">There&apos;s lots of different tokens to keep track of in the blockchain world - we get it! We have a helpful Dai explainer for you right <Link to="/dai">here</Link>.</p>
            <p className="medium-text">We know this stuff isn&apos;t easy for people who haven&apos;t spent a lot of time tinkering with blockchain or cryptocurrency products, so if you need any help at all, please don&apos;t hesitate to ask for help in our customer support chat. New technology is never easy.</p>
          </div>
      <div className="copy-unit-wrapper">
        <h2 className="big-text--bold">Where can I buy Dai?</h2>
          <p className="medium-text">
            If you know what <a href="https://metamask.io/" target="_blank" rel="noopener noreferrer">Metamask</a>
            <ExternalLinkIcon width={10} height={10} /> is and have it, you may have a good idea of where to buy Dai using it:
          </p>
          <li className="medium-text">You can use our Kyber Swap integration <Link to="/swap">here</Link>.
          &nbsp;You can exchange ETH or any ERC-20 token for Dai instantly, in a few clicks.</li>
          <li className="medium-text">You can also use Kyber Network&apos;s Swap product directly at their website&nbsp;
            <a href="https://kyberswap.com/" target="_blank" rel="noopener noreferrer">here</a>
            <ExternalLinkIcon width={10} height={10} />.
          </li>
          <li className="medium-text">
            Unfortunately, many normal (centralized) exchanges like Binance don&apos;t have Dai, given the team behind it cares more about making Dai available on decentralized exchanges. But decentralized exchanges like IDEX offer many Dai trading pairs.
          </li>
          <p className="medium-text">
            If you don&apos;t have Metamask installed and aren&apos;t familiar with decentralized exchanges, the easiest way to get Dai
            is probably through <strong>Coinbase Pro</strong>. Coinbase Pro is Coinbase&apos;s more advanced exchange formerly called GDAX.
            It&apos;s still owned by Coinbase, but to use it you have to attach your bank account to your
            Coinbase Pro account, or transfer crypto over from your regular Coinbase account. Look below for a step-by-step guide.
          </p>
      </div>
      <div className="copy-unit-wrapper">
        <h2 className="big-text--bold">How do I buy Dai on Coinbase?</h2>
          <p className="medium-text">1) To start off, you&apos;ll need some Ethereum to buy Dai. You can get that from wherever you want - Coinbase, Binance, Robinhood, Square, decentralized exchanges, etc.
          </p>
          <p className="medium-text">2) Visit <a href="https://kyberswap.com/" target="_blank" rel="noopener noreferrer">pro.coinbase.com</a><ExternalLinkIcon width={10} height={10} />. Click <strong>Sign In.</strong>
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getdaistep1.png" />
          </p>
          <p className="medium-text"><strong>3)</strong> Sign in to Coinbase Pro with your Coinbase account - if you&apos;ve never used Coinbase Pro before, it&apos;s the same username and password as your Coinbase account.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getdaistep2.png" />
          </p>
          <p className="medium-text"><strong>3)</strong> Click <strong>My Wallets</strong> in the top-right navigation area, then click <strong>Deposit</strong> on the left menu bar to deposit Ethereum into your Coinbase Pro wallet.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getdaistep3.png" />
          </p>
          <p className="medium-text"><strong>4)</strong> Once you have Ethereum in your Coinbase Pro wallet, click on <strong>Trade</strong> in the top left navigation area. From there, find the <strong>ETH-DAI trading pair</strong> market - check out the area indicated by the light green rectangle.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getdaistep4.png" />
          </p>
          <p className="medium-text"><strong>5)</strong> Under <strong>Order Form</strong>, select <strong>Limit</strong> buy - it&apos;s the only type of order available on the <strong>ETH-DAI</strong> trading pair now. For <strong>Amount</strong>, enter in the amount of ETH you want to convert to DAI. For <strong>Limit Price</strong>, put the current price of ETH as shown at the top of the screen at <span className="italics">Last trade price</span>. We basically just want to quickly exchange ETH for DAI, we don&apos;t have to worry about getting a good price. After double checking to make sure everything&apos;s OK, execute the order and wait for it to fill.
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getdaistep5.png" />
          </p>
          <p className="medium-text"><strong>6)</strong> Going back to <strong>My Wallets</strong> in the top-right navigation area, click <strong>Withdraw</strong> in the left-hand menu area, and withdraw your newly purchased Dai to the smart contract address that we ask you to send your Dai to! Congratulations, you just purchased some Dai and you&apos;re about to start earning 👏
            <br/>
            <img className="image--screenshot" height="300" width="625" src="https://dapp-lending.s3-us-west-1.amazonaws.com/getdaistep6.png" />
          </p>
      </div>
        </ScrollAnimation>
      </div>
    </div>;

export default HowGetDaiPage;
