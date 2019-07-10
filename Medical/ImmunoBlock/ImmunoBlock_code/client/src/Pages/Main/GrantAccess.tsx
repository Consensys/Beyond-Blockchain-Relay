import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';


const GrantAccessContent = styled.div`
    @media (min-width: 1024px) {
        margin: 4% 20%;
    }
`;
interface IGrantAccessProps {
    uport: any;
    web3: any;
    registryQuizContract: any;
    userAccount: string;
    cookies: Cookies;
}
interface IGrantAccessStatus {
    grantAccessToDid: string;
}
class GrantAccess extends Component<IGrantAccessProps, IGrantAccessStatus> {

    constructor(props: any) {
        super(props);
        this.state = {
            grantAccessToDid: '',
        };
    }

    public handleGrantAccessChange = (event: any) => {
        this.setState({ grantAccessToDid: event.target.value });
    }

    public submitGrantAccess = (event: any) => {
        const { grantAccessToDid } = this.state;
        const { registryQuizContract, userAccount, cookies } = this.props;
        registryQuizContract.methods.grantAccess(cookies.get('did'), grantAccessToDid)
            .send({ from: userAccount })
            .on('receipt', (receipt: any) => {
                window.location.reload();
                // TODO: print a success message
            })
            .on('error', console.error);
        event.preventDefault();
    }

    public render() {
        const { grantAccessToDid } = this.state;
        const { cookies } = this.props;
        return (
            <GrantAccessContent>
                <form onSubmit={this.submitGrantAccess}>
                    <div className="field">
                        <h2 className="title is-2">Grant Access to</h2>
                        <div className="control">
                            <input
                                className="input"
                                placeholder="did"
                                type="text"
                                value={grantAccessToDid}
                                onChange={this.handleGrantAccessChange}
                            />
                        </div>
                    </div>
                    <div className="control">
                        <input className="button is-primary" disabled={cookies.get('did') === 'demo'} type="submit" />
                    </div>
                </form>
                <br />
                <br />
                <br />
                <br />
                <br />
                <h3 className="title is-3">Access Granted</h3>
                <ul>
                    <li>Not available yet!</li>
                </ul>
            </GrantAccessContent>
        );
    }
}

export default GrantAccess;
