const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const JWTSignature = process.env.JWT_SIGNATURE;

router.post('/', [], async (req, res) => {
  // Check if refreshToken exits (with optional chaining to avoid server error)
  if (req?.cookies?.refreshToken) {
    // Get Refresh Token
    const { refreshToken } = req.cookies;
    // Decode access token
    const { sessionId } = jwt.verify(refreshToken, JWTSignature);
    // Delete session from DB
    await Session.deleteOne({ sessionId });
  }
  // Remove Cookies
  res
    .clearCookie('accessToken')
    .clearCookie('refreshToken')
    .send({ message: 'You are now logged out.' });
});

module.exports = router;
