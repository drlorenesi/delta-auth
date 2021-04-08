// Routes
const register = require('../routes/register');
const auth = require('../routes/auth');
const logout = require('../routes/logout');
const users = require('../routes/users');
const test = require('../routes/test');

module.exports = (app) => {
  // Routes
  app.use('/api/register', register);
  app.use('/api/auth', auth);
  app.use('/api/logout', logout);
  app.use('/api/users', users);
  app.use('/api/test', test);
};
