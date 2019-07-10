import React, { Component } from 'react';
import { Link } from 'rimble-ui'
import styles from './MenuLink.module.scss';

class MenuLink extends Component {
  render() {
    return (
      <Link onClick={this.props.handleClick} className={[styles.link]} href={this.props.linkSrc} color={'white'} hoverColor={'white'} activeColor={'white'} fontSize={[3,4]} pr={[3,4]} fontWeight={2}>{this.props.linkText}</Link>
    );
  }
}

export default MenuLink;
