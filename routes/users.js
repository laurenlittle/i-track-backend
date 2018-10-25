const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt');

const UserModel = require('../models/user-model.js');

/* POST new user */
router.post('/api/signup', (req, res, next) => {
  UserModel.findOne({
      userName: req.body.signUpUserName
    },
    (err, currentUser) => {
      if (err) {
        res.status(500).json({
          message: 'Username not found. Please try again.'
        });
        return;
      }
      if (currentUser) { //username taken send message
        res.status(400).json({
          message: 'Username already exists. Please log in or select another username.'
        });
        return;
      }
      
      // Generate salt and hashed password synchronously
      // const salt = bcrypt.genSaltSync(10);
      // const encryptedPassword = bcrypt.hashSync(req.body.signUpPassword, salt);

      // Otherwise save new user
      const newUser = new UserModel({
        title: req.body.signUpTitle,
        firstName: req.body.signUpFirstName,
        lastName: req.body.signUpLastName,
        email: req.body.signUpEmail,
        userName: req.body.signUpUserName,
        password: req.body.signUpPassword
      });

      newUser.save((err) => {
        if (err) {
          console.log('NO SAVE');
          next(err);
          return;
        }
        res.status(200).json(newUser);
      })
    }
  );
});

module.exports = router; // Allows file to be imported into app.js
