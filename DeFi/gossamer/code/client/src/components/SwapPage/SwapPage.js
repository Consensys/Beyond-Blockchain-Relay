import React from 'react';

const SwapPage = props => <div>
    {props.renderNavbar('swap')}
      <div className="page-wrapper">
        <div className="dashboard-header-wrapper">
          <h1 className="title-text--bold">Convert to DAI</h1>
          <h2 className="medium-text">But hopefully you have Metamask!</h2>
          <iframe className="center" height="1000" width="600" src="
          https://widget.kyber.network/v0.6/?type=swap&mode=tab&callback=https%3A%2F%2F
          kyberpay-sample.knstats.com%2Fcallback&paramForwarding=true&network=mainnet&
          pinnedTokens=DAI&defaultPair=ETH_DAI&theme=theme-sunset" />
        </div>
      </div>
    </div>;

export default SwapPage;
