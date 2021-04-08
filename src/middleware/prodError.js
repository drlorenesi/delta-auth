module.exports = (app) => {
  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(
      'The server encountered an error and could not complete your request.\n' +
        'Please report error code: ' +
        res.sentry
    );
  });
};
