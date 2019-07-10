import React, { Component } from 'react';
import { UPortButton } from 'rimble-ui';
import Cookies from 'universal-cookie';
import ConsenSysLogo from './consensys_logo.png';


interface IWelcomeProps {
    web3: any;
    uport: any;
    registryQuizContract: any;
    userAccount: string;
    cookies: Cookies;
}
class Welcome extends Component<IWelcomeProps, {}> {

    public loginWithUPort = (event: any) => {
        const { uport, registryQuizContract, userAccount, cookies, web3 } = this.props;
        // Request credentials to login
        const req = {
            notifications: true,
            requested: ['name', 'country'],
        };
        uport.requestDisclosure(req);
        uport.onResponse('disclosureReq').then(async (disclosureReq: any) => {
            //
            uport.sendVerification({
                claim: { User: { Signed: new Date() } },
            });
            //
            let account = userAccount;
            if (userAccount.length < 1) {
                const accounts = await web3.eth.getAccounts();
                account = accounts[0];
            }
            await (window as any).ethereum.enable();
            await registryQuizContract.methods.signupUser(disclosureReq.payload.did)
                .send({ from: account });
            cookies.set('did', disclosureReq.payload.did, { path: '/' });
            window.location.reload();
        });
        event.preventDefault();
    }

    public loginDemo = (event: any) => {
        const { cookies } = this.props;
        cookies.set('did', 'demo', { path: '/' });
        window.location.reload();
        event.preventDefault();
    }

    /**
     * @ignore
     */
    public render() {
        return (<>
            <img src={ConsenSysLogo} alt="consensys-logo" />
            <h2 className="title is-2">Autoimmune Disease Registry</h2>
            <p>
                Welcome to the Global Autoimmune Tracking Repository
            </p>
            <p>
                Created as part of the:
                <a
                    href="https://gitcoin.co/issue/ConsenSys/Beyond-Blockchain-Relay/3/3158"
                >
                    Beyond Blockchain Hackathon
                </a>
                .
            </p>
            <br />
            <UPortButton.Solid onClick={this.loginWithUPort}>Connect with uPort</UPortButton.Solid>
            <br />
            <br />
            <button className="button is-primary" onClick={this.loginDemo}>Try with demo account</button>
            <br />
            <br />
            <h2 className="title is-2">Learn More</h2>
            <p>
                <a href="#">About The Project</a>
                &ensp;&ensp;&ensp;
                <a href="http://gitcoin.co/issue/ConsenSys/Beyond-Blockchain-Relay/3/3158">About Gitcoin</a>
            </p>
        </>);
    }
}

export default Welcome;
