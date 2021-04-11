const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      address: {
        type: String,
        required: true,
        unique: true,
        index: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
      minLength: 3,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
