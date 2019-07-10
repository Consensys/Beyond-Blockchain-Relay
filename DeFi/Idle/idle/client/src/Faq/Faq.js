import React, { Component } from 'react';
import { Box, Flex, Text, Heading } from 'rimble-ui'
// import styles from './Faq.module.scss';
import Faquestion from '../Faquestion/Faquestion';

class Faq extends Component {
  state = {
    selectedSection: 'general',
    generalQuestions: [
      {
        q: 'How does Idle work under the hood?',
        a: `Idle gathers data from different lending protocols, seeking the highest available interest rate. Your funds are put into an asset pool (managed by the underlying lending protocol), from there borrowers can use the funds in pool to open up a loan. Those borrowers pay interest into the fund, increasing the size of the fund. When you withdraw your funds, you are entitled to a proportional amount of the interest accrued.
        `
      },
      {
        q: 'How long do I have to use Idle to earn interest?',
        a: `You can use Idle for as short as one block; there are no requirements on how long an asset must be lended. Because interest accrues every block, you’re free to redeem your funds at any time.`
      },
      {
        q: 'Can you walk me through an example?',
        a: `When entering in Idle the best APR is automatically shown, and the best lending provider is already selected for you so if you decide to lend 1 DAI, you should only insert the amount and click on 'Start Lending'.
        We will forward your funds to the protocol offering the best rate, and gives you back tokens representing your position in such protocols.`
      }
    ],
    guidelinesQuestions: [
      {
        q: 'How do I get the supplied asset back?',
        a: `You can redeem your assets back using Idle at any time. You just have to connect your wallet and choose to redeem the assets. Idle will send the tokens lended and the interest earned back directly into your wallet.`
      },
      {
        q: 'How could you provide such APR?',
        a: `APR or annual percentage rate is the return users would get if they lend their funds for a year based off the current utilization ratio of the token debt reserve of the underlying protocol. In Idle, APR is the best annual percentage rate available between various lending providers. Because APR is variable, it changes for every block in the Ethereum blockchain and is influenced by money market fluctuations, it’s worth to highlight that future returns may not reflect the current expected returns.`
      },
      {
        q: 'What lending providers are integrated?',
        a: `We are currently integrated with Compound v2 and Fulcrum.`
      },
      {
        q: 'What assets can I lend?',
        a: `We currently support DAI only, but we plan to integrate other assets as well.`
      }
    ],
    ratesQuestions: [
      {
        q: 'Is Idle a non-custodial platform?',
        a: `Yes, we never have your direct tokens ownership, only our smart contract can move pool funds. When you lend assets in Idle, we forward them to the best lending protocol and give you back IdleTokens representing your position in such protocols, all in the same transaction.`
      },
      {
        q: 'Is Idle safe to use?',
        a: `Our contract have not been audited yet, but we are managing to get our smart contract audited as soon as possible. We're operating with different trustfully platforms and their smart contracts (all of them are audited and secured), our contract code is public and have been extensively tested, but the possibility of a bug always exists. Use at your own risk, it's beta software.`
      },
      {
        q: 'How does the decentralized rebalancing process work?',
        a: 'For every lend or redeem action, of every user, the smart contract checks if the pool needs to be rebalanced, in that case it liquidates the entire pool position from the protocol with the worst rate and opens up a position in the best one. If at anytime the rates offered by the protocols are changed and no interactions are made to the contract, then any user can choose to rebalance the pool on their own, rebalancing therefore the position of everyone. The more funds one has invested the more one should be incentivized in rebalancing.'
      }
    ]
  };
  setSection(section) {
    this.setState(state => ({...state, selectedSection: section}));
  }
  render() {
    const {generalQuestions, selectedSection, guidelinesQuestions, ratesQuestions} = this.state;
    const generalDivs = generalQuestions.map((question, i) => (
      <Faquestion key={`general-${i}`} question={question.q} answer={question.a} pt={i === 0 ? 0 : ''} />
    ));
    const guidelinesDivs = guidelinesQuestions.map((question, i) => (
      <Faquestion key={`guidelines-${i}`} question={question.q} answer={question.a} pt={i === 0 ? 0 : ''} />
    ));
    const ratesDivs = ratesQuestions.map((question, i) => (
      <Faquestion key={`rates-${i}`} question={question.q} answer={question.a} pt={i === 0 ? 0 : ''} />
    ));
    const isGeneralSelected = selectedSection === 'general';
    const isGuidelinesSelected = selectedSection === 'guidelines';
    const isRatesSelected = selectedSection === 'rates';
    return (
      <Flex
        flexDirection={['column']}>

        <Heading.h2 fontFamily={'sansSerif'} fontSize={[5,6]} textAlign={'center'} py={[4,5]} alignItems={'center'}>
          Faq
        </Heading.h2>

        <Flex
          flexDirection={['column', 'row']}
          justifyContent={["flex-start", "space-between"]}
        >
          <Flex width={[1,2/10]} px={[2,0]} flexDirection={['row', 'column']} justifyContent={['space-between', 'flex-start']}>
            <Text
              textAlign={'right'}
              fontSize={[3, 4]}
              mb={[1, 3]}
              color={isGeneralSelected ? 'blue' : 'copyColor'}
              onClick={() => this.setSection('general')}
              className={['pointer', isGeneralSelected ? 'selected' : '']}>
              General
            </Text>
            <Text
              textAlign={'right'}
              fontSize={[3, 4]}
              mb={[1, 3]}
              color={isGuidelinesSelected ? 'blue' : 'copyColor'}
              onClick={() => this.setSection('guidelines')}
              className={['pointer', isGuidelinesSelected ? 'selected' : '']}>
              Investors
            </Text>
            <Text
              textAlign={'right'}
              fontSize={[3, 4]}
              mb={[1, 3]}
              color={isRatesSelected ? 'blue' : 'copyColor'}
              onClick={() => this.setSection('rates')}
              className={['pointer', isRatesSelected ? 'selected' : '']}>
              Security
            </Text>
          </Flex>
          <Box width={[1,8/10]} mt={[3, 0]} mb={[4, 0]} mr={4} pl={[0,6]}>
            {isGeneralSelected && generalDivs}
            {isGuidelinesSelected && guidelinesDivs}
            {isRatesSelected && ratesDivs}
          </Box>
        </Flex>
      </Flex>
    );
  }
}

export default Faq;
