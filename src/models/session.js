const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    userId: mongoose.ObjectId,
    userInfo: {
      type: new mongoose.Schema({
        nombre: {
          type: String,
          // required: true,
          trim: true,
        },
        apellido: {
          type: String,
          // required: true,
          trim: true,
        },
        email: {
          type: String,
          // required: true,
          trim: true,
        },
        // other properties
      }),
      required: true,
    },
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
