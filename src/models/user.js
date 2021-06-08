const mongoose = require('mongoose');

const userSchema = new mongoose.Schema(
  {
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
      unique: true,
      index: true,
      trim: true,
    },
    pass: {
      type: String,
      minLength: 3,
      required: true,
      trim: true,
    },
    accessLevel: {
      type: Number,
      default: 1,
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

exports.userSchema = userSchema;
exports.User = User;
