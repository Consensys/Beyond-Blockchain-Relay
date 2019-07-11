import React, { Component } from "react";
import { Form, Button, Input, Message } from "semantic-ui-react";
import Layout from "../../components/Layout";
import factory from "../../ethereum/factory";
import web3 from "../../ethereum/web3";
import { Router } from "../../routes"

class SchemeNew extends Component {

    state = {
        minimumPremium: "",
        errorMessage: "",
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();

        this.setState({ loading: true, errorMessage: "" });

       try { 
            await ethereum.enable();
            const accounts = await web3.eth.getAccounts();

            //console.log(accounts);

            await factory.methods
                .createScheme(this.state.minimumPremium)
                .send({ from: accounts[0]});

            Router.pushRoute("/");

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    }
    
    render() {
        return(
            <Layout>
                <h3>Create your Scheme here</h3>

                <Form onSubmit={this.onSubmit} error = {!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Enter minimum Premium for your scheme</label>
                        <Input 
                            label="Wei" 
                            labelPosition="right"
                            placeholder = "Amount you want scheme members to pay to join"
                            value = {this.state.minimumPremium}
                            onChange = {
                                event => this.setState({ minimumPremium: event.target.value })
                            }
                        />
                        
                    </Form.Field>
                    
                    <Message error header="Ooops!" content={ this.state.errorMessage } />

                    <Button loading={this.state.loading} primary style={{marginTop : "5px"}}>Get started!</Button>
                </Form>

                

            </Layout>
        );
    }
}

export default SchemeNew;

