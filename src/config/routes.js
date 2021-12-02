// Generales
const registro = require('../routes/registro');
const verificar = require('../routes/verificar');
const login = require('../routes/login');
const logout = require('../routes/logout');
const solicitar = require('../routes/solicitar');
const nueva = require('../routes/nueva');
// Utils
const email = require('../routes/email');
const check = require('../routes/check');
const debug = require('../routes/debug');
// Perfil
const perfil = require('../routes/perfil/perfil');
const pass = require('../routes/perfil/pass');
// Usuarios
const usuarios = require('../routes/usuarios/usuarios');
// Roles
const roles = require('../routes/roles');

module.exports = (app) => {
  // Generales
  app.use('/v1/registro', registro);
  app.use('/v1/verificar', verificar);
  app.use('/v1/login', login);
  app.use('/v1/logout', logout);
  app.use('/v1/solicitar', solicitar);
  app.use('/v1/nueva', nueva);
  // Utils
  app.use('/v1/email', email);
  app.use('/v1/check', check);
  app.use('/v1/debug', debug);
  // --
  app.use('/v1/perfil', perfil);
  app.use('/v1/perfil/pass', pass);
  app.use('/v1/roles', roles);
  app.use('/v1/usuarios', usuarios);
};
