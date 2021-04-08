const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const JWTSignature = process.env.JWT_SIGNATURE;

router.post('/', [], async (req, res) => {
  try {
    // Get 'sessions' collections from DB
    const { sessions } = require('../config/collections');
    // Check if refreshToken exits (with optional chaining to avoid server error)
    if (req.cookies?.refreshToken) {
      // Get Refresh Token
      const { refreshToken } = req.cookies;
      // Decode access token
      const { sessionId } = jwt.verify(refreshToken, JWTSignature);
      // Delete session from DB
      await sessions.deleteOne({ sessionId });
    }
    // Remove Cookies
    res
      .clearCookie('accessToken')
      .clearCookie('refreshToken')
      .send('You are now logged out.');
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
