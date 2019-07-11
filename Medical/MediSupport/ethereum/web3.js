import Web3 from "web3";
//const Web3 = require("web3");

let web3;

if(typeof window !== "undefined" && typeof window.web3 !== "undefined") {
    //;
    // We are in the browser and metamask is running
    web3 = new Web3(window.web3.currentProvider);
} else{
        // In the browser OR user is not running metamask
        const provider = new Web3.providers.HttpProvider(
            /* Your Infura Rinkebey API */
        );
        web3 = new Web3(provider);
    }
    
export default web3;

