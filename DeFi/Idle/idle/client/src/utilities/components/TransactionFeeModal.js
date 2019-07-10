import React from "react";
import { Heading, Text, Box, Flex, Icon } from "rimble-ui";

function TransactionFeeModal(props) {
  return (
    <Box>
      <Heading.h2 fontSize={[4, 5]}>Transaction fees</Heading.h2>
      <Text my={3} fontSize={[2, 3]}>
        You need to pay a fee to use the Ethereum blockchain. This pays for
        someone to process your transaction and store the data.
      </Text>
      <Heading.h4 fontSize={[2, 3]}>What are you paying for?</Heading.h4>
      <Flex flexDirection={['column', 'row']}
        justifyContent={"space-between"}
        my={[0, 4]}>
        <Box flex={'1 1'} width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
          <Flex justifyContent={"center"} mb={3}>
            <Icon
              name="Fingerprint"
              color="primary"
              size="4em"
            />
          </Flex>
          <Heading fontSize={2}>Undeniable proof</Heading>
          <Text fontSize={1}>
            You get a public record of any funds you send or receive, a bit like
            a deed for a house.
          </Text>
        </Box>
        <Box flex={'1 1'} width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
          <Flex justifyContent={"center"} mb={3}>
            <Icon
              name="EnhancedEncryption"
              color="primary"
              size="4em"
            />
          </Flex>
          <Heading fontSize={2}>Unbreakable encryption</Heading>
          <Text fontSize={1}>
            Your funds can only ever go to your intended recipients.
          </Text>
        </Box>
        <Box flex={'1 1'} width={1} mt={[3, 0]} mb={[4, 0]} mr={4}>
          <Flex justifyContent={"center"} mb={3}>
            <Icon
              name="AccountBalance"
              color="primary"
              size="4em"
            />
            <Icon
              name="NotInterested"
              color="primary"
              size="4em"
            />
          </Flex>
          <Heading fontSize={2}>Unparalleled control</Heading>
          <Text fontSize={1}>
            You can pay or get paid without using any banks or companies.
          </Text>
        </Box>
      </Flex>
    </Box>
  );
}

export default TransactionFeeModal;
