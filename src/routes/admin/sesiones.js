const express = require('express');
const auth = require('../../middleware/auth');
const Session = require('../../models/session');

const router = express.Router();

const rolesAutorizados = [0];

// GET
router.get('/', [auth(rolesAutorizados)], async (req, res) => {
  const sessions = await Session.find();
  res.send(sessions);
});

module.exports = router;
