module.exports = (validador) => {
  return (req, res, next) => {
    if (Object.keys(req.body).length === 0)
      return res.status(400).send({ error: 'No se recibió información...' });
    const { error } = validador(req.body);
    if (error) return res.status(400).send({ error: error.details[0].message });
    next();
  };
};
