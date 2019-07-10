import Cryptr from 'cryptr';
import ipfsClient from 'ipfs-http-client';
import React, { Component } from 'react';
import styled from 'styled-components';
import Cookies from 'universal-cookie';


const cryptr = new Cryptr(process.env.REACT_APP_CRYPTR_KEY === undefined ? 'abc' : process.env.REACT_APP_CRYPTR_KEY);
const ipfs = ipfsClient({
    host: process.env.REACT_APP_IPFS_HOST,
    port: process.env.REACT_APP_IPFS_PORT,
    protocol: process.env.REACT_APP_IPFS_PROTOCOL,
});
const QuizFrame = styled.div`
    @media (min-width: 1024px) {
        padding: 0% 25%;
    }
`;
const DisclaimerFrame = styled.div`
    @media (min-width: 1024px) {
        padding: 0% 10%;
    }
`;

interface IQuizProps {
    uport: any;
    web3: any;
    registryQuizContract: any;
    userAccount: string;
    cookies: Cookies;
}
interface IQuizState {
    editing: boolean;
    quizAnswers: string[];
}
class Quiz extends Component<IQuizProps, IQuizState> {
    /**
     * @ignore
     */
    constructor(props: any) {
        super(props);
        this.state = {
            editing: false,
            quizAnswers: ['0', '', '', '', '', '', '', ''],
        };
    }

    public componentDidMount = () => {
        const { registryQuizContract, cookies } = this.props;
        const did = cookies.get('did');
        if (did !== 'demo') {
            registryQuizContract.methods.hasQuiz(did)
                .call().then(async (has: boolean) => {
                    if (has === true) {
                        const path = await registryQuizContract.methods.getQuiz(did).call();
                        const quiz = await ipfs.cat(cryptr.decrypt(path));
                        this.setState({
                            editing: true,
                            quizAnswers: JSON.parse(cryptr.decrypt(quiz.toString())).answers,
                        });
                    }
                });
        }
    }

    public handleChange = (event: any) => {
        const { quizAnswers } = this.state;
        if (event.target.name === 'qA-0') {
            quizAnswers[0] = event.target.value;
        } else if (event.target.name === 'qA-1') {
            quizAnswers[1] = event.target.value;
        } else if (event.target.name === 'qA-2') {
            quizAnswers[2] = event.target.value;
        } else if (event.target.name === 'qA-3') {
            quizAnswers[3] = event.target.value;
        } else if (event.target.name === 'qA-4') {
            quizAnswers[4] = event.target.value;
        } else if (event.target.name === 'qA-5') {
            quizAnswers[5] = event.target.value;
        } else if (event.target.name === 'qA-6') {
            quizAnswers[6] = event.target.value;
        } else if (event.target.name === 'qA-7') {
            quizAnswers[7] = event.target.value;
        }
        this.setState({ quizAnswers });
    }

    public handleSubmit = (event: any) => {
        const { userAccount, registryQuizContract, cookies } = this.props;
        const { quizAnswers } = this.state;
        const did = cookies.get('did');
        if (did !== 'demo') {
            const jsonResult = {
                answers: quizAnswers,
                date: new Date(),
            };
            // add content to ipfs
            const content = ipfsClient.Buffer.from(cryptr.encrypt(JSON.stringify(jsonResult)));
            ipfs.add(content).then((results: [{ path: string }]) => {
                // save the content address in ethereum
                registryQuizContract.methods.uploadQuiz(did, cryptr.encrypt(results[0].path))
                    .send({ from: userAccount })
                    .on('receipt', (receipt: any) => {
                        window.location.reload();
                        // print a success message
                    })
                    .on('error', console.error);
            });
        }
        event.preventDefault();
    }

    /**
     * @ignore
     */
    public render() {
        const { quizAnswers, editing } = this.state;
        const { cookies } = this.props;
        return (
            <div>
                <DisclaimerFrame>
                    <h1 className="title is-1">Welcome to the Quiz</h1>
                    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur eget metus a nunc fermentum
                        posuere. Nunc vitae nisi vel neque tempus ultricies ut nec quam. Lorem ipsum dolor sit amet,
                        consectetur adipiscing elit. Etiam ac est mauris. Nunc placerat neque quis mi pretium,
                        ac placerat nisl bibendum. Mauris ut dolor nec elit porta tincidunt. Donec maximus
                        sagittis purus vel gravida. Nam imperdiet nunc sed ultrices congue. Nam luctus
                        nunc at tristique aliquam. Vivamus lobortis, ante elementum hendrerit pharetra, elit
                        lacus lobortis odio, eu porta elit leo sed lorem.</p>
                    <br />
                    <p>Donec faucibus enim sed diam fringilla, vel congue ante aliquam. Vestibulum eu erat
                        augue. Aliquam ultrices malesuada finibus. Aliquam non metus tempus, auctor nulla
                        nec, facilisis augue. Nulla ut augue aliquam, cursus turpis viverra, rutrum nisl.
                        Ut ut ipsum et odio pellentesque vehicula. Orci varius natoque penatibus et magnis
                        dis parturient montes, nascetur ridiculus mus.</p>
                    <br />
                    <h2 className="title is-2">Terms and Conditions</h2>
                    <p>Fusce luctus lorem efficitur augue ullamcorper, ut cursus enim tempor. Suspendisse
                        a ultricies lectus, sed fermentum odio. Duis lorem lacus, mollis in placerat in, tempor in
                        mauris. Praesent porta orci erat, non venenatis dolor rhoncus maximus. Vestibulum tristique
                        iaculis elementum. Sed sagittis lectus condimentum justo tincidunt, consectetur mollis orci
                        venenatis. Mauris vehicula ante in ipsum ullamcorper faucibus. Vivamus eu eleifend ex, in
                        bibendum lacus. Duis iaculis consequat sagittis. In mauris enim, accumsan sed laoreet ut,
                        placerat id ante. Aliquam et semper lacus. Pellentesque scelerisque viverra dui et hendrerit.
                        Vestibulum bibendum eros eu sem cursus lacinia. Orci varius natoque penatibus et magnis dis
                    parturient montes, nascetur ridiculus mus.</p>
                    <br />
                    <p>Pellentesque interdum sem vitae nisi tempus, at egestas eros maximus. Pellentesque
                        vel ante nisl. Proin pulvinar, eros id posuere congue, lacus sapien hendrerit ante, eget mattis
                        magna mi id felis. Sed rutrum elit lorem, ac fermentum ante tincidunt in. Pellentesque habitant
                        morbi tristique senectus et netus et malesuada fames ac turpis egestas. Duis porttitor magna ut
                        elit semper auctor. Integer ac felis sed sem bibendum ornare non vel odio. Ut neque tortor,
                        bibendum ac aliquet vitae, congue lobortis mauris. Vivamus ut convallis odio. Ut quis lacinia
                    leo. Aliquam commodo accumsan lorem, vitae euismod quam rhoncus eu.</p>
                    <h2 className="title is-2">Gathering the Data</h2>
                    <p>The more data collected, the stronger and more reliable the information will be for researchers
                        to study. For this reason, it is important to have as many participants as possible included in
                        the Autoimmune Research Network (ARNet). NCAPG members and other interested parties who want to
                        join ARNet are welcome to create their own webpage on their own website to
                    encourage participation.</p>
                    <h2 className="title is-2">Using the data</h2>
                    <p>The data collected will be stored securely through Global Vision T echnologies.
                        When researchers want access to the information, they will contact ARNet. From
                        that point, AARDA or the participating group will work with the researchers
                        to provide them with the data, regardless of which organization the patients went
                        through to submit their data. The information will be used to gather patient experiences
                        and help with autoimmune research. Researchers and companies may make a contribution
                    to the charity for access to the information.</p>
                    <br />
                    <p>This is where you will be able to set up your preferences for granting and revoking
                    access to third parties to share your data</p>
                    <br />
                    <br />
                    <h3 className="title is-3">By answering the quiz below, you agree with the above conditions.</h3>
                    <br />
                    <br />
                    <br />
                    <br />
                    <br />
                </DisclaimerFrame>
                <QuizFrame>
                    {editing === true ? this.editingMessage() : null}
                    <form onSubmit={this.handleSubmit}>
                        <div className="field">
                            <label className="label">
                                1 - Please select the autoimmune diseases you have been diagnosed with.
                            </label>
                            <div className="control">
                                <div className="select">
                                    <select
                                        name="qA-0"
                                        onChange={this.handleChange}
                                        value={quizAnswers[0]}
                                        required={true}
                                    >
                                        <option value="0" disabled={true}>Select an option</option>
                                        <option value="1">Type 1 diabetes</option>
                                        <option value="2">Rheumatoid arthritis (RA)</option>
                                        <option value="3">Psoriasis/psoriatic arthritis</option>
                                        <option value="4">Multiple sclerosis</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                2 - At what age did you first seek medical advice for your symptoms?
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="text"
                                    name="qA-1"
                                    required={true}
                                    value={quizAnswers[1]}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                3 - Was your diagnosis of an autoimmune disease confirmed by a specialist?
                            </label>
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="qA-2"
                                        required={true}
                                        value="1"
                                        checked={this.state.quizAnswers[2] === '1'}
                                        onChange={this.handleChange}
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="qA-2"
                                        value="2"
                                        checked={this.state.quizAnswers[2] === '2'}
                                        onChange={this.handleChange}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                4 - At what age were you first diagnosed by a specialist?
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="qA-3"
                                    required={true}
                                    value={quizAnswers[3]}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                5 - How many doctors have you seen for your autoimmune disease?
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="qA-4"
                                    required={true}
                                    value={quizAnswers[4]}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                6 - How many doctors did you see before you were correctly diagnosed?
                            </label>
                            <div className="control">
                                <input
                                    className="input"
                                    type="number"
                                    name="qA-5"
                                    required={true}
                                    value={quizAnswers[5]}
                                    onChange={this.handleChange}
                                />
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                7 - Do you have first degree relatives
                                (mother, father, sibling, aunt, uncle, grandparent, grandchild)
                                with an autoimmune disease?
                            </label>
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="qA-6"
                                        required={true}
                                        value="1"
                                        checked={this.state.quizAnswers[6] === '1'}
                                        onChange={this.handleChange}
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="qA-6"
                                        value="2"
                                        checked={this.state.quizAnswers[6] === '2'}
                                        onChange={this.handleChange}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        <br />

                        <div className="field">
                            <label className="label">
                                8 - Do you currently smoke tobacco?
                            </label>
                            <div className="control">
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="qA-7"
                                        required={true}
                                        value="1"
                                        checked={this.state.quizAnswers[7] === '1'}
                                        onChange={this.handleChange}
                                    />
                                    Yes
                                </label>
                                <label className="radio">
                                    <input
                                        type="radio"
                                        name="qA-7"
                                        value="2"
                                        checked={this.state.quizAnswers[7] === '2'}
                                        onChange={this.handleChange}
                                    />
                                    No
                                </label>
                            </div>
                        </div>
                        <br />

                        <div className="control">
                            <input
                                type="submit"
                                className="button is-primary"
                                disabled={cookies.get('did') === 'demo'}
                                value="Submit"
                            />
                        </div>
                    </form>
                </QuizFrame>
            </div>
        );
    }

    private editingMessage = () => {
        return (
            <p><strong>You are editing!</strong></p>
        );
    }
}

export default Quiz;
