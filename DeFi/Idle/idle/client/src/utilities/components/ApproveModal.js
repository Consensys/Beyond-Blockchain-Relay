import React from "react";
import {
  Heading,
  Text,
  Modal,
  Box,
  Button,
} from "rimble-ui";
import ModalCard from './ModalCard';

export default function ApproveModal(props) {
  const { isOpen, closeModal, onClick, tokenName, baseTokenName } = props;
  const isRedeeming = tokenName.charAt(0) === 'c';

  return (
    <Modal isOpen={isOpen}>
      <ModalCard closeFunc={closeModal}>
        <ModalCard.Body>
          <Box mt={3} mb={3}>
            <Heading color={'black'} fontSize={[4, 5]}>Enabling {tokenName} tokens</Heading>
            <Text fontSize={[2, 3]} my={3}>
              What it means?
            </Text>
            <Text fontSize={1}>
              Currently {tokenName} tokens are in your wallet and you are the one and only owner of them.
            </Text>
            <Text fontSize={1}>
              By clicking on ENABLE you are allowing the Idle contract to actually
              move {tokenName} on your behalf so we can forward them on various lending protocols.
            </Text>
            <Text fontSize={[2, 3]} my={3}>You need to enable {tokenName} tokens to:</Text>
            <Text fontSize={1}>
              <ul>
                {isRedeeming ?
                  <li>Redeem {baseTokenName} plus interest</li>:
                  <li>Lend {tokenName} tokens</li>
                }
              </ul>
            </Text>
          </Box>
        </ModalCard.Body>

        <ModalCard.Footer>
          <Button
            onClick={onClick}
            borderRadius={4}>
            ENABLE {tokenName}
          </Button>
        </ModalCard.Footer>
      </ModalCard>
    </Modal>
  );
}
