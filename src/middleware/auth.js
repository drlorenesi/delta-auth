const jwt = require('jsonwebtoken');
const JWTSignature = process.env.JWT_SIGNATURE;
const Session = require('../models/session');
const User = require('../models/user');
const createTokens = require('../utils/createTokens');

module.exports = async (req, res, next) => {
  // Check if access token exits (with optional chaining to avoid server error)
  if (req?.cookies?.accessToken) {
    console.log('accessToken detected...');
    // Decode access token
    const decoded = jwt.verify(req.cookies.accessToken, JWTSignature);
    // Do auth check with access token
    // Continue if everything is in order
    next();
  }
  // Check if refresh token exits (with optional chaining to avoid server error)
  else if (req?.cookies?.refreshToken) {
    console.log('refreshToken detected...');
    // Decode access token
    const { sessionId } = jwt.verify(req.cookies.refreshToken, JWTSignature);
    // Get session info
    const session = await Session.findOne({ sessionId });
    if (!session || !session.valid)
      return res
        .status(401)
        .send({ message: 'Access denied. Please log in again.' });
    // If session is valid, look up user info
    const user = await User.findOne({ _id: session.userId });
    // Create refresh tokens
    createTokens(sessionId, user._id, res);
    // Do auth check with user info
    // Continue if everything is in order
    next();
  } else {
    return res
      .status(401)
      .send({ message: 'Access denied. Please log in again.' });
  }
};
