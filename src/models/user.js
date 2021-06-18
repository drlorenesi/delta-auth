// accessLevel 1: standard
// accessLevel 2: sales
// accessLevel 3: inventory
// accessLevel 4: accounting
// accessLevel 10: admin

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      maxLength: 255,
      trim: true,
      required: true,
    },
    apellido: {
      type: String,
      maxLength: 255,
      trim: true,
      required: true,
    },
    extension: {
      type: Number,
      default: null,
    },
    email: {
      type: String,
      maxLength: 255,
      trim: true,
      unique: true,
      index: true,
      required: true,
    },
    pass: {
      type: String,
      minLength: 3,
      maxLength: 255,
      trim: true,
      required: true,
    },
    accessLevel: {
      type: Number,
      default: 1,
    },
    suspendido: {
      type: Boolean,
      default: false,
    },
    verificado: {
      type: Boolean,
      default: false,
    },
    codigoVerificador: String,
  },
  { timestamps: true }
);

const User = mongoose.model('User', userSchema);
module.exports = User;
