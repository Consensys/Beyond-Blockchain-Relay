const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/employee");
const Employee = mongoose.model("Employee");
// const Employee = require("../models/employee");
const { ensureAuthenticated } = require("../config/auth");

require("dotenv").config();
const Web3 = require("web3");
const axios = require("axios");
const EthereumTx = require("ethereumjs-tx");

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("employee/addOrEdit", {
    viewTitle: "Insert Employee",
    employee: req.body
  });
});

router.post("/add", ensureAuthenticated, (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

// function insertRecord(req, res) {
//   var employee = new Employee();
//   employee.fullName = req.body.fullName;
//   employee.email = req.body.email;
//   employee.mobile = req.body.mobile;
//   employee.city = req.body.city;
//   employee.save((err, doc) => {
//     if (!err) res.redirect("/employee/list");
//     else {
//       if (err.name == "ValidationError") {
//         handleValidationError(err, req.body);
//         res.render("employee/addOrEdit", {
//           viewTitle: "Insert Employee",
//           employee: req.body
//         });
//       } else console.log("Error during record insertion : " + err);
//     }
//   });
// }

// function updateRecord(req, res) {
//   Employee.findOneAndUpdate(
//     { _id: req.body._id },
//     req.body,
//     { new: true },
//     (err, doc) => {
//       if (!err) {
//         res.redirect("/employee/list");
//       } else {
//         if (err.name == "ValidationError") {
//           handleValidationError(err, req.body);
//           res.render("employee/addOrEdit", {
//             viewTitle: "Update Employee",
//             employee: req.body
//           });
//         } else console.log("Error during record update : " + err);
//       }
//     }
//   );
// }

// router.get("/list", ensureAuthenticated, (req, res) => {
//   Employee.find((err, docs) => {
//     console.log(docs);
//     if (!err) {
//       res.render("employee/list", {
//         list: docs
//       });
//     } else {
//       console.log("Error in retrieving employee list :" + err);
//     }
//   });
// });

// function handleValidationError(err, body) {
//   for (field in err.errors) {
//     switch (err.errors[field].path) {
//       case "fullName":
//         body["fullNameError"] = err.errors[field].message;
//         break;
//       case "email":
//         body["emailError"] = err.errors[field].message;
//         break;
//       default:
//         break;
//     }
//   }
// }

// router.get("/:id", ensureAuthenticated, (req, res) => {
//   Employee.findById(req.params.id, (err, doc) => {
//     if (!err) {
//       res.render("employee/addOrEdit", {
//         viewTitle: "Update Employee",
//         employee: doc
//       });
//     }
//   });
// });

const testnet = `https://rinkeby.infura.io/v3/${process.env.INFURA_PROJECT_ID}`;
const web3 = new Web3(new Web3.providers.HttpProvider(testnet));
web3.eth.defaultAccount = process.env.WALLET_ADDRESS;
const amountToSend = 0.03;
const main = async () => {
  /**
   * Fetch your personal wallet's balance
   */
  let myBalanceWei = web3.eth.getBalance(web3.eth.defaultAccount).toNumber();
  let myBalance = web3.fromWei(myBalanceWei, "ether");

  console.log(`Your wallet balance is currently ${myBalance} ETH`);

  /**
   * With every new transaction you send using a specific wallet address,
   * you need to increase a nonce which is tied to the sender wallet.
   */
  let nonce = web3.eth.getTransactionCount(web3.eth.defaultAccount);
  console.log(
    `The outgoing transaction count for your wallet address is: ${nonce}`
  );

  /**
   * Fetch the current transaction gas prices from https://ethgasstation.info/
   */
  let gasPrices = await getCurrentGasPrices();

  /**
   * Build a new transaction object and sign it locally.
   */
  let details = {
    to: process.env.DESTINATION_WALLET_ADDRESS,
    value: web3.toHex(web3.toWei(amountToSend, "ether")),
    gas: 21000,
    gasPrice: gasPrices.low * 1000000000, // converts the gwei price to wei
    nonce: nonce,
    chainId: 4 // EIP 155 chainId - mainnet: 1, rinkeby: 4
  };

  const transaction = new EthereumTx(details);

  /**
   * This is where the transaction is authorized on your behalf.
   * The private key is what unlocks your wallet.
   */
  transaction.sign(Buffer.from(process.env.WALLET_PRIVATE_KEY, "hex"));

  /**
   * Now, we'll compress the transaction info down into a transportable object.
   */
  const serializedTransaction = transaction.serialize();

  /**
   * Note that the Web3 library is able to automatically determine the "from" address based on your private key.
   */

  // const addr = transaction.from.toString('hex')
  // log(`Based on your private key, your wallet address is ${addr}`)

  /**
   * We're ready! Submit the raw transaction details to the provider configured above.
   */
  const transactionId = web3.eth.sendRawTransaction(
    "0x" + serializedTransaction.toString("hex")
  );

  /**
   * We now know the transaction ID, so let's build the public Etherscan url where
   * the transaction details can be viewed.
   */
  const url = `https://rinkeby.etherscan.io/tx/${transactionId}`;
  console.log(url);

  process.exit();
};

router.get("/view/:id", ensureAuthenticated, (req, res) => {
  Employee.findById(req.params.id, (err, doc) => {
    if (!err) {
      res.render("employee/view", {
        viewTitle: "View Employee",
        ad: doc
      });

      setTimeout(function() {
        main().catch(err => console.log(err));
      }, 10000);
    }
  });
});

// router.get("/delete/:id", ensureAuthenticated, (req, res) => {
//   Employee.findByIdAndRemove(req.params.id, (err, doc) => {
//     if (!err) {
//       res.redirect("/employee/list");
//     } else {
//       console.log("Error in employee delete :" + err);
//     }
//   });
// });

module.exports = router;
