import React, { Component } from 'react';
import { Flex, Icon, Text, Heading } from 'rimble-ui'
// import styles from './Faquestion.module.scss';

class Faquestion extends Component {
  state = {
    isShowingAnswer: false
  };
  toggleAnswer(e) {
    e.preventDefault();
    this.setState(state => ({...state, isShowingAnswer: !state.isShowingAnswer}));
  };
  render() {
    return (
      <Flex
        pt={(this.props.pt || this.props.pt === 0) ? this.props.pt : [2, 4]}
        flexDirection={['column']}
        alignItems={'baseline'}
        justifyContent={'center'}>
        <Heading.h4
          fontFamily={'sansSerif'}
          style={{cursor: 'pointer'}}
          fontWeight={2}
          color={this.state.isShowingAnswer ? 'blue' : 'copyColor'}
          pt={(this.props.pt || this.props.pt === 0) ? this.props.pt : 2}
          pb={2}
          my={0}
          onClick={this.toggleAnswer.bind(this)}>
          <Flex alignItems={'center'}>
            <Icon
              name={this.state.isShowingAnswer ? 'Close' : 'Add'}
              color={this.state.isShowingAnswer ? 'blue' : 'copyColor'}
              size={"1.5em"}
              mr={[2]}
            />
            {this.props.question}
          </Flex>
        </Heading.h4>

        {this.state.isShowingAnswer &&
          <Text.p textAlign={'justify'} fontSize={[2,3]}>
            {this.props.answer}
          </Text.p>
        }
      </Flex>
    );
  }
}

export default Faquestion;
