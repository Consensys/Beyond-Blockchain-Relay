import React, { Component } from "react";
import CoffeeBatchNFT from "../contracts/CoffeeBatchNFT.json";
import CoffeeTokenHandler from "../contracts/CoffeeTokenHandler.json";
import WrappedCoffeeCoin from "../contracts/WrappedCoffeeCoin.json";
import { Container, Row, Col, Table } from "reactstrap";
import AddCoffeeBatchForm from "../components/AddCoffeeBatchForm";
import AddCooperativeForm from "../components/AddCooperativeForm";
import ApproveForm from "../components/ApproveForm";
import UnwrapApproveForm from "../components/UnwrapApproveForm";

class CoffeeBatchNFTAdapter extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: null,
      coinContract: null,
      wrappedTokenHandlerAddress: "",
      coinAddress: "",
      coffeeStorage: [],
      ownedTokens: null
    };
  }

  componentDidMount = async () => {
    try {
      const { web3 } = this.state;
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CoffeeBatchNFT.networks[networkId];
      const contract_CoffeeBatch = new web3.eth.Contract(
        CoffeeBatchNFT.abi,
        deployedNetwork && deployedNetwork.address
      );
      const tokenHandlerNetwork = CoffeeTokenHandler.networks[networkId];
      const wrapped_TokenHandler = new web3.eth.Contract(
        CoffeeTokenHandler.abi,
        tokenHandlerNetwork && tokenHandlerNetwork.address
      );
      const coinNetwork = WrappedCoffeeCoin.networks[networkId];
      const coinContract = new web3.eth.Contract(
        WrappedCoffeeCoin.abi,
        coinNetwork && coinNetwork.address
      );

      this.setState({
        contract: contract_CoffeeBatch,
        coinContract: coinContract,
        coinAddress: coinContract._address,
        wrappedTokenHandlerAddress: wrapped_TokenHandler._address
      });
      await this.tokensOfOwner(this.state.accounts[0]);
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  createCoffeeBatch = async coffeeBatchPayload => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods
      .createCoffeeBatch(
        JSON.stringify(coffeeBatchPayload, null, 2),
        parseInt(coffeeBatchPayload.amount)
      )
      .send({ from: this.state.accounts[0] });
    this.setState({ coffeeStorage: coffeeStorage.push(coffeeBatchPayload) });
  };

  tokensOfOwner = async address => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods.tokensOfOwner(address).call();
    if (response) {
      let tokensWithBody = await Promise.all(
        response.map(async token => {
          return contract.methods.tokenURI(token).call();
        })
      );
      tokensWithBody = tokensWithBody.map(raw => JSON.parse(raw));
      console.log(
        "TCL: CoffeeBatchNFTAdapter -> tokensWithBody",
        tokensWithBody
      );
      this.setState({ ownedTokens: tokensWithBody });
    } else {
      this.setState({ ownedTokens: [] });
    }
  };

  approveToken = async approvePayload => {
    const { contract } = this.state;
    const response = await contract.methods
      .approve(
        this.state.wrappedTokenHandlerAddress,
        parseInt(approvePayload.tokenId)
      )
      .send({ from: this.state.accounts[0] });
  };

  unwrapApproveToken = async approvePayload => {
    const { coinContract } = this.state;

    const response = await coinContract.methods
      .approve(
        this.state.wrappedTokenHandlerAddress,
        parseInt(approvePayload.amount)
      )
      .send({ from: this.state.accounts[0] });
  };

  render() {
    console.log(
      "TCL: CoffeeBatchNFTAdapter -> render -> this.state.ownedTokens",
      this.state.ownedTokens
    );
    const handlerAddress = this.state.wrappedTokenHandlerAddress;
    const coindAddress = this.state.coinAddress;

    return (
      <Container>
        <Row>
          <Col>
            <AddCoffeeBatchForm onCoffeeBatchAdd={this.createCoffeeBatch} />
          </Col>
        </Row>
        <Row>
          {this.state.ownedTokens ? (
            <div>
              <h3>Owned Tokens:</h3>
              <OwnedTokens items={this.state.ownedTokens} />
            </div>
          ) : null}
        </Row>
        <Row>
          <Col>
            <ApproveForm
              onApprove={this.approveToken}
              handlerAddress={handlerAddress}
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <UnwrapApproveForm
              onApprove={this.unwrapApproveToken}
              handlerAddress={handlerAddress}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

const OwnedTokens = props => (
  <Table>
    <thead>
      <tr>
        <th>Producer</th>
        <th>Amount</th>
        <th>Description</th>
      </tr>
    </thead>
    <tbody>
      {props.items.map((item, idx) => (
        <tr key={idx}>
          <td>{item.producer}</td>
          <td>{item.amount}</td>
          <td>{item.description}</td>
        </tr>
      ))}
    </tbody>
  </Table>
);

export default CoffeeBatchNFTAdapter;
