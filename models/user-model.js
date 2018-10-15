const mongoose = require('mongoose');

// Require additional Models
// const ClassModel = require('./class-model');

const Schema = mongoose.Schema;

const userSchema = new Schema({
  title: {
    type: String,
    required: true
  },
  firstName: {
    type: String,
    required: [true, 'Please enter your email']
  },
  lastName: {
    type: String,
    required: [true, 'Please enter your email']
  },
  email: {
    type: String,
    required: [true, 'Please enter your email']
  },
  userName: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    maxlength: 20
  },
  studentKeyCode: {
    type: String
  },
  subjectsTaught: {
    type: Array,
    default: []
  },
  classesTaught: {
    type: Number
  }
  // class: ClassModel.schema
}, {
  timestamps: true
});

// userSchema
//   .virtual('url')
//   .get(function () {
//     return '/catalog/author/' + this._id;
//   });

                          // compiles the schema indo a model, once you have the model you can perform CRUD operations
const userModel = mongoose.model('User', userSchema);
                                  // Collection name
// User -> users -> db.users.find()

module.exports = userModel;
// Connects the  model above to the routes file