import React, { Component } from "react";
import { Form, Button, Message, Input } from "semantic-ui-react";
import Scheme from "../../../ethereum/scheme";
import web3 from "../../../ethereum/web3";
import { Link, Router } from "../../../routes";
import Layout from "../../../components/Layout";

 
class ClaimNew extends Component {

    state = {
        value: "",
        description: "",
        receipient: "",
        loading: false,
        errorMessage: ""
    }

    static async getInitialProps(props) {
        const { address } = props.query;
    
        return { address };
    }

    onSubmit = async (event) => {
        event.preventDefault();

        const scheme = Scheme(this.props.address); 
        const { description, value, receipient } = this.state;

        this.setState({ loading: true, errorMessage: "" });

        try {
            const accounts = await web3.eth.getAccounts();
            await ethereum.enable();

            await scheme.methods.submitClaim(
                    description, 
                    web3.utils.toWei(value, "ether"), 
                    receipient)
                .send({
                    from: accounts[0]
                });

            Router.replaceRoute(`/schemes/${this.props.address}/claims`);

        } catch (err) {
            this.setState({ errorMessage: err.message });
        }

        this.setState({ loading: false });
    };

    render() {
        return(
            <Layout>
                <Link route={`/schemes/${this.props.address}/claims`}>
                    <a>
                        <Button primary>Back</Button>
                    </a>
                </Link>
                <h3>Members submit their claims here.</h3>
                <Form onSubmit={this.onSubmit} error={!!this.state.errorMessage}>
                    <Form.Field>
                        <label>Description</label>
                        <Input 
                            value={this.state.description}
                            onChange={ event => this.setState({description: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Claim amount in Ether </label>
                        <Input 
                            value={this.state.value}
                            onChange={ event => this.setState({value: event.target.value })}
                        />
                    </Form.Field>

                    <Form.Field>
                        <label>Receipient address</label>
                        <Input 
                            value={this.state.receipient}
                            onChange={ event => this.setState({receipient: event.target.value })}
                        />
                    </Form.Field>

                    <Message error header="Oops" content={this.state.errorMessage} />
                    <Button primary loading={this.state.loading}>Claim!</Button>

                </Form>
            </Layout>
        );
    }
}

export default ClaimNew;