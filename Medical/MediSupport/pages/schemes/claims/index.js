import React, { Component } from "react";
import { Button, Table } from "semantic-ui-react";
import { Link } from "../../../routes";
import Layout from "../../../components/Layout"
import Scheme from "../../../ethereum/scheme";
import ClaimRow from "../../../components/ClaimRow";

class ClaimIndex extends Component {

    
    state = {
        value: "",
        description: "",
        receipient: "",
        loading: false,
        errorMessage: ""
    }

    static async getInitialProps(props) {
        const { address } = props.query;
        const scheme = Scheme(address);

        const claimsCount = await scheme.methods.getClaimsCount().call();
        const memberCount = await scheme.methods.memberCount().call();

        const claims  =  await Promise.all(
            Array(claimsCount).fill().map((element, index) => {
                return scheme.methods.claims(index).call();
            })
        );

        return { address, claims, claimsCount, memberCount };
    }

    renderRow() {
        return this.props.claims.map((claim, index) => {
            return <ClaimRow 
                        key={index}
                        id={index}
                        claim={claim}
                        address={this.props.address}
                        memberCount={this.props.memberCount}
                    />;
        })
    }

    render() {

        const { Header, Row, HeaderCell, Body } = Table;

        return(
            <Layout>
                <h3>Claims list</h3>
                <Link route={`/schemes/${this.props.address}/claims/new`}>
                    <a>
                        <Button primary floated="right" style={{ marginBottom: 10 }}>Claim here</Button>
                    </a>
                </Link>

                <Table>
                    <Header>
                        <Row>
                            <HeaderCell>ID</HeaderCell>
                            <HeaderCell>Description</HeaderCell>
                            <HeaderCell>Amount (in Ether)</HeaderCell>
                            <HeaderCell>Receipient</HeaderCell>
                            <HeaderCell>Approval Count</HeaderCell>
                            <HeaderCell>Approve</HeaderCell>
                            <HeaderCell>Finalize</HeaderCell>
                        </Row>
                    </Header>
                    <Body>
                        {this.renderRow()}
                    </Body>
                </Table>
                <div>Found {this.props.claimsCount} claims.</div>
            </Layout>
        );
    }
}

export default ClaimIndex;

