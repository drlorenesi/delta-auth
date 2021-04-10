const jwt = require('jsonwebtoken');
const JWTSignature = process.env.JWT_SIGNATURE;
const createTokens = require('./createTokens');
const setCookies = require('./setCookies');
const User = require('../models/user');
const Session = require('../models/session');

module.exports = async function (req, res) {
  // Check if access token exits (with optional chaining to avoid server error)
  if (req?.cookies?.accessToken) {
    // Decode access token
    const { userId } = jwt.verify(req.cookies.accessToken, JWTSignature);
    // Get user info
    const user = await User.findOne({ _id: userId });
    return user;
  }
  // Check if refresh token exits (with optional chaining to avoid server error)
  if (req?.cookies?.refreshToken) {
    // Decode access token
    const { sessionId } = jwt.verify(req.cookies.refreshToken, JWTSignature);
    // Get session info
    const session = await Session.findOne({ sessionId });
    // If session is valid, refresh tokens
    if (session.valid) {
      // Look up current user
      const user = await User.findOne({
        _id: session.userId,
      });
      // Create new tokens
      const { accessToken, refreshToken } = createTokens(
        session.sessionId,
        user._id
      );
      // Set Cookies
      setCookies(accessToken, refreshToken, res);
      return user;
    }
  } else {
    return null;
  }
};
