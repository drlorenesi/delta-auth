// Routes
const registro = require('../routes/registro');
const verificar = require('../routes/verificar');
const login = require('../routes/login');
const logout = require('../routes/logout');
const email = require('../routes/email');
const check = require('../routes/check');
const debug = require('../routes/debug');
// --
const reinicio = require('../routes/usuarios/reinicio');
const nueva = require('../routes/usuarios/nueva');
const perfil = require('../routes/usuarios/perfil');
const pass = require('../routes/usuarios/pass');
const tareas = require('../routes/usuarios/tareas');
const roles = require('../routes/roles');
const usuarios = require('../routes/usuarios');

module.exports = (app) => {
  // Routes
  app.use('/v1/registro', registro);
  app.use('/v1/verificar', verificar);
  app.use('/v1/login', login);
  app.use('/v1/logout', logout);
  app.use('/v1/email', email);
  app.use('/v1/check', check);
  app.use('/v1/debug', debug);
  // --
  app.use('/v1/usuarios/reinicio', reinicio);
  app.use('/v1/usuarios/nueva', nueva);
  app.use('/v1/usuarios/perfil', perfil);
  app.use('/v1/usuarios/pass', pass);
  app.use('/v1/usuarios/tareas', tareas);
  app.use('/v1/roles', roles);
  app.use('/v1/usuarios', usuarios);
};
