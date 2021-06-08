const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const Session = require('../models/session');

router.get('/', [], async (req, res) => {
  // Check if refreshToken exits (with optional chaining to avoid server error)
  if (req?.cookies?.refreshToken) {
    // Get Refresh Token
    const { refreshToken } = req.cookies;
    // Decode access token
    const { sessionId } = jwt.verify(refreshToken, process.env.JWT_SIGNATURE);
    // Delete session from DB
    await Session.deleteOne({ sessionId });
  }
  // Remove Cookies
  // Web browsers and other compliant clients will only clear the cookie if
  // the given options is identical to those given to res.cookie(),
  // excluding expires and maxAge.
  res
    .clearCookie('accessToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .clearCookie('refreshToken', {
      httpOnly: true,
      secure: true,
      sameSite: 'none',
    })
    .send({ message: 'You are now logged out.' });
});

module.exports = router;
