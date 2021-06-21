// Routes
const register = require('../routes/accounts/register');
const verify = require('../routes/accounts/verify');
const auth = require('../routes/accounts/auth');
const logout = require('../routes/accounts/logout');
const profile = require('../routes/accounts/profile');
const changePass = require('../routes/accounts/change-pass');
const reset = require('../routes/accounts/reset');
const todos = require('../routes/accounts/todos');
const users = require('../routes/users');
const test = require('../routes/test');

module.exports = (app) => {
  // Routes
  app.use('/v1/accounts/register', register);
  app.use('/v1/accounts/verify', verify);
  app.use('/v1/accounts/auth', auth);
  app.use('/v1/accounts/logout', logout);
  app.use('/v1/accounts/profile', profile);
  app.use('/v1/accounts/change-pass', changePass);
  app.use('/v1/accounts/reset', reset);
  app.use('/v1/accounts/todos', todos);
  app.use('/v1/users', users);
  app.use('/v1/test', test);
};
