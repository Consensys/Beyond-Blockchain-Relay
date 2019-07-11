import React, { Component } from "react"
import { Table, Button } from "semantic-ui-react";
import web3 from "../ethereum/web3"
import Scheme from "../ethereum/scheme";

class ClaimRow extends Component {

    onApprove = async () => {
        const scheme = Scheme(this.props.address);
        await ethereum.enable();
        const accounts = await web3.eth.getAccounts();

        await scheme.methods.approveClaim(this.props.id).send({
            from: accounts[0]
        });
    }
    //finalizeClaim(uint index)
    onFinalize = async () => {
        const scheme = Scheme(this.props.address);
        await ethereum.enable();
        const accounts = await web3.eth.getAccounts();

        await scheme.methods.finalizeClaim(this.props.id).send({
            from: accounts[0]
        });
    }

    render() {
        const { Row, Cell } = Table;
        const { id, claim, memberCount } = this.props;
        const canBeFinalized = claim.approvalCount > memberCount / 2;

        return(
            <Row disabled={claim.complete} positive={canBeFinalized && !claim.complete}>
                <Cell>{id}</Cell>
                <Cell>{claim.description}</Cell>
                <Cell>{web3.utils.fromWei(claim.amount, "ether")}</Cell>
                <Cell>{claim.claimer}</Cell>
                <Cell>{claim.approvalCount}/{memberCount}</Cell>
                <Cell>
                    { claim.complete ? null : 
                       ( 
                            <Button color="green" basic onClick={this.onApprove}>
                                Approve
                            </Button>
                        )
                    }
                </Cell>
                <Cell>
                    { claim.complete ? null : 
                        (
                            <Button color="teal" basic onClick={this.onFinalize}>
                                Finalize
                            </Button>
                        )
                    }
                </Cell>

            </Row>
        );
    }
}

export default ClaimRow;