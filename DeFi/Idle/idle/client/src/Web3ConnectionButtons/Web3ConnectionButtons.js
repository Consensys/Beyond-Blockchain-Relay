import React from 'react'
import { useWeb3Context } from 'web3-react'
import { Button, Image, Box, Text } from 'rimble-ui';
import connectors from '../App/connectors';
import GeneralUtil from "../utilities/GeneralUtil";
import styles from './Web3ConnectionButtons.module.scss';

export default function Web3ConnectionButtons(props) {
  const context = useWeb3Context()
  const size = props.size || 'large';

  if (!context.active && !context.error) {
    // loading
    console.log('context loading', context);
  } else if (context.error) {
    console.log('context error', context);
    // error
  } else {
    console.log('context success', context);
    // success
  }
  const setConnector = async connectorName => {
    return await context.setConnector(connectorName)
  };
  const isMetamask = GeneralUtil.hasMetaMask();
  const isOpera = GeneralUtil.isOpera();

  const buttons = Object.keys(connectors).map(connectorName => {
    switch (connectorName) {
      case 'Injected':
        if (isMetamask || isOpera) {
          let name = 'Metamask';
          if (isOpera) {
            name = 'Opera';
          }

          return (
            <Button.Outline
              className={[styles.button]}
              display={'flex'}
              alignItems={'center'}
              mb={[1, 3]}
              width={[1, 1/2]}
              key={connectorName}
              disabled={context.connectorName === connectorName}
              size={size}
              onClick={async () => await setConnector(connectorName)}>
              <Image
                display={'inline-flex'}
                mr={'0.5rem'}
                mb={'-0.2rem'}
                src={`images/${name.toLowerCase()}.svg`}
                alt={name.toLowerCase()}
                width={'1.2rem'}
                height={'1.2rem'}
              />
              Connect with {name}
            </Button.Outline>
          )
        } else {
          return (
            <Button.Outline
              className={[styles.button]}
              width={[1, 1/2]}
              mb={[1, 3]}
              key={connectorName}
              disabled={context.connectorName === connectorName}
              size={size}
              onClick={async () => await setConnector(connectorName)}>
              Connect
            </Button.Outline>
          )
        }
      default:
        return (
          <Button.Outline
            className={[styles.button]}
            mb={[1, 3]}
            width={[1, 1/2]}
            size={size}
            key={connectorName}
            disabled={context.connectorName === connectorName}
            onClick={async () => await setConnector(connectorName)}
          >
            <Image
              display={'inline-flex'}
              mr={'0.5rem'}
              mb={'-0.2rem'}
              src={`images/${connectorName.toLowerCase()}.svg`}
              alt={connectorName.toLowerCase()}
              width={'1.2rem'}
              height={'1.2rem'}
            />
            Connect with {connectorName}
          </Button.Outline>
        );
    }
  });

  return (
    <Box width={[1]}>
      {context.error && (
        <Text.p>An error occurred, check the console for details.</Text.p>
      )}
      {buttons}
      {(context.active || (context.error && context.connectorName)) && (
        <Button.Outline
          className={[styles.button]}
          mt={2} onClick={async () => await context.unsetConnector()}>
          {context.active ? "Deactivate Connector" : "Reset"}
        </Button.Outline>
      )}
    </Box>
  );
}
