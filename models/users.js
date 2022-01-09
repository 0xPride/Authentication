const mongoose = require('mongoose');

const User = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: [true, 'please provide an email'],
    unique: true,
    validate: (val) => {
      const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
      return emailPattern.test(val);
    }
  },
  password: {
    type: String,
    required: [true, 'please privde a password'],
  }
})

module.exports = mongoose.model('user', User);
