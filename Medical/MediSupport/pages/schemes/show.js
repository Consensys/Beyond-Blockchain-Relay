import React, { Component } from "react";
import Layout from "../../components/Layout";
import Scheme from "../../ethereum/scheme"
import { Card, Grid, Button } from "semantic-ui-react";
import web3 from "../../ethereum/web3";
import PremiumForm from "../../components/PremiumForm";
import { Link } from "../../routes";

class SchemeShow extends Component {

    static async getInitialProps(props) {
        const scheme = Scheme(props.query.address);

        const summary = await scheme.methods.getSummary().call();

        //console.log(summary);

        return {
            address: props.query.address,
            premium: summary[0],
            balance: summary[1],
            claimsCount : summary[2],
            memberCount: summary[3],
            admin: summary[4]
        };
        
    }

    renderCards() {

        const {
            balance,
            admin,
            premium,
            claimsCount,
            memberCount
        } = this.props;

        const items = [
            {
                header: admin,
                meta: "Address of scheme admin.",
                description: "Admin created this scheme.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: premium,
                meta: "Scheme premium (Wei).",
                description: "Mimumum required to join this scheme.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: claimsCount,
                meta: "Number of claims.",
                description: "Number of claims submitted to date.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: memberCount,
                meta: "Number of members.",
                description: "Number of people who are members of this scheme.",
                style: { overflowWrap: "break-word" }
            },
            {
                header: web3.utils.fromWei(balance, "ether"),
                meta: "Scheme balance (ether)",
                description: "Total amount of money contributed to this scheme."
            }
        ];

        return <Card.Group items={items} />
    }

    render() {
        return(
            (
                <Layout>
                    <h3>About this scheme</h3>
                    <Grid>
                        <Grid.Row>
                            <Grid.Column width={10}>
                                { this.renderCards() }
                                
                            </Grid.Column>
                    
                            <Grid.Column width={6}>
                                <PremiumForm address={this.props.address} />
                            </Grid.Column>
                        </Grid.Row>

                        <Grid.Row>
                            <Grid.Column width={3}>
                                <Link route={`/schemes/${this.props.address}/claims`}>
                                    <a>
                                        <Button primary>View Claims</Button>
                                    </a>
                                </Link> 
                            </Grid.Column>

                            <Grid.Column width={13} >
                                <Link route={`/schemes/${this.props.address}/claims/new`}>
                                    <a>
                                        <Button primary>Submit Claim</Button>
                                    </a>
                                </Link>
                            </Grid.Column>
                        </Grid.Row>
                    </Grid>
                </Layout>
            )
        );
    }
}

export default SchemeShow;