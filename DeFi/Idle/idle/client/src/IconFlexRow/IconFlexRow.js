import React, { Component } from 'react';
import { Flex,Box,Image,Link,Text } from 'rimble-ui'
import styles from './IconFlexRow.module.scss';

class IconFlexRow extends Component {
  state = {
  };
  render() {
    return (
      <Flex className={[styles.box]} flexDirection={['column','row']} alignItems={'center'} py={['1em','2em']}>
      	<Flex flexDirection={'column'} alignItems={'center'} width={[1,2/9]}>
      		<Image src={this.props.image} />
      	</Flex>
      	<Box width={[1,4/9]} pl={['0','4em']} pr={['0','4em']}>
      		<Text textAlign={['center','left']} fontFamily={'sansSerif'} color={'black'} fontSize={[3,5]}>{this.props.title}</Text>
      	</Box>
      	<Box width={[1,3/9]}>
      		<Text textAlign={['center','right']}>
      			<Link onClick={this.props.handleClick} color={'blue'} hoverColor={'blue'} fontSize={[3,4]} fontWeight={1} className={[styles.link]} href={this.props.linkHref}>{this.props.linkText}</Link>
      		</Text>
      	</Box>
      </Flex>
    );
  }
}

export default IconFlexRow;
