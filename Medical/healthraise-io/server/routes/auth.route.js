var express = require('express');
var router = express.Router();
const User = require('../models/user.model');
const ethUtil = require('ethereumjs-util');
const sigUtil = require('eth-sig-util');
const jwt = require('jsonwebtoken');
const config = require('../config');

/* GET users listing. */
router.post('/', async function(req, res, next) {
  const { address, signature } = req.body;
  console.log(req.body);
  try {
    const user = await User.findOne({ 'address': address });
    const msg = `I'm signing a one-time login with stamp: ${user.nonce}`;
    const msgBufferHex = ethUtil.bufferToHex(Buffer.from(msg, 'utf8'));
    const checkAddress = sigUtil.recoverPersonalSignature({
      data: msgBufferHex,
      sig: signature
    });

    if (address.toLowerCase() === checkAddress.toLowerCase()) {
      user.nonce = Math.floor(Math.random() * 10000);
      user.save();
      const accessToken = await jwt.sign({
          payload: {
            id: user.id,
            address
          }
        },
        config.SECRET,
        {},
        (err, token) => {
          if (err) {
            return reject(err);
          }
          console.log(token)
          return res.json(token);;
      });
    }
  } catch(err) {
    console.log(err);
  }
});

module.exports = router;