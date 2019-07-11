const express = require("express");
var router = express.Router();
const mongoose = require("mongoose");
require("../models/advertisement");
const Advertisement = mongoose.model("Advertisement");
const { ensureAuthenticated } = require("../config/auth");

router.get("/list", ensureAuthenticated, (req, res) => {
  Advertisement.find((err, docs) => {
    if (!err) {
      res.render("advertisement/list", {
        list: docs
      });
    } else {
      console.log("Error in retrieving advertisement list :" + err);
    }
  });
});

router.get("/add", ensureAuthenticated, (req, res) => {
  res.render("advertisement/addOrEdit", {
    viewTitle: "Insert advertisement",
    advertisement: req.body
  });
});

router.post("/add", ensureAuthenticated, (req, res) => {
  if (req.body._id == "") insertRecord(req, res);
  else updateRecord(req, res);
});

router.get("/", ensureAuthenticated, (req, res) => {
  // Advertisement.findById(req.params.id, (err, doc) => {
  //   console.log(doc);
  //   if (!err) {
  //     res.render("advertisement/view", {
  //       advertisement: doc
  //     });
  //   }
  // });

  Advertisement.findById("5d2667cf1c9d440000ed70f9", (err, doc) => {
    console.log(doc);
    if (!err) {
      res.render("advertisement/view", {
        advertisement: doc
      });
    }
  });
});

module.exports = router;
