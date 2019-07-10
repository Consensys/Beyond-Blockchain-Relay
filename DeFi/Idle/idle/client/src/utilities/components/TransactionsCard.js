import React from "react";
import styled from 'styled-components'
import { Text, Table, Pill, Link, Flex } from "rimble-ui";

const TransactionTable = styled(Table)`
  & {
    display: block;
    width: 100%;
    overflow: auto;
    border-width: 0;
  }

  th,
  td {
    border: solid;
    border-width: 1px;
    border-color: inherit;
    padding: 0 1.5rem;
  }
`;

class TransactionsCard extends React.Component {
  // TODO store and retrieve past txs
  // this.state = {
  //   storedTxs: null
  // };
  //
  // componentDidMount() {
  //   const txs = this.props.transactions;
  //   const storedTxs = JSON.parse(localStorage.getItem('storedTxs'));
  //
  // }

  render() {
    let title = '';
    if (Object.keys(this.props.transactions).length < 1 && this.props.balance && parseFloat(this.props.balance) <= 0) {
      title = "No activity yet. Lend some assets to start a transaction. " ;
    } else if (Object.keys(this.props.transactions).length >= 1) {
      title = "Activities"
    }

    return (
      <Flex px={4} mx={'auto'} flexDirection={'column'}>
        <Text my={2} fontWeight={3} textAlign={"center"}>
          {title}
        </Text>

        <TransactionTable>
          <thead>
            {Object.keys(this.props.transactions).length > 0 ? (
              <tr>
                <th>Method</th>
                <th>Status</th>
                <th>Created</th>
                <th>Updated</th>
                <th>Confirmations</th>
                <th>txHash</th>
              </tr>
            ) : null}
          </thead>

          <tbody>
            {Object.keys(this.props.transactions).map((keyName, keyIndex) => {
              let txHash = "";
              if (this.props.transactions[keyName].transactionHash) {
                txHash = this.props.transactions[
                  keyName
                ].transactionHash.toString();
                // const txStart = txHash.substr(0, 7);
                // const txEnd = txHash.substr(txHash.length - 4);
                // txHash = txStart + "..." + txEnd;
              }

              let eventCreated = new Date(this.props.transactions[keyName].created);
              let eventUpdated = new Date(this.props.transactions[keyName].lastUpdated);
              const method = this.props.transactions[keyName].method;
              let humanMethod;

              switch (method) {
                case 'mintIdleToken':
                  humanMethod = 'Lend'
                  break;
                case 'redeemIdleToken':
                  humanMethod = 'Redeem'
                  break;
                default:
                  humanMethod = method;
              }
              const status = this.props.transactions[keyName].status;
              let color;
              switch (status) {
                case 'success':
                  color = 'green';
                  break;
                case 'error':
                  color = 'red';
                  break;
                default:
                  color = 'dark-gray';
              }
              return (
                <tr key={keyIndex}>
                  <td>
                    <code>
                      {humanMethod}
                    </code>
                  </td>
                  <td>
                    <Pill color={color}>
                      {status}
                    </Pill>
                  </td>
                  <td>
                    {eventCreated.toDateString()}
                  </td>
                  <td>
                    {eventUpdated.toTimeString()}
                  </td>
                  <td>
                    {this.props.transactions[keyName].confirmationCount}
                  </td>
                  <td>
                    <Link href={'https://etherscan.io/tx/'+txHash} target={'_blank'}>
                      {txHash}
                    </Link>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </TransactionTable>
      </Flex>
    );
  }
}

export default TransactionsCard;
