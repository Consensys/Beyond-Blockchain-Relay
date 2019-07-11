import React, { Component } from "react";
import CoffeeTokenHandlerContract from "../contracts/CoffeeTokenHandler.json";
import WrappedCoffeeCoin from "../contracts/WrappedCoffeeCoin.json";
import { Container, Row, Col, Table } from "reactstrap";
import AdminForm from "../components/AdminForm";

class CoffeeTokenHandler extends Component {
  constructor(props) {
    super(props);
    this.state = {
      web3: props.web3,
      accounts: props.accounts,
      contract: null,
      coffeeStorage: [],
      ownedTokens: null,
      wrappedContractAddress: ""
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

      this.setState({
        contract: contract_TokenHandler,
        wrappedContractAddress: wrapped_TokenHandler._address
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

  render() {
    return (
      <Container>
        <Row>
          <Col>
            <AdminForm
              updateHandlerERC20={this.updateHandlerERC20}
              wrappedContractAddress={this.state.wrappedContractAddress}
            />
          </Col>
        </Row>
      </Container>
    );
  }
}

export default CoffeeTokenHandler;
