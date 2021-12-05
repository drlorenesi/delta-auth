require('dotenv').config();
const connect = require('../config/db');
const { Role } = require('../models/role');

const roles = [
  { nivel: 0, descripcion: 'Administrador' },
  { nivel: 1, descripcion: 'Gerencia' },
  { nivel: 2, descripcion: 'Contabilidad' },
  { nivel: 3, descripcion: 'Producción' },
  { nivel: 4, descripcion: 'Ventas' },
  { nivel: 5, descripcion: 'Inventarios' },
  { nivel: 10, descripcion: 'General' },
];

async function createRoles() {
  try {
    await connect();
    await Role.insertMany(roles);
    console.log('Enhorabuena! Los roles fueron creados exitosamente.');
    process.exit(0);
  } catch (error) {
    console.log('Ocurrió un error:', error.message);
    process.exit(1);
  }
}

createRoles();
