var express = require('express');
var router = express.Router();
const User = require('../models/user.model');

/* GET users listing. */
router.get('/', async function(req, res, next) {
  console.log(req.query.address);
  const address = req.query.address;
  try {
    const user = await User.findOne({ 'address': address });
    console.log(user);
    if (user) {
      res.json(user);
    } else {
      res.json({});
    }
  } catch(err) {
    console.log(err);
  }
});

router.post('/', async function(req, res, next) {
  console.log(req.body.address);
  let user = await new User;
  user.address = req.body.address;
  user.name = req.body.address;
  user.save((err) => {
    if (err) {
      console.log('error saving user');
      return;
    }
    res.json(user);
  })
});

module.exports = router;