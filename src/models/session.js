const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    sessionId: String,
    userId: mongoose.ObjectId,
    valid: {
      type: Boolean,
      default: true,
    },
    userAgent: String,
    ip: String,
  },
  { timestamps: true }
);

const Session = mongoose.model('Session', sessionSchema);
module.exports = Session;
