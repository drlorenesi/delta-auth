// Generales
const registro = require('../routes/registro');
const verificar = require('../routes/verificar');
const login = require('../routes/login');
const logout = require('../routes/logout');
const solicitar = require('../routes/solicitar');
const nueva = require('../routes/nueva');
// Perfil
const perfil = require('../routes/perfil');
const pass = require('../routes/pass');
// Usuarios
const usuarios = require('../routes/usuarios');
// Roles
const roles = require('../routes/roles');
// Utils
const email = require('../routes/email');
const check = require('../routes/check');
const debug = require('../routes/debug');

module.exports = (app) => {
  // Generales
  app.use('/v1/registro', registro);
  app.use('/v1/verificar', verificar);
  app.use('/v1/login', login);
  app.use('/v1/logout', logout);
  app.use('/v1/solicitar', solicitar);
  app.use('/v1/nueva', nueva);
  // Perfil
  app.use('/v1/perfil', perfil);
  app.use('/v1/pass', pass);
  // Usuarios
  app.use('/v1/usuarios', usuarios);
  // Roles
  app.use('/v1/roles', roles);
  // Utils
  app.use('/v1/email', email);
  app.use('/v1/check', check);
  app.use('/v1/debug', debug);
};
