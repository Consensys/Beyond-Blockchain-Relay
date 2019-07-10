import React from "react";
import { Flex, Icon, Box, Text, QR } from "rimble-ui";
import ShortHash from "./ShortHash";
import BigNumber from 'bignumber.js';

class AccountOverview extends React.Component {
  BNify = s => new BigNumber(String(s));
  trimEth = (eth, to) => {
    return this.BNify(eth).toFixed(to);
  };
  render() {
    const roundedBalance = this.trimEth(this.props.accountBalance, 4);
    const roundedDAIBalance = this.trimEth(this.props.accountBalanceDAI, 2);
    return (
      <Flex alignItems={"flex-start"} style={{cursor: 'pointer'}} mx={3} my={2} onClick={this.props.toggleModal}>
        {!this.props.isMobile &&
          <Box>
            {this.props.hasQRCode &&
              <Flex mr={3} p={1}>
                <QR
                  value={this.props.account}
                  size={50}
                  renderAs={'svg'}
                />
              </Flex>
            }
            <Box>
              <Text fontSize={1} color={'white'}>
                User: &nbsp;
                <ShortHash
                  fontSize={1} color={'white'}
                  hash={this.props.account} />
              </Text>
              <Text
                fontSize={1}
                color={this.props.accountBalanceLow ? 'white' : 'white'}
                >
                {isNaN(roundedBalance) ? '0' : roundedBalance} ETH
                {roundedDAIBalance && !isNaN(roundedDAIBalance) ? `, ${roundedDAIBalance} DAI` : ', 0 DAI'}
              </Text>
            </Box>
          </Box>
        }
        <Icon
          name='AccountCircle'
          size={45}
          ml={2}
          mt={[0, 0]}
          color='white' />
      </Flex>
    );
  }
}

export default AccountOverview;
