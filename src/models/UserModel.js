const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
    },
    level: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const user = mongoose.model('user', userSchema);

module.exports = { user };
