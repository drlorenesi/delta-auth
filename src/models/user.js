const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    email: {
      address: {
        type: String,
        required: true,
      },
      verified: {
        type: Boolean,
        default: false,
      },
    },
    password: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
