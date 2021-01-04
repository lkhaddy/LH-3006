const express = require("express");
const bcrypt = require("bcrypt");

const User = require("../models/user");

const router = express.Router();
//Hash password using bcrypt package
router.post("/signup", (req, res, next) => {
  bcrypt.hash(req.body.password, 11)
  .then(hash => {
    const user = new User({
      email: req.body.email,
      password: hash
    });
    //Save user
    user.save().then(result => {
      res.status(201).json({
        message: 'User created',
        result: result
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });
  });
});

module.exports = router;
