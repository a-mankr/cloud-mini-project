var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const config = require('../auth/config');
const Participants = require('../models/Participants');

router.post('/login', (req, res) => {
  console.log(req.body);
  let username = req.body.email;
  let password = req.body.password;
  // For the given username fetch user from DB
  if (username && password) {
    Participants.getParticipantByUsername(username, (err, user) => {
      if (err) throw err;
      else if (!user) {
        res.status(403).json({
          success: false,
          message: 'Incorrect username or password',
        });
      } else {
        Participants.comparePassword(password, user.password, (err, isMatch) => {
          if (err) throw err;
          if (isMatch) {
            let token = jwt.sign({ username: username }, config.secret, {
              expiresIn: '24h', // expires in 24 hours
            });
            // return the JWT token for the future API calls
            res.json({
              success: true,
              message: 'Authentication successful!',
              token: token,
            });
          } else {
            res.status(403).json({
              success: false,
              message: 'Incorrect username or password',
            });
          }
        });
      }
    });
  } else {
    res.status(400).json({
      success: false,
      message: 'Authentication failed! Please check the request',
    });
  }
});

router.post('/signup', (req, res) => {});

module.exports = router;
