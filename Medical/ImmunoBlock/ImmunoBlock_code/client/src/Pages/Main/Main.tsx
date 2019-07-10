import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';
import Web3 from 'web3';

import Navbar from '../../Components/Navbar/Navbar';
import getUport from '../../utils/getUport';
import './main.css';
import Quiz from './Quiz';
import Statistics from './Statistics';
import Welcome from './Welcome';

import RegistryQuiz from '../../contracts/RegistryQuiz.json';
import GrantAccess from './GrantAccess';

const networkID: string = process.env.REACT_APP_NETWORK_ID === undefined ? '3' : process.env.REACT_APP_NETWORK_ID;
const MainContent = styled.div`
    font-family: 'Maven Pro', sans-serif;
    text-align: center;
    margin: 4% 10%;
`;

interface IMainState {
    currentView: string;
    uport: any;
    web3: any;
    loggedIn: boolean;
    userAccount: string;
    registryQuizContract: any;
    cookies: Cookies;
}
class Main extends Component<{}, IMainState> {
    /**
     * @ignore
     */
    constructor(props: any) {
        super(props);
        const cookies = new Cookies();
        const uport = getUport();
        const web3 = new Web3((window as any).ethereum);
        let loggedIn = false;
        uport.loadState();
        if (cookies.get('did') !== undefined) {
            if (cookies.get('did') !== 'demo') {
                (window as any).ethereum.enable();
            }
            loggedIn = true;
        }
        this.state = {
            cookies: new Cookies(),
            currentView: 'main',
            loggedIn,
            registryQuizContract: undefined as any,
            uport,
            userAccount: '',
            web3,
        };
    }

    public componentWillMount = () => {
        const { web3 } = this.state;
        if (web3 !== undefined) {
            web3.eth.getAccounts().then((a: string[]) => {
                const networks = RegistryQuiz.networks as any;
                const registryQuizContract = new web3.eth
                    .Contract(RegistryQuiz.abi, networks[networkID].address);
                this.setState({ userAccount: a[0], registryQuizContract });
            });
        }
    }

    public handleClick = (event: any) => {
        this.setState({ currentView: event.currentTarget.dataset.tag });
    }

    /**
     * @ignore
     */
    public render() {
        const { currentView, uport, loggedIn, web3, userAccount, registryQuizContract, cookies } = this.state;
        let pageContent;
        if (!loggedIn) {
            pageContent = <Welcome
                cookies={cookies}
                userAccount={userAccount}
                registryQuizContract={registryQuizContract}
                uport={uport}
                web3={web3}
            />;
        } else {
            if (currentView === 'quiz') {
                pageContent = <Quiz
                    cookies={cookies}
                    uport={uport}
                    web3={web3}
                    registryQuizContract={registryQuizContract}
                    userAccount={userAccount}
                />;
            } else if (currentView === 'statistics') {
                pageContent = <Statistics />;
            } else if (currentView === 'grantaccess') {
                pageContent = <GrantAccess
                    cookies={cookies}
                    uport={uport}
                    web3={web3}
                    registryQuizContract={registryQuizContract}
                    userAccount={userAccount}
                />;
            } else {
                pageContent = this.loadMainCards();
            }
        }
        return (
            <>
                <Navbar uport={uport} cookies={cookies} />
                <MainContent>
                    {pageContent}
                </MainContent>
            </>
        );
    }

    private loadMainCards() {
        return (
            <table>
                <tbody>
                    <tr>
                        <td data-tag="quiz" onClick={this.handleClick}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img
                                            src="https://bulma.io/images/placeholders/1280x960.png"
                                            alt="placeholder quiz"
                                        />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <strong>Answer Quiz</strong>.
                                    <br />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td data-tag="grantaccess" onClick={this.handleClick}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img
                                            src="https://bulma.io/images/placeholders/1280x960.png"
                                            alt="placeholder access"
                                        />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <strong>Grant Access</strong>.
                                    <br />
                                    </div>
                                </div>
                            </div>
                        </td>
                        <td data-tag="statistics" onClick={this.handleClick}>
                            <div className="card">
                                <div className="card-image">
                                    <figure className="image is-4by3">
                                        <img
                                            src="https://bulma.io/images/placeholders/1280x960.png"
                                            alt="placeholder statistics"
                                        />
                                    </figure>
                                </div>
                                <div className="card-content">
                                    <div className="content">
                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Phasellus nec iaculis mauris. <strong>View Statistics</strong>.
                                    <br />
                                    </div>
                                </div>
                            </div>
                        </td>
                    </tr>
                </tbody>
            </table>
        );
    }
}

export default Main;
