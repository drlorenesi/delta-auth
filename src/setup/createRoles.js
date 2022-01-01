require('dotenv').config();
const connect = require('../config/db');
const { Role } = require('../models/role');

const roles = [
  { nivel: 1, descripcion: 'Administrador' },
  { nivel: 2, descripcion: 'Gerencia' },
  { nivel: 3, descripcion: 'Contabilidad' },
  { nivel: 4, descripcion: 'Producción' },
  { nivel: 5, descripcion: 'Ventas' },
  { nivel: 6, descripcion: 'Inventarios' },
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
