// Routes
const register = require('../routes/register');
const verify = require('../routes/verify');
const auth = require('../routes/auth');
const logout = require('../routes/logout');
const test = require('../routes/test');
// const users = require('../routes/users');

module.exports = (app) => {
  // Routes
  app.use('/api/v1/register', register);
  app.use('/api/v1/verify', verify);
  app.use('/api/v1/auth', auth);
  app.use('/api/v1/logout', logout);
  app.use('/api/v1/test', test);
  // app.use('/api/v1/users', users);
};
