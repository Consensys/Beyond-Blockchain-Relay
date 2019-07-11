import React, { Component } from "react";
import { Form, Input, Message, Button } from "semantic-ui-react";
import Scheme from "../ethereum/scheme";
import web3 from "../ethereum/web3";
import { Router } from "../routes";

class PremiumForm extends Component {

    state = {
        value: "",
        name:"",
        errorMessage: "",
        loading: false
    }

    onSubmit = async (event) => {
        event.preventDefault();
        
        const scheme = Scheme(this.props.address);

        this.setState({ loading: true, errorMessage: "" });


        try {
            const accounts = await web3.eth.getAccounts();
            await ethereum.enable();
            await scheme.methods.contribute(this.state.name).send({
                from: accounts[0],
                value: web3.utils.toWei(this.state.value, "ether")
            });

            Router.replaceRoute(`/schemes/${this.props.address}`);
        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false, value: "" , name:""});
    }

    render() {
        return(
            <Form onSubmit={this.onSubmit} error={ !!this.state.errorMessage }>

                <Form.Field>
                    <label>Enter your name here to join</label>
                    <Input
                        value={ this.state.name }
                        onChange={ event => this.setState({ name: event.target.value }) }
                    />
                </Form.Field>

                <Form.Field>
                    <label>Enter Premium</label>
                    <Input
                        value={ this.state.value }
                        onChange={ event => this.setState({ value: event.target.value }) }
                        label="ether" 
                        labelPosition="right"
                    />
                </Form.Field>

                <Message error header="Ooop!" content={this.state.errorMessage} />
                <Button primary loading={ this.state.loading }>
                    Pay Premium!
                </Button>
            </Form>
        );
    }
}

export default PremiumForm;