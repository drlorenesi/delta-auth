const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema({
  _id: { type: mongoose.ObjectId, required: true },
  nombre: {
    type: String,
    trim: true,
    required: true,
  },
  apellido: {
    type: String,
    trim: true,
    required: true,
  },
  email: {
    type: String,
    trim: true,
    required: true,
  },
  role: {
    nivel: {
      type: Number,
      required: true,
    },
    descripcion: {
      type: String,
      required: true,
    },
  },
});

const sessionSchema = new mongoose.Schema(
  {
    sessionId: { type: String, index: true },
    usuario: {
      type: usuarioSchema,
      required: true,
    },
    userAgent: String,
    ip: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model('Session', sessionSchema);
