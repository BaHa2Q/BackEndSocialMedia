const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const passport = require("passport");
// Load User model

const SectionToken = require("../models/SectionToken");
const auth = require("../config/auth");

router.get("/", auth, (req, res) => {
  SectionToken.find({ userId: req.user.id }).then((SectionToken) => {
    if (!SectionToken) {
      res.json("Erro 404");
    } else {
      res.status(200).json(SectionToken);
    }
  });
});

// Register

module.exports = router;
