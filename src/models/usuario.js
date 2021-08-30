const mongoose = require('mongoose');

const usuarioSchema = new mongoose.Schema(
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
    role: {
      nivel: {
        type: Number,
        default: 10,
      },
      descripcion: {
        type: String,
        default: 'General',
      },
    },
    ultimoIngreso: {
      type: Date,
      default: new Date(),
    },
    suspendido: {
      type: Boolean,
      default: false,
    },
    activado: {
      type: Boolean,
      default: false,
    },
    codigoActivador: String,
    codigoReinicio: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const Usuario = mongoose.model('Usuario', usuarioSchema);
module.exports = Usuario;
