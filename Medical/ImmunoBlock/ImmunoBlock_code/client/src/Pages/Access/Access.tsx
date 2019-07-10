import Cryptr from 'cryptr';
import ipfsClient from 'ipfs-http-client';
import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import Web3 from 'web3';

import Navbar from '../../Components/Navbar/Navbar';
import getUport from '../../utils/getUport';

import RegistryQuiz from '../../contracts/RegistryQuiz.json';


const networkID: string = process.env.REACT_APP_NETWORK_ID === undefined ? '3' : process.env.REACT_APP_NETWORK_ID;
const cryptr = new Cryptr(process.env.REACT_APP_CRYPTR_KEY === undefined ? 'abc' : process.env.REACT_APP_CRYPTR_KEY);
const ipfs = ipfsClient({
    host: process.env.REACT_APP_IPFS_HOST,
    port: process.env.REACT_APP_IPFS_PORT,
    protocol: process.env.REACT_APP_IPFS_PROTOCOL,
});
const MainContent = styled.div`
    font-family: 'Maven Pro', sans-serif;
    text-align: center;
    margin: 4% 10%;
`;

interface IMainState {
    uport: any;
    web3: any;
    userAccount: string;
    registryQuizContract: any;
    result: string;
    cookies: Cookies;
}
class Main extends Component<{ match: { params: { patientdid: string } } }, IMainState> {
    /**
     * @ignore
     */
    constructor(props: any) {
        super(props);
        const cookies = new Cookies();
        const uport = getUport();
        const web3 = new Web3((window as any).ethereum);
        uport.loadState();
        if (cookies.get('did') === undefined) {
            window.location.href = '/';
        }
        (window as any).ethereum.enable();
        this.state = {
            cookies: new Cookies(),
            registryQuizContract: undefined as any,
            result: '',
            uport,
            userAccount: '',
            web3,
        };
    }

    public componentDidMount = () => {
        const { web3, cookies } = this.state;
        web3.eth.getAccounts().then(async (a: string[]) => {
            const networks = RegistryQuiz.networks as any;
            const registryQuizContract = new web3.eth
                .Contract(RegistryQuiz.abi, networks[networkID].address);
            //
            const { match: { params } } = this.props;
            if (params.patientdid !== undefined) {
                const access = await registryQuizContract.methods
                    .accessPatientQuiz(cookies.get('did'), params.patientdid).call();
                const quiz = await ipfs.cat(cryptr.decrypt(access));
                this.setState({
                    result: JSON.parse(cryptr.decrypt(quiz.toString())).answers,
                });
            }
            this.setState({ userAccount: a[0], registryQuizContract });
        });
    }

    /**
     * @ignore
     */
    public render() {
        const { uport, result, cookies } = this.state;
        return (
            <>
                <Navbar uport={uport} cookies={cookies} />
                <MainContent>
                    {JSON.stringify(result)}
                </MainContent>
            </>
        );
    }
}

export default Main;
