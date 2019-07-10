import React, { Component } from "react";
import { Heading, Box, Flex, Form, Button, Image } from 'rimble-ui'
import styles from './CryptoInput.module.scss';

class CryptoInput extends Component {
  render() {
    return (
        <>
          <Flex
            className={[styles.mainInputContainer]}
            maxWidth={['90%','40em']}
            borderRadius={'2rem'}
            border={'1px solid'}
            borderColor={'#ccc'}
            p={0}
            my={['0','1em']}
            mx={'auto'}
            >
              <Box width={[1/10]}>
                <Image src="images/btn-dai.svg" height={this.props.height} m={['0.5em','1em']} />
              </Box>
              <Box width={[6/10]}
                pt={[0,'0.5em']}>
                <Form.Input
                  style={{
                    paddingLeft:'0.5em'
                  }}
                  placeholder={`Enter DAI Amount`}
                  value={this.props.defaultValue}
                  type="number"
                  borderRadius='2rem'
                  border='0'
                  borderColor='transparent'
                  boxShadow='none !important'
                  min={0}
                  height={this.props.height}
                  step={0.01}
                  fontSize={[3,4]}
                  width={'100%'}
                  bg={'transparent'}
                  color={this.props.color}
                  className={[styles.mainInput]}
                  onChange={this.props.handleChangeAmount}
                />
              </Box>
              <Box display={['none','block']} width={3/10}>
                <Button onClick={this.props.handleClick} className={[styles.button]} size={'large'} mainColor={'blue'} fontWeight={2} fontSize={[2,3]} px={[4,5]} my={0} width={1}>LEND</Button>
              </Box>
              <Box display={['block','none']} width={3/10}>
                <Button onClick={this.props.handleClick} className={[styles.button]} size={'medium'} mainColor={'blue'} fontWeight={2} fontSize={[2,3]} px={[2,3]} my={0} width={1}>LEND</Button>
              </Box>
          </Flex>
          <Flex justifyContent={'center'}>
            <Heading.h5 color={'darkGray'} fontWeight={1} fontSize={1} textAlign={'center'}>
              *This is beta software. Use at your own risk.
            </Heading.h5>
          </Flex>
        </>
    );
  }
}
export default CryptoInput;
