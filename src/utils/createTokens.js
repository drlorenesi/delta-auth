const jwt = require('jsonwebtoken');
const JWTSignature = process.env.JWT_SIGNATURE;

module.exports = function (sessionId, userId) {
  try {
    // Create Access Token
    const accessToken = jwt.sign(
      {
        sessionId,
        userId,
      },
      JWTSignature
    );
    // Crete Refresh Token
    const refreshToken = jwt.sign(
      {
        sessionId,
      },
      JWTSignature
    );
    // Return Tokens
    return { accessToken, refreshToken };
  } catch (error) {
    throw new Error('Could not create tokens.');
  }
};
