// Routes
const register = require('../routes/register');
const verify = require('../routes/verify');
const auth = require('../routes/auth');
const logout = require('../routes/logout');
const profile = require('../routes/profile');
const reset = require('../routes/reset');
const users = require('../routes/users');
const todos = require('../routes/todos');
const test = require('../routes/test');

module.exports = (app) => {
  // Routes
  app.use('/v1/register', register);
  app.use('/v1/verify', verify);
  app.use('/v1/auth', auth);
  app.use('/v1/logout', logout);
  app.use('/v1/profile', profile);
  app.use('/v1/reset', reset);
  app.use('/v1/users', users);
  app.use('/v1/todos', todos);
  app.use('/v1/test', test);
};
