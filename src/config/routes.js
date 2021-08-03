// Routes
const registro = require('../routes/usuarios/registro');
const verificar = require('../routes/usuarios/verificar');
const login = require('../routes/usuarios/login');
const logout = require('../routes/usuarios/logout');
const perfil = require('../routes/usuarios/perfil');
const cambioPass = require('../routes/usuarios/cambioPass');
const reset = require('../routes/usuarios/reset');
const tareas = require('../routes/usuarios/tareas');
const usuarios = require('../routes/usuarios');
const check = require('../routes/check');

module.exports = (app) => {
  // Routes
  app.use('/v1/usuarios/registro', registro);
  app.use('/v1/usuarios/verificar', verificar);
  app.use('/v1/usuarios/login', login);
  app.use('/v1/usuarios/logout', logout);
  app.use('/v1/usuarios/perfil', perfil);
  app.use('/v1/usuarios/cambio-pass', cambioPass);
  app.use('/v1/usuarios/reset', reset);
  app.use('/v1/usuarios/tareas', tareas);
  app.use('/v1/usuarios', usuarios);
  app.use('/v1/check', check);
};
