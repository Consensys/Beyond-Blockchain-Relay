import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';
import NavbarLite from '../widgets/NavbarLite';

const CompoundExplainerPage = () => <div>
    <NavbarLite />
    <div className="page-wrapper">
      <div className="supply-flow-action-wrapper">
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} >
        <h1 className="title-text--bold">Learn more about how your money is growing.</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={1000} >
        <h2 className="big-text">
        The blockchain ecosystem, Ethereum and DAI are all relatively new. It&apos;s exciting to make money on the
        absolute cutting edge of technology and finance.
        </h2>
        <h2 className="big-text">But that doesn&apos;t mean it&apos;s easy to figure all this out.
        Nothing&apos;s more real or sacred to you than your money. That&apos;s why we&apos;re here to help. </h2>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={2000} >
        <h2 className="medium-text--bold">What&apos;s DAI, again?</h2>
        <p className="medium-text">
        COMPOUND LOANS BLAH BLAH
        Literally distillery vinyl, waistcoat activated charcoal  freegan.
        Mixtape letterpress XOXO stumptown, raw denim jean shorts scenester fashion axe cloud bread marfa flexitarian taiyaki tofu.
        </p>

        <h2 className="medium-text--bold">How does it maintain its $1 value?</h2>
        <p className="medium-text">
        Microdosing bushwick lyft pitchfork selvage. Mustache meditation skateboard palo santo irony lomo crucifix cred affogato.
        Locavore typewriter, pok pok cardigan mustache meggings.
        Synth actually cred, forage 3 wolf moon flexitarian chia subway tile enamel pin four dollar toast distillery freegan air plant.
        Cardigan health goth hammock knausgaard meh, meggings put a bird on it air plant chicharrones actually crucifix readymade iceland.
        </p>

        <h2 className="medium-text--bold">Where can I buy DAI?</h2>
        <p className="medium-text">
        Microdosing bushwick lyft pitchfork selvage. Mustache meditation skateboard palo santo irony lomo crucifix cred affogato.
        Locavore umami typewriter, pok pok cardigan mustache meggings.
        Synth actually cred, forage 3 wolf moon flexitarian chia subway tile enamel pin four dollar toast distillery freegan air plant.
        </p>
        <p className="medium-text">If you have a Coinbase account, you can buy it on Coinbase Pro
        <a href="https://pro.coinbase.com/trade/DAI-USDC">here.</a></p>
        <p className="medium-text">If you have Metamask or another web3 provider installed, you can use our Kyber Swap integration
        <Link to="/swap">here.</Link></p>

        <Link to="/supply/details">
        <button className="button">OK, I&apos;ve purchased DAI and I&apos;m ready to make money</button>
        </Link>
      </ScrollAnimation>
      </div>
    </div>
  </div>;

export default CompoundExplainerPage;
