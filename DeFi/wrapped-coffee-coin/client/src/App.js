import React, { Component } from "react";
import getWeb3 from "./utils/getWeb3";
import CoffeeBatchNFT from "./contractAdapters/CoffeeBatchNFT";
import CoffeeTokenHandler from "./contractAdapters/CoffeeTokenHandler";
import Cooperative from "./contractAdapters/Cooperative";
import { Route } from "react-router-dom";
import { withRouter } from "react-router";
import { ThemeProvider } from "rimble-ui";
import { ToastMessage } from "rimble-ui";
import Header from "./components/Header";

import "./App.css";

class App extends Component {
  state = {
    allTokens: 0,
    storageValue: 0,
    web3: null,
    accounts: null,
    contract: null
  };

  componentDidMount = async () => {
    try {
      // Get network provider and web3 instance.
      const web3 = await getWeb3();
      // Use web3 to get the user's accounts.
      const accounts = await web3.eth.getAccounts();
      // Set web3, accounts, and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({
        web3,
        accounts
      });
    } catch (error) {
      // Catch any errors for any of the above operations.
      alert(
        `Failed to load web3, accounts, or contract. Check console for details.`
      );
      console.error(error);
    }
  };

  render() {
    if (!this.state.web3 || !this.state.accounts) {
      return <div>Loading Web3, accounts, and contract...</div>;
    } else {
      return (
        <div className="App">
            <h1>Wrapped Coffee coins</h1>
            <Header />

            <Route
                exact
                path="/"
                render={() => (
                  <CoffeeTokenHandler
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                  />
                )}
            />
            <Route
                exact
                path="/coffeeBatches/"
                render={() => (
                  <CoffeeBatchNFT
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                  />
                )}
            />
            <Route
                exact
                path="/cooperatives/"
                render={() => (
                  <Cooperative
                    web3={this.state.web3}
                    accounts={this.state.accounts}
                  />
                )}
            />
        </div>
      );
    }
  }
}

export default App;
