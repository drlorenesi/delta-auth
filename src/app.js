require('dotenv').config();
const express = require('express');

const app = express();

// Startup Checks
require('./config/startup')();
// Prod Logger
const Sentry = require('@sentry/node');
const Tracing = require('@sentry/tracing');
if (process.env.NODE_ENV === 'production') {
  Sentry.init({
    dsn: process.env.SENTRY,
    integrations: [
      // enable HTTP calls tracing
      new Sentry.Integrations.Http({ tracing: true }),
      // enable Express.js middleware tracing
      new Tracing.Integrations.Express({ app }),
    ],

    // Set tracesSampleRate to 1.0 to capture 100%
    // of transactions for performance monitoring.
    // We recommend adjusting this value in production
    tracesSampleRate: 1.0,
  });
  // RequestHandler creates a separate execution context using domains, so that every
  // transaction/span/breadcrumb is attached to its own Hub instance
  app.use(Sentry.Handlers.requestHandler());
  // TracingHandler creates a trace for every incoming request
  app.use(Sentry.Handlers.tracingHandler());
}
// Dev Logger
if (process.env.NODE_ENV === 'development') {
  require('./config/devLogger');
}
// Middleware
require('./config/middleware')(app);
// Routes
require('./config/routes')(app);
// Prod Error Handler
// The error handler must be before any other error middleware and after all controllers
if (process.env.NODE_ENV === 'production') {
  app.use(Sentry.Handlers.errorHandler());
  require('./middleware/prodError')(app);
}
// Dev Error Handler
if (process.env.NODE_ENV === 'development') {
  app.use(require('./middleware/devError'));
}

module.exports = app;
