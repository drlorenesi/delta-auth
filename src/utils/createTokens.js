const jwt = require('jsonwebtoken');

module.exports = function (sessionId, user, res) {
  try {
    // Create Access Token
    const accessToken = jwt.sign(
      { sessionId, userId: user._id, accessLevel: user.accessLevel },
      process.env.JWT_SIGNATURE
    );
    // Crete Refresh Token
    const refreshToken = jwt.sign(
      { sessionId, userId: user._id, accessLevel: user.accessLevel },
      process.env.JWT_SIGNATURE
    );
    // Create Session Info for RENDERING UI (save in local storage)
    const sessionInfo = jwt.sign(
      {
        userId: user._id,
        nombre: user.nombre,
        apellido: user.apellido,
        email: user.email,
        accessLevel: user.accessLevel,
      },
      process.env.JWT_SIGNATURE
    );
    // Send token cookies and sessionId as header
    res
      .cookie('accessToken', accessToken, {
        // Note that maxAge is optional for the accessToken
        maxAge: 1000 * 60 * 60 * 1, // cookie will be removed after 1 hour
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      .cookie('refreshToken', refreshToken, {
        maxAge: 1000 * 60 * 60 * 24, // cookie will be removed after 24 hours
        httpOnly: true,
        secure: true,
        sameSite: 'none',
      })
      // Session Info for RENDERING UI (save in local storage)
      .header('session-info', sessionInfo)
      .header('access-control-expose-headers', 'session-info');
  } catch (error) {
    throw new Error('Could not create tokens.');
  }
};
