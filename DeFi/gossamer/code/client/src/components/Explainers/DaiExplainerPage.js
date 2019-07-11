import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import ExternalLinkIcon from '../widgets/ExternalLinkIcon';

const DaiExplainerPage = props => <div>
    {props.renderNavbar('howto')}
    <div className="copy-page-wrapper">
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} >
        <h1 className="title-text--bold">We have your back. Let&apos;s talk about DAI.</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={1000} >
        <h2 className="big-text">
        The blockchain ecosystem, Ethereum and Dai are all relatively new. It&apos;s exciting to make money on the
        absolute cutting edge of technology and finance.
        </h2>
        <h2 className="big-text">But that doesn&apos;t mean it&apos;s easy to figure all this out.
        Nothing&apos;s more real or sacred to you than your money. That&apos;s why we&apos;re here to help. </h2>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={2000} >
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">So what is Dai, exactly?</h2>
          <p className="medium-text">Dai (DAI) is a token with a stable value (thus, a <strong>stablecoin</strong>) that attempts to maintain a value of $1.00 USD. Unlike centralized stablecoins, Dai isn&apos;t backed by US dollars in a bank account. Instead, it’s backed by collateral on the Maker platform. Note: if the Dai credit system is upgraded or shutdown, Dai holders may need to convert their Dai to Ethereum through the Maker platform. Read more at makerdao.com/whitepaper.
          </p>
        </div>
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">Any good resources to learn more about Dai and its ecosystem?</h2>
            <p className="medium-text"><a href="https://www.youtube.com/watch?v=J9q8hkyy8oM" target="_blank" rel="noopener noreferrer">This short video</a>
                <ExternalLinkIcon width={12} height={12} /> by Coindesk (a major blockchain and cryptocurrency news publication) gives a great visual overview of what Dai is.
          </p>
          <p className="medium-text">Another awesome resource that introduces Dai in a friendly-to-use way is <a href=
            "https://www.coinbase.com/earn/dai/" target="_blank" rel="noopener noreferrer">here</a><ExternalLinkIcon width={12} height={12} />, at Coinbase&apos;s new Coinbase Earn. You can earn a little free cryptocurrency for watching videos that explain how various cryptocurrencies work under the hood.
          </p>
        </div>
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">How does it maintain its $1 value?</h2>
          <p className="medium-text">
            Backed by crypto. Synth actually cred, forage 3 wolf moon flexitarian chia subway
            tile enamel pin four dollar toast distillery freegan air plant. Cardigan health goth hammock knausgaard meh,
            meggings put a bird on it air plant chicharrones actually crucifix readymade iceland.
          </p>
        </div>
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">How secure is DAI?</h2>
          <p className="medium-text">
            It&apos;s not always $1, it fluctuates a bit. slightly more volatil ebecause it&apos;s backed by crypto which
            is volatile. MakerDAO is the biggest project on Ethereum, has 500m or so locked up. Has a ton of audits. Seen
            as the best/interesting/promising thing on Etheruem, by far. Community support. Lot of scrutiny. Very careful to
            roll things out, testing features for 6-8 months on testnet. Largest team of an Ethereum? Lot of risk teams. WE
            trust this a lot. Flash crash of ETH, but advanced protections. Smart contract risk. Whereas for a centralized
            stablecoin like USDC, you&apos;re dealing with counterparty risk - AKA, trusting that the big company will be
            honest and secure with your money.
          </p>
        </div>
        <div className="copy-unit-wrapper">
          <h2 className="big-text--bold" id="buy">Where do I learn more about stablecoins?</h2>
          <p className="medium-text">
          https://multicoin.capital/2018/01/17/an-overview-of-stablecoins/
          </p>
        </div>
        <div className="copy-unit-wrapper">
        <p className="medium-text">We have a helpful explainer for you right <Link to="/getdai">here.</Link></p>
        </div>
      <Link to="/supply/details">
        <button className="button">OK, I&apos;ve purchased DAI and I&apos;m ready to make money</button>
      </Link>
    </ScrollAnimation>
  </div>
</div>;

export default DaiExplainerPage;

/*
<a href="#buy">
            Click here to jump to Some Heading
          </a>
          */