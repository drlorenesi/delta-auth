module.exports = (app) => {
  // Optional fallthrough error handler
  app.use(function onError(err, req, res, next) {
    // The error id is attached to `res.sentry` to be returned
    // and optionally displayed to the user for support.
    res.statusCode = 500;
    res.end(
      'Ocurrió un error en el servidor y no se pudo llevar acabo la solicitud..\n' +
        'Por favor tomar nota del siguiente código de error: ' +
        res.sentry
    );
  });
};
