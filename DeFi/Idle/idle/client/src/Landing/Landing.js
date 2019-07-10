import React, { Component } from 'react';
import { Image, Flex, Box, Heading, Button, Link, Text } from 'rimble-ui'
import BigNumber from 'bignumber.js';
import styles from './Landing.module.scss';
import LandingForm from '../LandingForm/LandingForm';
import IconFlexRow from '../IconFlexRow/IconFlexRow';
import Faq from '../Faq/Faq';

import IdleDAI from "../contracts/IdleDAI.json";
import cDAI from '../abis/compound/cDAI';
import DAI from '../contracts/IERC20.json';
import iDAI from '../abis/fulcrum/iToken.json';

// mainnet
const IdleAbi = IdleDAI.abi;
const IdleAddress = '0x10cf8e1CDba9A2Bd98b87000BCAdb002b13eA525';

const cDAIAbi = cDAI.abi;
const cDAIAddress = '0xf5dce57282a584d2746faf1593d3121fcac444dc';
const DAIAbi = DAI.abi;
const DAIAddress = '0x89d24a6b4ccb1b6faa2625fe562bdd9a23260359';
const iDAIAbi = iDAI.abi;
const iDAIAddress = '0x14094949152eddbfcd073717200da82fed8dc960';

class Landing extends Component {
  state = {
  };

  componentDidMount() {
    // TODO: we already created this contract
    this.props.initContract('IdleDAI', IdleAddress, IdleAbi).then(async () => {
      await this.getAprs();
    });
  }

  // utilities
  trimEth = eth => {
    return this.BNify(eth).toFixed(6);
  };
  BNify = s => new BigNumber(String(s));
  toEth(wei) {
    return this.props.web3.utils.fromWei(
      (wei || 0).toString(),
      "ether"
    );
  }
  toWei(eth) {
    return this.props.web3.utils.toWei(
      (eth || 0).toString(),
      "ether"
    );
  }

  getAprs = async () => {
    let aprs = await this.genericIdleCall('getAPRs');
    this.setState({
      [`compoundRate`]: aprs ? (+this.toEth(aprs[0])).toFixed(2) : '0.00',
      [`fulcrumRate`]: aprs ? (+this.toEth(aprs[1])).toFixed(2) : '0.00',
      [`maxRate`]: aprs ? (+this.toEth(Math.max(aprs[0],aprs[1]))).toFixed(2) : '0.00',
      needsUpdate: false
    });
  };

  genericContractCall = async (contractName, methodName, params = []) => {
    let contract = this.props.contracts.find(c => c.name === contractName);
    contract = contract && contract.contract;
    if (!contract) {
      console.log('Wrong contract name', contractName);
      return;
    }

    const value = await contract.methods[methodName](...params).call().catch(error => {
      console.log(`${contractName} contract method ${methodName} error: `, error);
      this.setState({ error });
    });
    return value;
  }

  // Idle
  genericIdleCall = async (methodName, params = []) => {
    return await this.genericContractCall('IdleDAI', methodName, params).catch(err => {
      console.error('Generic Idle call err:', err);
    });
  }

  startLending = async (e)=>{
    this.props.updateSelectedTab(e,'1');
    window.location.href='#invest';
  }

  render() {
    const { network } = this.props;
    return (
      <Box
        style={{
          paddingBottom: !network.isCorrectNetwork ? "8em" : "0"
        }}
      >
        <Box className={[styles.headerContainer]} pt={['2em', '2em']}>
          <Box className={[styles.bgContainer,styles.bg1]} display={['none','block']}></Box>
          <Box className={[styles.bgContainer,styles.bg2]} display={['none','block']}></Box>
          <Box position={'relative'} zIndex={10}>
            <Flex flexDirection={'column'} alignItems={['center','flex-start']} maxWidth={["50em", "50em"]} mx={['auto',6]} pb={3} px={[3,0]} textAlign={['center','left']} pt={['10vh', '20vh']}>
              <Heading.h1 fontFamily={'sansSerif'} lineHeight={'1.1em'} mb={'0.5em'} fontSize={[6,7]} textAlign={['center','left']}>
                Get the best out of your lend, with just one token
              </Heading.h1>
              <Heading.h2 fontWeight={'400'} lineHeight={'2em'} fontSize={[3,4]} textAlign={['center','left']}>
                We connect different lending protocols with a decentralized rebalance process to always give you the best available rate
              </Heading.h2>
              <Button
                onClick={e => this.startLending(e)}
                className={[styles.button]}
                size={'large'}
                contrastColor={'blue'}
                mainColor={'white'}
                fontSize={[2,3]}
                px={[4,5]}
                mt={[4,4]}
                mb={[5,'70vh']}
              >
                START LENDING
              </Button>
            </Flex>
            <Box id='invest' position={['relative','absolute']} width={['auto','100%']} mt={['0','-250px']}>
              <Box position={'absolute'} zIndex={'0'} width={'100%'} height={'50%'} top={'50%'} left={'0'} backgroundColor={'gray'}></Box>
              <Box position={'relative'} zIndex={'1'}>
                <LandingForm
                  isMobile={this.props.isMobile}
                  updateSelectedTab={this.props.updateSelectedTab}
                  selectedTab={this.props.selectedTab} />
              </Box>
            </Box>
          </Box>
        </Box>

        <Box className={[styles.graySection]} pt={[0,7]}>
          <Box maxWidth={['50em','70em']} mx={'auto'} pt={[0,6]}>
            <IconFlexRow image={'images/feature-1.png'} title='100% non-custodial, thanks to our contract.' linkHref={'https://etherscan.io/address/0x10cf8e1CDba9A2Bd98b87000BCAdb002b13eA525#code'} linkText='Smart contract' />
            <IconFlexRow image={'images/feature-2.png'} title='Fully decentralized, thanks to our users.' handleClick={e => this.props.updateSelectedTab(e,'3')} linkHref={'#invest'} linkText='Rebalance process' />
            <IconFlexRow image={'images/feature-3.png'} title='No hidden fees, best things in life are free!' linkHref={'#how-it-works'} linkText='See how it works' />
          </Box>
          <Flex maxWidth={'100%'} flexDirection={['column','row']}>
            <Box position={'relative'} p={[4,6]} backgroundColor={'blue'} color={'white'}>
              <Heading.h3 fontFamily={'sansSerif'} fontSize={[5,6]} mb={[3,4]}>Asset Managers</Heading.h3>
              <Heading.h4 fontWeight={1} lineHeight={2}>
                Enhance profitability for your customers and optimize portfolio returns.
              </Heading.h4>
              <Box display={['none','block']}>
                <Button onClick={e => this.startLending(e)} borderRadius={4} size={'large'} mainColor={'lightBlue'} contrastColor={'blue'} fontWeight={2} fontSize={[2,3]} px={[4,5]} mt={[4,4]}>INVEST NOW</Button>
              </Box>
              <Box display={['block','none']}>
                <Button onClick={e => this.startLending(e)} borderRadius={4} size={'medium'} mainColor={'lightBlue'} contrastColor={'blue'} fontWeight={2} fontSize={[2,3]} px={[4,5]} mt={[4,4]}>INVEST NOW</Button>
              </Box>
            </Box>
            <Box position={'relative'} overflow={['hidden','visible']} p={[4,6]} backgroundColor={'white'} color={'blue'}>
              <Box className={styles.skewBg}></Box>
              <Box position={'relative'} zIndex={2}>
                <Heading.h3 fontFamily={'sansSerif'} fontSize={[5,6]} mb={[3,4]}>Retail Investors</Heading.h3>
                <Heading.h4 color={'black'} fontWeight={1} lineHeight={2}>
                  Are you a yield seeker? Make your money grows at the fastest pace on the market
                </Heading.h4>
                <Box display={['none','block']}>
                  <Button onClick={e => this.startLending(e)} borderRadius={4} size={'large'} mainColor={'blue'} contrastColor={'white'} fontWeight={2} fontSize={[2,3]} px={[4,5]} mt={[3,4]}>START EARNING</Button>
                </Box>
                <Box display={['block','none']}>
                  <Button onClick={e => this.startLending(e)} borderRadius={4} size={'medium'} mainColor={'blue'} contrastColor={'white'} fontWeight={2} fontSize={[2,3]} px={[4,5]} mt={[3,4]}>START EARNING</Button>
                </Box>
              </Box>
            </Box>
          </Flex>
        </Box>

        <Box id='how-it-works' pb={[4,6]}>
          <Box>
            <Heading.h2 fontFamily={'sansSerif'} fontSize={[5,6]} textAlign={'center'} py={[3,5]} alignItems={'center'} my={0}>
              How it Works
            </Heading.h2>
            <Flex flexDirection={['column','row']}>
              <Flex alignItems={'center'} width={[1,4/10]} px={[6,4]} textAlign={'center'}>
                <Image src="images/how-it-works.png" />
              </Flex>
              <Flex alignItems={'center'} flexDirection={'column'} width={[1,6/10]}>
                <Flex flexDirection={['column','row']}>
                  <Box width={[1,1/2]} px={[4,4]} pt={[3,4]} pb={[2,0]} backgroundColor={'white'} color={'black'} borderBottom={['1px solid #eee','none']}>
                    <Heading.h3 textAlign={['center','left']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]} color={'blue'}>
                      1. Lend your assets
                    </Heading.h3>
                    <Heading.h4 textAlign={['center','left']} fontWeight={2} lineHeight={1.5}>
                      Connect your Ethereum wallet and lend some idle crypto assets to get started.
                      You will receive IdleTokens representing your contract pool share.
                    </Heading.h4>
                  </Box>
                  <Box width={[1,1/2]} px={[4,4]} pt={[3,4]} pb={[2,0]} backgroundColor={'white'} color={'black'} borderBottom={['1px solid #eee','none']}>
                    <Heading.h3 textAlign={['center','left']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]} color={'blue'}>
                      2. Earn interests
                    </Heading.h3>
                    <Heading.h4 textAlign={['center','left']} fontWeight={2} lineHeight={1.5}>
                      Your funds will be automatically allocated among the best available interest bearing tokens.
                      You will immediately start earning compounded interest with a block-per-block pace.
                    </Heading.h4>
                  </Box>
                </Flex>
                <Flex flexDirection={['column','row']} justifyContent={'center'}>
                  <Box width={[1,1/2]} px={[4,4]} pt={[3,4]} pb={[2,0]} backgroundColor={'white'} color={'black'} borderBottom={['1px solid #eee','none']}>
                    <Heading.h3 textAlign={['center','left']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]} color={'blue'}>
                      3. Decentralized rebalance
                    </Heading.h3>
                    <Heading.h4 textAlign={['center','left']} fontWeight={2} lineHeight={1.5}>
                      Every interaction with Idle, made by any user, rebalances the entire pool if needed.
                      If the current tracked rate is not the actual best, you have the power to rebalance on behalf
                      of all users. One for all, all for one.
                    </Heading.h4>
                  </Box>
                  <Box width={[1,1/2]} px={[4,4]} pt={[3,4]} pb={[2,0]} backgroundColor={'white'} color={'black'}>
                    <Heading.h3 textAlign={['center','left']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]} color={'blue'}>
                      4. Easy Redeem
                    </Heading.h3>
                    <Heading.h4 textAlign={['center','left']} fontWeight={2} lineHeight={1.5}>
                      At anytime you can redeem your invested assets and get back your increased funds, automatically
                      rebalancing the pool if needed. Kudos for you.
                    </Heading.h4>
                  </Box>
                </Flex>
              </Flex>
            </Flex>
          </Box>
        </Box>

        <Box position={'relative'} className={[styles.graySection]} pb={[4,6]}>
          <Box className={[styles.bgContainer,styles.bgHeart]}></Box>
          <Box position={'relative'} maxWidth={['35em','80em']} mx={'auto'}>
            <Heading.h2 fontFamily={'sansSerif'} fontSize={[5, 6]} textAlign={'center'} py={[3,5]} alignItems={'center'} my={0}>
              Get the best APR, always.
            </Heading.h2>
            <Flex alignItems={['normal','flex-end']} flexDirection={['column','row']}>
              <Box>
                <Box display={['none','block']} height={'0.5em'}></Box>
                <Box p={[4,5]} pb={0} backgroundColor={'white'} color={'black'} boxShadow={1} borderBottom={'15px solid'} borderColor={'blue'}>
                  <Heading.h3 textAlign={['center']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]} color={'blue'}>
                    Compound DAI
                  </Heading.h3>
                  <Heading.h4 textAlign={['center']} fontWeight={1} lineHeight={2} fontSize={[2,3]}>
                    This is the current lending interest rate on Compound.
                  </Heading.h4>
                  <Heading.h2 fontFamily={'sansSerif'} textAlign={'center'} fontWeight={2} fontSize={[6,8]} mb={[4,0]}>{this.state.compoundRate}%</Heading.h2>
                </Box>
              </Box>
              <Box p={[4,5]} pb={0} backgroundColor={'blue'} color={'white'} boxShadow={1} borderBottom={'15px solid'} borderColor={'white'}>
                <Heading.h3 textAlign={['center']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]}>Idle DAI</Heading.h3>
                <Heading.h4 textAlign={['center']} fontWeight={1} lineHeight={2} fontSize={[2,3]}>Idle will get the best rate, thanks to users and Adam Smith' invisible hand principle.</Heading.h4>
                <Heading.h2 fontFamily={'sansSerif'} textAlign={'center'} fontWeight={2} fontSize={[9,10]} mb={[4,0]}>{this.state.maxRate}%</Heading.h2>
                <Box justifyContent={'center'} alignItems={'center'} textAlign={'center'} display={['none','flex']}>
                  <Button onClick={e => this.startLending(e)} borderRadius={4} size={'large'} mainColor={'lightBlue'} contrastColor={'blue'} fontWeight={2} fontSize={[2,3]} px={[4,5]} mt={[2,4]} mb={[3,3]}>START EARNING</Button>
                </Box>
                <Box justifyContent={'center'} alignItems={'center'} textAlign={'center'} display={['flex','none']}>
                  <Button onClick={e => this.startLending(e)} borderRadius={4} size={'medium'} mainColor={'lightBlue'} contrastColor={'blue'} fontWeight={2} fontSize={[2,3]} px={[4,5]} mt={[2,4]} mb={[3,3]}>START EARNING</Button>
                </Box>
              </Box>
              <Box>
                <Box display={['none','block']} height={'0.5em'}></Box>
                <Box p={[4,5]} pb={0} backgroundColor={'white'} color={'black'} boxShadow={1} borderBottom={'15px solid'} borderColor={'blue'}>
                  <Heading.h3 textAlign={['center']} fontFamily={'sansSerif'} fontSize={[4,5]} mb={[2,3]} color={'blue'}>Fulcrum DAI</Heading.h3>
                  <Heading.h4 textAlign={['center']} fontWeight={1} lineHeight={2} fontSize={[2,3]}>This is the current lending interest rate on Fulcrum.</Heading.h4>
                  <Heading.h2 fontFamily={'sansSerif'} textAlign={'center'} fontWeight={2} fontSize={[6,8]} mb={[4,0]}>{this.state.fulcrumRate}%</Heading.h2>
                </Box>
              </Box>
            </Flex>
          </Box>
        </Box>

        <Box id="faq" pb={[4,6]}>
          <Box maxWidth={['50em','70em']} mx={'auto'} px={[3,5]}>
            <Faq />
          </Box>
        </Box>

        <Box backgroundColor={'darkBlue'} py={[2,3]} px={[2,3]}>
          <Flex flexDirection={['column','row']} alignItems={'center'} justifyContent={'space-between'}>
            <Flex flexDirection={['column']} alignItems={['center','baseline']} justifyContent={'flex-end'}>
              <Box ml={[0,3]} mb={[0,2]}>
                <Text color={'white'} textAlign={['center','left']}>Build On</Text>
              </Box>
              <Flex flexDirection={['column','row']}>
                <Link href="https://www.ethereum.org/" target="_blank">
                  <Image src="images/ethereum.png" height={'2em'} mx={[0,3]} my={[3,0]} />
                </Link>
                <Link href="https://app.compound.finance" target="_blank">
                  <Image src="images/compound.png" height={'2em'} mx={[0,3]} my={[3,0]} />
                </Link>
                <Link href="https://fulcrum.trade" target="_blank">
                  <Image src="images/fulcrum.svg" height={'2em'} mx={[0,3]} my={[3,0]} />
                </Link>
              </Flex>
            </Flex>
            <Flex flexDirection={['column']} alignItems={['center','flex-end']} justifyContent={'flex-end'}>
              <Box mr={[0,3]} mb={[0,2]}>
                <Text color={'white'} textAlign={['center','right']}>Explore</Text>
              </Box>
              <Flex flexDirection={['column','row']}>
                <Link href="https://github.com/bugduino/idle" target="_blank">
                  <Image src="images/github.svg" height={'2em'} mx={[0,3]} my={[3,0]} />
                </Link>
                <Link href="https://etherscan.io/address/0x10cf8e1CDba9A2Bd98b87000BCAdb002b13eA525#code" target="_blank">
                  <Image src="images/etherscan.png" height={'2em'} mx={[0,3]} my={[3,0]} />
                </Link>
              </Flex>
            </Flex>
          </Flex>
        </Box>
      </Box>
    );
  }
}

export default Landing;
