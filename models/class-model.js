const mongoose = require('mongoose');

// Require additional Models
// const userModel = require('./user-model');

const Schema = mongoose.Schema;

const classSchema = new Schema({
  students: {
    type: [studentModel.schema], //connects to student model
    default: []
  },
  teacher: {
    type: Schema.Types.ObjectId,
    ref: 'User'
  }
});

const classModel = mongoose.model('Class', classSchema);
// Collection name
// User -> users -> db.users.find()

module.exports = classModel;
// Connects the  model above to the routes file