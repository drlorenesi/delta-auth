const mongoose = require('mongoose');

const tareaSchema = new mongoose.Schema(
  {
    usuarioId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    descripcion: {
      type: String,
      minlength: 1,
      maxlength: 255, // To avoid a maliciously long string
      trim: true,
      required: true,
    },
    finalizada: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

const Tarea = mongoose.model('Tarea', tareaSchema);
module.exports = Tarea;
