const express = require('express');
const router = express.Router();

const UserModel = require('../models/user-model.js');

/* POST new user */
router.post('/api/signup', (req, res, next) => {
  UserModel.findOne({
      // title: req.body.signUpTitle,
      // firstName: req.body.signUpFirstName,
      // lastName: req.body.signUpLastName,
      // email: req.body.signUpEmail,
      userName: req.body.signUpUserName
      // password: req.body.signUpPassword
    },
    (err, currentUser) => {
      if (err) {
        res.status(500).json({
          message: 'last name not found'
        });
        return;
      }
      if (currentUser) { //username taken send message
        res.status(400).json({
          message: 'Last Name already exists'
        });
        return;
      }

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
          console.log('NO SAVE');
          console.log('NO SAVE');
          next(err);
          return;
        }
        // res.redirect('/')
        res.status(200).json(newUser);
      })
    }
  );
});

module.exports = router; // Allows file to be imported into app.js
