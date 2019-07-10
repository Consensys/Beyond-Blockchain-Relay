import React, { Component } from "react";
import { Button, Image, Flex, Text } from 'rimble-ui';
import styles from './CryptoButton.module.scss';

// export default function ImageTextBox(props) {
class CryptoButton extends Component {
  state = {
    selected: false
  };

  render() {
    return (
        <Button
          mainColor="white"
          contrastColor="#5e5e5e"
          borderRadius={2}
          mx={[2, 3]}
          my={[1]}
          fontSize={2}
          onClick={this.props.handleClick}
          className={[styles.button, this.props.isSelected && styles.button_selected]}>
            <Flex alignItems={'center'}>
              <Image mr={[2]} className={[styles.image]} src={'images/btn-'+this.props.label+'.svg'} />
              <Text.span className={[styles.text]}>{this.props.label.toUpperCase()}</Text.span>
            </Flex>
        </Button>
    );
  }
}
export default CryptoButton;
