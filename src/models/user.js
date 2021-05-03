const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
    nombre: {
      type: String,
      required: true,
    },
    apellido: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      index: true,
    },
    pass: {
      type: String,
      minLength: 3,
      required: true,
    },
    accessLevel: {
      type: Number,
      default: 10,
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
