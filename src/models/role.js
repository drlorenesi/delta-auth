const mongoose = require('mongoose');
// nivel 1: General
// nivel 2: Ventas
// nivel 3: Produccion
// nivel 4: Contabilidad
// nivel 5: Inventarios
// nivel 6: (pend)
// nivel 7: (pend)
// nivel 8: (pend)
// nivel 9: Gerencia
// nivel 10: Administrador

const roleSchema = new mongoose.Schema(
  {
    nivel: {
      type: Number,
      unique: true,
      required: true,
    },
    descripcion: {
      type: String,
      maxLength: 255,
      trim: true,
      required: true,
    },
  },
  { timestamps: true }
);

const Role = mongoose.model('Role', roleSchema);

module.exports = Role;
