import React from "react";
import { Box, Flex, Button, Image } from "rimble-ui";
// import NetworkIndicator from "@rimble/network-indicator"
import AccountOverview from "./AccountOverview";
import AccountModal from "./AccountModal";
import MenuLink from "../../MenuLink/MenuLink";

class Header extends React.Component {
  state = {
    isOpen: false
  }

  toggleModal = () => {
    this.setState(state => ({...state, isOpen: !state.isOpen}));
  }

  render() {
              // {!this.props.isMobile &&
                // <Box mr={[2, 4]}>
                //   <NetworkIndicator
                //     currentNetwork={this.props.network.current.id}
                //     requiredNetwork={this.props.network.required.id} />
                // </Box>
              // }
    return (
      <Box style={{
        'position': 'absolute',
        'left': '0',
        'right': '0',
        'zIndex': 99
        }}
      >
        <Flex alignItems={"center"} bg={"darkBlue"} py={1}>
          <Box ml={[0, 6]} width={[1,4/12]} py={[3,4]} alignItems={"center"} textAlign={'center'}>
            <Image src="images/logo.png"
              mx={'auto'}
              height={['40px','70px']}
              position={['relative','absolute']} />
          </Box>
          <Box display={['none','block']} width={[8/12]} justifyContent="flex-end">
            <Flex alignItems={"center"} justifyContent="flex-end">
              <MenuLink handleClick={e => this.props.handleMenuClick(e, '1')} linkSrc="#invest" linkText="Start Lending" />
              <MenuLink handleClick={e => this.props.handleMenuClick(e, '2')} linkSrc="#invest" linkText="Your Investments" />
              <MenuLink linkSrc="#faq" linkText="Help" />
              {this.props.account ? (
                <AccountOverview
                  account={this.props.account}
                  hasQRCode={false}
                  isMobile={this.props.isMobile}
                  accountBalanceLow={this.props.accountBalanceLow}
                  accountBalance={this.props.accountBalance}
                  accountBalanceDAI={this.props.accountBalanceDAI}
                  toggleModal={this.toggleModal}
                />
              ) : (
                <Button
                  contrastColor={'blue'}
                  mainColor={'white'}
                  borderRadius={4}
                  my={2}
                  mr={[3, 4]}
                  onClick={this.props.connectAndValidateAccount}
                  size={this.props.isMobile ? 'small' : 'medium'}
                >
                  CONNECT
                </Button>
              )}
            </Flex>
          </Box>
        </Flex>
        <AccountModal
          account={this.props.account}
          accountBalance={this.props.accountBalance}
          accountBalanceDAI={this.props.accountBalanceDAI}
          isOpen={this.state.isOpen}
          isMobile={this.props.isMobile}
          closeModal={this.toggleModal}
          network={this.props.network.current} />
      </Box>
    );
  }
}

export default Header;
