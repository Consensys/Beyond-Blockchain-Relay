import getWeb3 from "./utils/getWeb3";

//access our local copy to contract deployed on rinkeby testnet
//use your own contract address

const address = "0xB621D81AB023c05F2951B5E274FdC3950C020B05";

//use the ABI from your contract
const abi = [
	{
		"inputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "constructor",
		"signature": "constructor"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "_ipfsHash",
				"type": "string"
			},
			{
				"indexed": false,
				"name": "_address",
				"type": "address"
			}
		],
		"name": "ipfsSent",
		"type": "event",
		"signature": "0xd3896131bca4353bcda578f36768163e2ca77cefb2988be6c4e81939ca298ac0"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "response",
				"type": "string"
			}
		],
		"name": "inboxResponse",
		"type": "event",
		"signature": "0x2974ec83b4de9f76155d0c3e88bd3c0645c56c1795807f37d3f9e95caafeee57"
	},
	{
		"anonymous": false,
		"inputs": [
			{
				"indexed": false,
				"name": "ipfsEth",
				"type": "string"
			}
		],
		"name": "returnipfsHash",
		"type": "event",
		"signature": "0xb605c9900ceb7c4fa4fbdc2ab62e2a8bd57020f750bbb045fc42570abc1daabc"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"name": "setHash",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x1ed83fd4"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "ipfsEth",
				"type": "string"
			}
		],
		"name": "getHash",
		"outputs": [
			{
				"name": "x",
				"type": "string"
			}
		],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x5b6beeb9"
	},
	{
		"constant": false,
		"inputs": [
			{
				"name": "_address",
				"type": "address"
			},
			{
				"name": "_ipfsHash",
				"type": "string"
			}
		],
		"name": "sendIPFS",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x6bfc70e2"
	},
	{
		"constant": false,
		"inputs": [],
		"name": "checkInbox",
		"outputs": [],
		"payable": false,
		"stateMutability": "nonpayable",
		"type": "function",
		"signature": "0x5c23d56f"
	}
]

export default getWeb3(abi, address);
