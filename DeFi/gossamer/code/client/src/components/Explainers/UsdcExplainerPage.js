import React from 'react';
import ScrollAnimation from 'react-animate-on-scroll';
import { Link } from 'react-router-dom';

const UsdcExplainerPage = props => <div>
    {props.renderNavbar('howto')}
    <div className="page-wrapper">
      <div className="supply-flow-action-wrapper">
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} >
        <h1 className="title-text--bold">We have your back. Let&apos;s talk about USDC.</h1>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={1000} >
        <h2 className="big-text">
        The blockchain ecosystem, Ethereum and USDC are all relatively new. It&apos;s exciting to make money on the
        absolute cutting edge of technology and finance.
        </h2>
        <h2 className="big-text">But that doesn&apos;t mean it&apos;s easy to figure all this out.
        Nothing&apos;s more real or sacred to you than your money. That&apos;s why we&apos;re here to help. </h2>
      </ScrollAnimation>
      <ScrollAnimation animateIn='fadeIn' animateOnce={true} delay={2000} >
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">What is USDC?</h2>
          <p className="medium-text">
          Lorem ipsum dolor amet poutine poke semiotics synth humblebrag normcore yr cred williamsburg chicharrones kitsch
          gluten-free 3 wolf moon jean shorts semiotics 90&apos;s distillery.
          Literally distillery vinyl, waistcoat activated charcoal  freegan.
          Mixtape letterpress XOXO stumptown, raw denim jean shorts scenester fashion axe cloud bread marfa flexitarian taiyaki tofu.
          </p>
        </div>
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">How does it maintain its $1 value?</h2>
          <p className="medium-text">
          Microdosing bushwick lyft pitchfork selvage. Mustache meditation skateboard palo santo irony lomo crucifix cred affogato.
          Locavore typewriter, pok pok cardigan mustache meggings.
          Synth actually cred, forage 3 wolf moon flexitarian chia subway tile enamel pin four dollar toast distillery freegan air plant.
          Cardigan health goth hammock knausgaard meh, meggings put a bird on it air plant chicharrones actually crucifix readymade iceland.
          </p>
        </div>
        <div className="copy-unit-wrapper">
          <h2 className="medium-text--bold">Where can I buy USDC?</h2>
          <p className="medium-text">We have a helpful explainer for you right <Link to="/getusdc">here.</Link></p>
        </div>

        <div className="copy-unit-wrapper">
          <h2 className="big-text--bold" id="buy">Where do I learn more about stablecoins?</h2>
          <p className="medium-text">
          https://multicoin.capital/2018/01/17/an-overview-of-stablecoins/
          </p>
        </div>

        <Link to="/supply/details">
        <button className="button">OK, I&apos;ve purchased USDC and I&apos;m ready to make money</button>
        </Link>
      </ScrollAnimation>
      </div>
    </div>
  </div>;

export default UsdcExplainerPage;
