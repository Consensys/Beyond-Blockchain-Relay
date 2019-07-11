# Invest-y-gative: Reinventing The Online News Economy

The dApp produced for this hackathon is a Proof-of-Concept core component of the Invest-y-gative project. It is the submissions layer (the submission box) and utilizes the Ethereum blockchain and IPFS to advance:

- source/journalist protection;
- source material verification (notarization) for documents, video, audio, etc.;
- censorship resistance; and
- the methodology of scientific journalism which publishes primary (and all) source material used to publish the investigative report.

This submission box uses IPFS as a peer-to-peer hosting platform. It utilizes the IPFS hash of files as Proof-of-Existence and stores the proofs on the Ethereum blockchain. Additionally, this notary returns a transaction receipt certifying that the IPFS hash was registered on the blockchain.

Please note that this is an Proof-of-Concept and I am still building out specifications and squashing bugs.

Below are instructions for spinning up a local instance.

## Getting Started
The environment for this implementation relies upon:
* Linux (Debian Stretch)
* Truffle v5.0.26
* Ganache GUI v2.0.2
* NPM 6.10.0
* Infura gateway API
* IPFS

### Dependencies
    * ipfs-http-client: 29.0.1
    * openzeppelin-solidity: 2.1.2
    * react: 16.6.3
    * react-dom: 16.6.3
    * react-scripts: 2.1.3
    * web3: 1.0.0-beta.37

### How to install:
* Install NPM: https://www.npmjs.com/get-npm
* Truffle: ``$ npm install truffle -g``
* Ganache: download the [AppImage for GUI](https://www.trufflesuite.com/ganache). Be sure to make the image executable (in file properties).
* IPFS (if deploying this dApp): To install, first [download IPFS](https://dist.ipfs.io/#go-ipfs). Then run these commands:

``$ tar xvfz go-ipfs.tar.gz`` (make sure the filename is correct)
``$ cd go-ipfs``
``$ ./install.sh``,
then to initialize run ``ipfs init``.

To spin this implementation up on your own machine, follow these steps:
- clone this repository: ``git clone https://github.com/cspannos/Invest-y-gative-project`` ;
- cd into the root directory ‘Invest-y-gative’: `` cd Invest-y-gative``;
- then cd into the directory titled 'client': ``cd client``;
- once inside the client directory, to install dApp packages, run: ``npm install``
- run Ganache GUI (click the AppImage file);
- use the mnemonic code that Ganache provides to open MetaMask. Place the mnemonic in MetaMask’s option to ‘Import using account seed phrase’, and initialize your account.
- in another terminal, also in the root directory, run ``$ truffle develop``;
- in another terminal, cd to ‘Invest-y-gative/client’, run ``$ npm run start``;

This last step will initialize a local implementation of this project and load in your browser at: http://localhost:3000/ . You will be able to upload a file from your local disk to IPFS and have the file’s hash returned in your browser.

## Authors
Chris Spannos - ConsenSys Beyond Blockchain Hackathon 2019 - Breaking News: Reinventing The Online News Economy
