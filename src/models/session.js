const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  _id: { type: mongoose.ObjectId, required: true },
  nombre: {
    type: String,
    required: true,
    trim: true,
  },
  apellido: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    trim: true,
  },
  accessLevel: {
    type: Number,
    required: true,
  },
});

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    user: {
      type: userSchema,
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
