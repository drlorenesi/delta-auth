const logger = require('../config/devLogger');

module.exports = (error, req, res, next) => {
  logger.error('API Error.\n%s', error);
  res
    .status(500)
    .send({
      error:
        'The server encountered an error and could not complete your request.',
    });
};
