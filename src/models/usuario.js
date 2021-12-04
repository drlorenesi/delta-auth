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
      type: String,
      maxLength: 255,
      trim: true,
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
    ingresoActual: {
      type: Date,
      default: new Date(),
    },
    ultimoIngreso: {
      type: Date,
      default: new Date(),
    },
    suspendido: {
      type: Boolean,
      default: false,
    },
    codigoVerificador: {
      type: String,
      default: null,
    },
    verificado: {
      type: Boolean,
      default: false,
    },
    codigoReinicio: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Usuario', usuarioSchema);
