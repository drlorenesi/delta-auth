// Generales
const registro = require('../routes/registro');
const verificar = require('../routes/verificar');
const login = require('../routes/login');
const logout = require('../routes/logout');
const solicitar = require('../routes/solicitar');
const reinicio = require('../routes/reinicio');
// Perfil
const perfil = require('../routes/perfil');
const cambioPass = require('../routes/cambioPass');
// Admin
const usuarios = require('../routes/admin/usuarios');
const sesiones = require('../routes/admin/sesiones');
const roles = require('../routes/admin/roles');
// Utils
const estado = require('../routes/utils/estado');
const email = require('../routes/utils/email');
const check = require('../routes/utils/check');
const debug = require('../routes/utils/debug');

module.exports = (app) => {
  // Generales
  app.use('/v1/registro', registro);
  app.use('/v1/verificar', verificar);
  app.use('/v1/login', login);
  app.use('/v1/logout', logout);
  app.use('/v1/solicitar', solicitar);
  app.use('/v1/reinicio', reinicio);
  // Perfil
  app.use('/v1/perfil', perfil);
  app.use('/v1/cambio-pass', cambioPass);
  // Admin
  app.use('/v1/admin/usuarios', usuarios);
  app.use('/v1/admin/sesiones', sesiones);
  app.use('/v1/admin/roles', roles);
  // Utils
  app.use('/v1/utils/estado', estado);
  app.use('/v1/utils/email', email);
  app.use('/v1/utils/check', check);
  app.use('/v1/utils/debug', debug);
};
