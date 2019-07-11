import React, { Component } from "react";
import SourceMaterial from "./contracts/SourceMaterial.json";
import getWeb3 from "./utils/getWeb3";
import ipfs from "./ipfs";
import storehash from "./storehash";
import "./App.css";

class App extends Component {
  constructor(props) {
    super(props)
      this.state = {
      ipfsHash: null,
      web3: null,
      accounts: null,
      contract: null,
      receivedIPFS: "",
      buffer: "",
      formIPFS: "",
      formAddress: "",
      ethAddress: "",
      blockNumber: "",
      gasUsed: "",
      txReceipt: ""
    };

    this.handleChangeAddress = this.handleChangeAddress.bind(this);
    this.handleChangeIPFS = this.handleChangeIPFS.bind(this);
    this.handleSendIPFS = this.handleSendIPFS.bind(this);
    this.handleReceiveIPFS = this.handleReceiveIPFS.bind(this);
    }

  componentDidMount = async () => {
    try {

      // Get network provider and web3 instance.
      const web3 = await getWeb3();

    // Get accounts.
      const accounts = await web3.eth.getAccounts();

      // Get the contract instance.
      const networkId = await web3.eth.net.getId();
      const deployedNetwork = SourceMaterial.networks[networkId];
      const instance = new web3.eth.Contract(
        SourceMaterial.abi,
        deployedNetwork && deployedNetwork.address,
      );

      // Set web3, accounts and contract to the state, and then proceed with an
      // example of interacting with the contract's methods.
      this.setState({ web3, accounts, contract: instance }, this.runExample);

       } catch (error) {
         // Catch any errors for any of the above operations.
         alert(
           `Failed to load web3, accounts, or contract. Check console for details.`
         );
         console.log(error);
       }
     };

     // BELOW ADDED

     handleChangeAddress(event){
       this.setState({formAddress: event.target.value});
     }

     handleChangeIPFS(event){
       this.setState({formIPFS: event.target.value});
     }

     handleSendIPFS(event){
       event.preventDefault();
       const contract = this.state.contract
       const account = this.state.accounts[0]

       document.getElementById('new-notification-form').reset()
       this.setState({showNotification: true});
       contract.sendIPFS(this.state.formAddress, this.state.formIPFS, {from: account})
         .then(result => {
           this.setState({formAddress: ""});
           this.setState({formIPFS: ""});
         })
     }

     handleReceiveIPFS(event){
       event.preventDefault();
       const contract = this.state.contract
       const account = this.state.accounts[0]
       contract.checkInbox({from: account})
     };

     captureFile = (event) => {
       event.stopPropagation()
       event.preventDefault()
       const file = event.target.files[0]
       let reader = new window.FileReader()
       reader.readAsArrayBuffer(file)
       reader.onloadend = () => this.convertToBuffer(reader)
     };

     convertToBuffer = async(reader) => {
       //file is converted to a buffer for upload to IPFS
         const buffer = await Buffer.from(reader.result);
       //set this buffer -using es6 syntax
         this.setState({buffer});
     };

     //Transaction receipt
     onClick = async () => {

       const web3 = await getWeb3();

     try {
         this.setState({blockNumber:"waiting.."});
         this.setState({gasUsed:"waiting..."});

         // get Transaction Receipt in console on click.
         // See: https://web3js.readthedocs.io/en/1.0/web3-eth.html#gettransactionreceipt
         await web3.eth.getTransactionReceipt(this.state.transactionHash, (err, txReceipt)=>{
           console.log(err,txReceipt);
           this.setState({txReceipt});
         }); //await for getTransactionReceipt

         await this.setState({blockNumber: this.state.txReceipt.blockNumber});
         await this.setState({gasUsed: this.state.txReceipt.gasUsed});
       } //try
     catch(error){
         console.log(error);
       } //catch
   } //onClick

     onIPFSSubmit = async (event) => {
     event.preventDefault();
     //save document to IPFS,return its hash#, and set hash# to state
     //https://github.com/ipfs/interface-ipfs-core/blob/master/SPEC/FILES.md#add
     await ipfs.add(this.state.buffer, (err, ipfsHash) => {
       console.log(err, ipfsHash);
       //setState by setting ipfsHash to ipfsHash[0].hash
       this.setState({ ipfsHash:ipfsHash[0].hash });
     })

       const web3 = await getWeb3();

      //bring in user's metamask account address
      const accounts = await web3.eth.getAccounts();

      console.log('Sending from Metamask account: ' + accounts[0]);

      // call Ethereum contract method "setHash" and .send IPFS hash to etheruem contract
      //return the transaction hash from the ethereum contract
      //see, this https://web3js.readthedocs.io/en/1.0/web3-eth-contract.html#methods-mymethod-send
      storehash.methods.setHash(this.state.ipfsHash).send({
       from: accounts[0]
      }, (error, transactionHash) => {
         console.log(transactionHash);
         this.setState({transactionHash});
         }); //storehash
       }; //onIPFSSubmit

     // ABOVE ADDED

     render() {
       if (!this.state.web3) {
         return <div>Loading Web3, accounts, and contract...</div>;
       }

       return (
         <div className="App">
         <header className="App-header">
         <h1>Invest-y-gative</h1>

         <p align="center">We value:
         <ul>
         <li>Editorial Transparency</li>
         <li>Accuracy and Accountability</li>
         <li>Source Protection</li>
         <li>Freedom of Speech</li>
         </ul>
         </p>

         <p>Invest-y-gative leverages Web3 blockchain technology to drive investigative journalism, based on the methodology of scientific journalism, in the public interest.</p>

<p>Use our dropbox to submit your source material and pitches for investigative reports below.</p>

       </header>
         <h2> 1. Upload your source material/pitches to IPFS</h2>
           <form id="ipfs-hash-form" className="scep-form" onSubmit={this.onIPFSSubmit}>
             <input type="file" onChange={this.captureFile} />
             <button type="submit"> Upload </button>
           </form>
           <p> Your submission's IPFS hash is: {this.state.ipfsHash}</p>
         <h2> 2. Notify Invest-y-gative Editors of your submission</h2>
           <form id="new-notification-form" className="scep-form" onSubmit={this.handleSendIPFS}>
             <label>
               Editorial Address:
               <input type="text" value={this.state.value} onChange={this.handleChangeAddress} />
             </label>
             <label>
               IPFS Address:
               <input type="text" value={this.state.value} onChange={this.handleChangeIPFS} />
             </label>
             <input type="submit" value="Submit" />
           </form>
         <h2> 3. Check for a reply from Invest-y-gative</h2>
           <button type="submit" onClick={this.handleReceiveIPFS}>Receive IPFS</button>
           <div>{this.state.receivedIPFS}</div>
         <h2> 4. Receive a Transaction Receipt for your Submission</h2>
               <button type="submit" onSubmit={this.onIPFSSubmit}>Get Transaction Receipt </button>

                        <h2>IPFS submission Hash # stored on Ethereum</h2>
                         <div>{this.state.ipfsHash}</div>
                         <h2>Ethereum Contract Address</h2>
                         <div>{this.state.ethAddress}</div>
                         <h2>Tx Hash # </h2>
                         <div>{this.state.transactionHash}</div>
                         <h2>Block Number # </h2>
                         <div>{this.state.blockNumber}</div>
                       <h2>Gas Used</h2>
                         <div>{this.state.gasUsed}</div>
        </div>
         );
       } //render
   }
export default App;
