// Routes
const registro = require('../routes/usuarios/registro');
const activar = require('../routes/usuarios/activar');
const login = require('../routes/usuarios/login');
const logout = require('../routes/usuarios/logout');
const reinicio = require('../routes/usuarios/reinicio');
const nueva = require('../routes/usuarios/nueva');
const perfil = require('../routes/usuarios/perfil');
const pass = require('../routes/usuarios/pass');
const tareas = require('../routes/usuarios/tareas');
const roles = require('../routes/roles');
const usuarios = require('../routes/usuarios');
const check = require('../routes/check');
const env = require('../routes/env');

module.exports = (app) => {
  // Routes
  app.use('/v1/usuarios/registro', registro);
  app.use('/v1/usuarios/activar', activar);
  app.use('/v1/usuarios/login', login);
  app.use('/v1/usuarios/logout', logout);
  app.use('/v1/usuarios/reinicio', reinicio);
  app.use('/v1/usuarios/nueva', nueva);
  app.use('/v1/usuarios/perfil', perfil);
  app.use('/v1/usuarios/pass', pass);
  app.use('/v1/usuarios/tareas', tareas);
  app.use('/v1/roles', roles);
  app.use('/v1/usuarios', usuarios);
  app.use('/v1/check', check);
  app.use('/v1/env', env);
};
