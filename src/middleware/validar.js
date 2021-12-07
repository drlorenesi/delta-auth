function validateBody(validatorFn) {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0)
      return res.status(400).send({ error: 'No info provided...' });
    const { error } = validatorFn(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
  };
}

function validateQuery(validatorFn) {
  return (req, res, next) => {
    if (Object.keys(req.query).length === 0)
      return res.status(400).send({ error: 'No info provided...' });
    const { error } = validatorFn(req.query);
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
  };
}

function validateParams(validatorFn) {
  return (req, res, next) => {
    if (Object.keys(req.params).length === 0)
      return res.status(400).send({ error: 'No info provided...' });
    const { error } = validatorFn(req.params);
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
  };
}

module.exports = { validateBody, validateQuery, validateParams };
