const jwt = require('jsonwebtoken');
const Session = require('../models/session');
const User = require('../models/user');
const createTokens = require('../utils/createTokens');

module.exports = async (req, res, next) => {
  // Check if access token exits (with optional chaining to avoid server error)
  if (req?.cookies?.accessToken) {
    console.log('accessToken detected...');
    // Decode access token
    const decoded = jwt.verify(
      req.cookies.accessToken,
      process.env.JWT_SIGNATURE
    );
    // Do auth check with user info here...
    console.log('Access level is:', decoded.accessLevel);
    // Continue if everything is ok
    next();
  }
  // Check if refresh token exits (with optional chaining to avoid server error)
  else if (req?.cookies?.refreshToken) {
    console.log('refreshToken detected...');
    // Decode access token
    const { sessionId } = jwt.verify(
      req.cookies.refreshToken,
      process.env.JWT_SIGNATURE
    );
    // Get session info
    const session = await Session.findOne({ sessionId });
    if (!session || !session.valid)
      return res
        .status(401)
        .send({ message: 'Access denied. Please log in again.' });
    // If session is valid, look up user info
    const user = await User.findOne({ _id: session.userId });
    // Create refresh tokens
    createTokens(sessionId, user, res);
    // Do auth check with user info here...
    console.log('Access level is:', user.accessLevel);
    // Continue if everything is ok
    next();
  } else {
    return res
      .status(401)
      .send({ message: 'Access denied. Please log in again.' });
  }
};
