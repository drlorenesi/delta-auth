const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    password: {
      type: String,
      minLength: 3,
      required: true,
    },
    isVerified: {
      type: Boolean,
      default: false,
    },
    verificationCode: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
