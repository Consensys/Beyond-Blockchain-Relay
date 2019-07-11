const express = require("express");
const router = express.Router();
const { ensureAuthenticated, forwardAuthenticated } = require("../config/auth");

// Dashboard
router.get("/", ensureAuthenticated, (req, res) =>
  res.render("dashboard", {
    user: req.user
  })
);

// Dashboard
router.get("/2", ensureAuthenticated, (req, res) =>
  res.render("dashboard2", {
    user: req.user
  })
);

module.exports = router;
