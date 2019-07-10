import Web3 from 'web3'
import * as MediaContract from '../contracts/Media.json';
//const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:8545'));
const web3 = new Web3(window.web3.currentProvider);
const abi = MediaContract.abi;
const address = '0x0341BbA7Cd31DC399AF9043990cd1aF1E8c34399';
const Media = new web3.eth.Contract(abi, address);
export {Media, web3}
