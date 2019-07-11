import React, { Component } from "react";
import CoffeeTokenHandlerContract from "../contracts/CoffeeTokenHandler.json";
import WrappedCoffeeCoin from "../contracts/WrappedCoffeeCoin.json";
import { Container, Row, Col, Table } from "reactstrap";
import AddCooperativeForm from "../components/AddCooperativeForm";
import WrapCoffeeForm from "../components/WrapCoffeeForm";
import UnwrapCoffeeForm from "../components/UnwrapCoffeeForm";


class Cooperative extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: null,
      coffeeStorage: [],
      ownedTokens: null,
      wrappedContractAddress: "",
      isCooperative: false
    };
  }

  componentDidMount = async () => {
    try {
      const { web3 } = this.state;
      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = CoffeeTokenHandlerContract.networks[networkId];
      const contract_TokenHandler = new web3.eth.Contract(
        CoffeeTokenHandlerContract.abi,
        deployedNetwork && deployedNetwork.address
      );
      const wrapperNetwork = WrappedCoffeeCoin.networks[networkId];
      const wrapped_TokenHandler = new web3.eth.Contract(
        WrappedCoffeeCoin.abi,
        wrapperNetwork && wrapperNetwork.address
      );

      const isCooperative = await contract_TokenHandler.methods.isCooperative(this.state.accounts[0]).call();

      this.setState({
        contract: contract_TokenHandler,
        wrappedContractAddress: wrapped_TokenHandler._address,
        isCooperative: isCooperative
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  updateHandlerERC20 = async payload => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods
      .setERC20TokenContract(payload.wrapperAddress)
      .send({ from: this.state.accounts[0] });
  };

  addCooperative = async cooperativePayload => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods
      .addCooperative(cooperativePayload.cooperativeAddress)
      .send({ from: this.state.accounts[0] });
  };

  wrapCoffee = async wrapCoffeePayload => {
    const { contract, coffeeStorage } = this.state;
    console.log('account: ' + this.state.accounts[0]);
    console.log('Producer address: ' + wrapCoffeePayload.address);
    console.log('Token Id: ' + wrapCoffeePayload.tokenId);

    const response = await contract.methods
      .wrapCoffee(wrapCoffeePayload.address, wrapCoffeePayload.tokenId )
      .send({ from: this.state.accounts[0] });
  };

  unwrapCoffee = async unwrapCoffeePayload => {
    const { contract, coffeeStorage } = this.state;
    const response = await contract.methods
      .unwrapCoffee(unwrapCoffeePayload.address, unwrapCoffeePayload.tokenId, unwrapCoffeePayload.amount)
      .send({ from: this.state.accounts[0] });
  };

  render() {
    console.log('ES Cooperativa: ' + this.state.isCooperative);

    return (
      <Container>
        <Row>
          <Col>
            <AddCooperativeForm onCooperativeAdd={this.addCooperative} />
          </Col>
        </Row>
        <Row><br/></Row>
        <Row>
          <Col>
            <WrapCoffeeForm onWrapCoffee={this.wrapCoffee} />
          </Col>
        </Row>
        <Row>
          <Col>
            <UnwrapCoffeeForm onUnwrapCoffee={this.unwrapCoffee} />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default Cooperative;