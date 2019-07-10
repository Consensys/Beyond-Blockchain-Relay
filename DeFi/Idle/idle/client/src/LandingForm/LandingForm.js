import React, { Component } from 'react';
// import styles from './LandingForm.module.scss';
import { Box } from "rimble-ui";

import RimbleWeb3 from "../utilities/RimbleWeb3";
import TransactionToastUtil from "../utilities/TransactionToastUtil";

import SmartContractControls from "../SmartContractControls/SmartContractControls";

class LandingForm extends Component {
  render() {
    return (
      <RimbleWeb3.Consumer>
        {({
          contracts,
          account,
          transactions,
          initContract,
          initAccount,
          getAccountBalance,
          contractMethodSendWrapper,
          web3,
          network
        }) => (
          <Box maxWidth={["50em", "70em"]} mx={"auto"}>
            <SmartContractControls
              web3={web3}
              isMobile={this.props.isMobile}
              updateSelectedTab={this.props.updateSelectedTab}
              selectedTab={this.props.selectedTab}
              network={network}
              contracts={contracts}
              account={account}
              transactions={transactions}
              initContract={initContract}
              getAccountBalance={getAccountBalance}
              contractMethodSendWrapper={contractMethodSendWrapper}
            />
            <TransactionToastUtil transactions={transactions} />
          </Box>
        )}
      </RimbleWeb3.Consumer>
    );
  }
}

export default LandingForm;
