const express = require('express');
const router = express.Router();
const Usuario = require('../../models/usuario');

// Query String intencionalmente *no* validada por motivos de seguridad
router.get('/', [], async (req, res) => {
  // Buscar 'usuario' en DB
  const usuario = await Usuario.findOne({
    email: req.query.x,
  });
  // Si no se encuentra a usuario
  if (!usuario) return res.redirect('/revisa.html');
  // Revisar si codigo de activación concuerda con el generado
  if (usuario.codigoVerificador !== req.query.y)
    return res.redirect('/revisa.html');
  // Revisar si el usuario ya fue verificado
  if (usuario.verificado) return res.redirect('/invalido.html');
  // Actualizar verificado a 'true'
  usuario.verificado = true;
  // Guardar cambios en DB
  await usuario.save();
  res.redirect('/verificado.html');
});

module.exports = router;
