const address = '0xf5dce57282a584d2746faf1593d3121fcac444dc'; // mainnet
const abi = [
  {
    "constant": true,
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "signature": "0x06fdde03",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "spender",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "signature": "0x095ea7b3",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "reserveFactorMantissa",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x173b9904",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "borrowBalanceCurrent",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x17bfdfbc",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x18160ddd",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "exchangeRateStored",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x182df0f5",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "src",
        "type": "address"
      },
      {
        "name": "dst",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "signature": "0x23b872dd",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "pendingAdmin",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "signature": "0x26782247",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x313ce567",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOfUnderlying",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x3af9e669",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "getCash",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x3b1d21a2",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newComptroller",
        "type": "address"
      }
    ],
    "name": "_setComptroller",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x4576b5db",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalBorrows",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x47bd3718",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "comptroller",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "signature": "0x5fe3b567",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "reduceAmount",
        "type": "uint256"
      }
    ],
    "name": "_reduceReserves",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x601a0bf1",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "initialExchangeRateMantissa",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x675d972c",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "accrualBlockNumber",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x6c540baf",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "underlying",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "signature": "0x6f307dc3",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x70a08231",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "totalBorrowsCurrent",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x73acee98",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "totalReserves",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x8f840ddd",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "name": "",
        "type": "string"
      }
    ],
    "payable": false,
    "signature": "0x95d89b41",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "borrowBalanceStored",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x95dd9193",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "accrueInterest",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xa6afed95",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "dst",
        "type": "address"
      },
      {
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "signature": "0xa9059cbb",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "borrowIndex",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xaa5af0fd",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "supplyRatePerBlock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xae9d70b0",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "liquidator",
        "type": "address"
      },
      {
        "name": "borrower",
        "type": "address"
      },
      {
        "name": "seizeTokens",
        "type": "uint256"
      }
    ],
    "name": "seize",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xb2a02ff1",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newPendingAdmin",
        "type": "address"
      }
    ],
    "name": "_setPendingAdmin",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xb71d1a0c",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "exchangeRateCurrent",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xbd6d894d",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "account",
        "type": "address"
      }
    ],
    "name": "getAccountSnapshot",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      },
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xc37f68e2",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [
      {
        "name": "owner",
        "type": "address"
      },
      {
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xdd62ed3e",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [],
    "name": "_acceptAdmin",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xe9c714f2",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newInterestRateModel",
        "type": "address"
      }
    ],
    "name": "_setInterestRateModel",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xf2b3abbd",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "interestRateModel",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "signature": "0xf3fdb15a",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "admin",
    "outputs": [
      {
        "name": "",
        "type": "address"
      }
    ],
    "payable": false,
    "signature": "0xf851a440",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "borrowRatePerBlock",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xf8f9da28",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "newReserveFactorMantissa",
        "type": "uint256"
      }
    ],
    "name": "_setReserveFactor",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xfca7820b",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": true,
    "inputs": [],
    "name": "isCToken",
    "outputs": [
      {
        "name": "",
        "type": "bool"
      }
    ],
    "payable": false,
    "signature": "0xfe9c44ae",
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "name": "underlying_",
        "type": "address"
      },
      {
        "name": "comptroller_",
        "type": "address"
      },
      {
        "name": "interestRateModel_",
        "type": "address"
      },
      {
        "name": "initialExchangeRateMantissa_",
        "type": "uint256"
      },
      {
        "name": "name_",
        "type": "string"
      },
      {
        "name": "symbol_",
        "type": "string"
      },
      {
        "name": "decimals_",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "constructor",
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "interestAccumulated",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "borrowIndex",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalBorrows",
        "type": "uint256"
      }
    ],
    "name": "AccrueInterest",
    "signature": "0x875352fb3fadeb8c0be7cbbe8ff761b308fa7033470cd0287f02f3436fd76cb9",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "minter",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "mintAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "mintTokens",
        "type": "uint256"
      }
    ],
    "name": "Mint",
    "signature": "0x4c209b5fc8ad50758f13e2e1088ba56a560dff690a1c6fef26394f4c03821c4f",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "redeemer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "redeemAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "redeemTokens",
        "type": "uint256"
      }
    ],
    "name": "Redeem",
    "signature": "0xe5b754fb1abb7f01b499791d0b820ae3b6af3424ac1c59768edb53f4ec31a929",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "borrowAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "accountBorrows",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalBorrows",
        "type": "uint256"
      }
    ],
    "name": "Borrow",
    "signature": "0x13ed6866d4e1ee6da46f845c46d7e54120883d75c5ea9a2dacc1c4ca8984ab80",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "payer",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "repayAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "accountBorrows",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "totalBorrows",
        "type": "uint256"
      }
    ],
    "name": "RepayBorrow",
    "signature": "0x1a2a22cb034d26d1854bdc6666a5b91fe25efbbb5dcad3b0355478d6f5c362a1",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "liquidator",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "borrower",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "repayAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "cTokenCollateral",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "seizeTokens",
        "type": "uint256"
      }
    ],
    "name": "LiquidateBorrow",
    "signature": "0x298637f684da70674f26509b10f07ec2fbc77a335ab1e7d6215a4b2484d8bb52",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "oldPendingAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "newPendingAdmin",
        "type": "address"
      }
    ],
    "name": "NewPendingAdmin",
    "signature": "0xca4f2f25d0898edd99413412fb94012f9e54ec8142f9b093e7720646a95b16a9",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "oldAdmin",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "newAdmin",
        "type": "address"
      }
    ],
    "name": "NewAdmin",
    "signature": "0xf9ffabca9c8276e99321725bcb43fb076a6c66a54b7f21c4e8146d8519b417dc",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "oldComptroller",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "newComptroller",
        "type": "address"
      }
    ],
    "name": "NewComptroller",
    "signature": "0x7ac369dbd14fa5ea3f473ed67cc9d598964a77501540ba6751eb0b3decf5870d",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "oldInterestRateModel",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "newInterestRateModel",
        "type": "address"
      }
    ],
    "name": "NewMarketInterestRateModel",
    "signature": "0xedffc32e068c7c95dfd4bdfd5c4d939a084d6b11c4199eac8436ed234d72f926",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "oldReserveFactorMantissa",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "newReserveFactorMantissa",
        "type": "uint256"
      }
    ],
    "name": "NewReserveFactor",
    "signature": "0xaaa68312e2ea9d50e16af5068410ab56e1a1fd06037b1a35664812c30f821460",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "admin",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "reduceAmount",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "newTotalReserves",
        "type": "uint256"
      }
    ],
    "name": "ReservesReduced",
    "signature": "0x3bad0c59cf2f06e7314077049f48a93578cd16f5ef92329f1dab1420a99c177e",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "name": "error",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "info",
        "type": "uint256"
      },
      {
        "indexed": false,
        "name": "detail",
        "type": "uint256"
      }
    ],
    "name": "Failure",
    "signature": "0x45b96fe442630264581b197e84bbada861235052c5a1aadfff9ea4e40a969aa0",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "signature": "0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "signature": "0x8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b925",
    "type": "event"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "mintAmount",
        "type": "uint256"
      }
    ],
    "name": "mint",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xa0712d68",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "redeemTokens",
        "type": "uint256"
      }
    ],
    "name": "redeem",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xdb006a75",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "redeemAmount",
        "type": "uint256"
      }
    ],
    "name": "redeemUnderlying",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x852a12e3",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "borrowAmount",
        "type": "uint256"
      }
    ],
    "name": "borrow",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xc5ebeaec",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "repayAmount",
        "type": "uint256"
      }
    ],
    "name": "repayBorrow",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x0e752702",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "borrower",
        "type": "address"
      },
      {
        "name": "repayAmount",
        "type": "uint256"
      }
    ],
    "name": "repayBorrowBehalf",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0x2608f818",
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "constant": false,
    "inputs": [
      {
        "name": "borrower",
        "type": "address"
      },
      {
        "name": "repayAmount",
        "type": "uint256"
      },
      {
        "name": "cTokenCollateral",
        "type": "address"
      }
    ],
    "name": "liquidateBorrow",
    "outputs": [
      {
        "name": "",
        "type": "uint256"
      }
    ],
    "payable": false,
    "signature": "0xf5e3c462",
    "stateMutability": "nonpayable",
    "type": "function"
  }
];
export default { address, abi };
